const fetch = require('node-fetch');
const { createRemoteFileNode } = require('gatsby-source-filesystem');

const server = require('./server/server');
exports.onPreInit = () => {
    return new Promise((resolve) => {
        server(resolve);
    });
}

const imageNodeCache = {};
exports.sourceNodes = async ({ actions, createNodeId, createContentDigest, getCache, cache, reporter }) => {
    const { createNode } = actions;
    const data = await fetch('http://localhost:8080/posts?type=build').then(res => res.json());

    for (const val of data) {
        const nodeId = createNodeId(`DataNode >>> ${val.postId}`);

        // Create file nodes of the images
        const imageNode = await createRemoteFileNode({
            url: `${val.image.links.download}?width=300&height=450`,
            parentNodeId: nodeId,
            ext: '.png',
            name: val.postId,
            cache,
            getCache,
            createNode,
            createNodeId,
            reporter,
        })

        const node = {
            ...val,
            id: nodeId, // This overwrites the data post's id
            localImage___NODE: imageNode.id,
        }
        createNode({
            ...node,
            children: [],
            internal: {
                type: 'Post',
                contentDigest: createContentDigest(JSON.stringify(node))
            }
        });
        imageNodeCache[imageNode.id] = node;
    }
}