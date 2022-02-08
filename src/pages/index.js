import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"

import { Spinner } from 'react-bootstrap';
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { DataModal } from "../components/modal"

const getPosts = (edges, more) => {
  let start = 0;
  const posts = edges.map((post) => {
    const node = Object.keys(post).length === 1 && post.node ? post.node : post;
    start = Math.max(node.postId || node.id, start);
    return node
  });
  return {
    start,
    posts,
    more,
  }
}

const IndexPage = ({ data }) => {
  const [postData, setPosts] = useState(() => getPosts(data.allPost.edges, true));
  const [modalInfo, setModalInfo] = useState(null);

  const closeModal = () => setModalInfo(null);
  
  useEffect(() => {
    if (postData.more) {
      setTimeout(() => {
        fetch(`${process.env.GATSBY_SERVER_URL}/posts?start=${postData.start}`)
          .then(res => res.json())
          .then(data => {
            setPosts(p => getPosts(p.posts.concat(data), false))
          });
      }, 5000);
    }
  }, [postData])

  return (
    <Layout>
      <SEO title="Home" />
      <div style={{
        width: '100%',
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center',
      }}>
        {postData.posts.map((post, idx) => (
            <div
              key={idx}
              style={{ padding: 20 }}
              onClick={() => setModalInfo(post)}
            >
              <Image post={post}  />
            </div>
        ))}
      </div>
      {
        postData.more && (
          <div style={{
            display: 'block',
            width: '10px',
            margin: 'auto',
          }}>
            <Spinner animation="grow" variant="info" />
          </div>
      )}
      { modalInfo && <DataModal post={modalInfo} close={closeModal} show={!!modalInfo} /> }
    </Layout>
  )
};

export default IndexPage

export const query = graphql`
  query IndexPage {
    allPost {
      edges {
        node {
          id
          postId
          name
          age
          image {
            links {
              download
            }
          }
          localImage {
            childImageSharp {
              fixed(width: 300, height: 450) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  }
`