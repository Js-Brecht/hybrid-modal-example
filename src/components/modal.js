import React from 'react';
import { Modal, Container, Row, Col } from 'react-bootstrap'
import Image from './image';
import "../styles/modal.css";

const Info = ({ title, detail }) => (
    <Row
        style={{
            padding: 5
        }}
    >
        <Col lg={2}>{title}</Col>
        <Col>{detail}</Col>
    </Row>
)

export const DataModal = ({ post, close, show }) => (
    <Modal
        centered
        show={show}
        onHide={close}
        dialogClassName="modal-90w"
    >
        <Modal.Header closeButton>
            <Modal.Title>{post.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Container>
                <Row>
                    <Col lg={4}>
                        <Image post={post} className="modal-image" />
                    </Col>
                    <Col lg={8}>
                        <Container>
                            <Info title="Name:" detail={post.name} />
                            <Info title="Age:" detail={post.age} />
                        </Container>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricies in urna ac faucibus. Nulla mollis auctor blandit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Etiam non odio quam. Nullam quis fermentum odio. Quisque malesuada sed felis a euismod. Aenean vitae arcu massa. Proin non risus nunc. In euismod velit vitae odio fringilla viverra. Nulla orci est, venenatis auctor justo ac, euismod suscipit quam.
                        </p>
                        <p>
                            Donec tempor mattis tortor nec sodales. Nam nec luctus massa. Suspendisse finibus justo velit, et feugiat massa tincidunt quis. Vivamus suscipit tortor elit, sed aliquet odio pharetra id. Phasellus vulputate nibh nisl, nec ultrices libero convallis eget. Aliquam facilisis purus id tortor elementum condimentum. Cras at libero sit amet metus maximus euismod sit amet nec ligula. Fusce posuere purus nisl, ac bibendum est hendrerit a. Morbi maximus est odio, eu posuere metus ultrices vitae. Quisque et aliquam ante. Aliquam ullamcorper purus vel mollis gravida. Praesent efficitur lectus vitae nisi auctor dictum vitae eget metus. Proin ut ornare velit.
                        </p>
                        <p>
                            Aliquam viverra tortor ut felis dignissim consequat. Ut ac arcu tempus lacus mollis finibus eu vitae ligula. Donec molestie sem in orci laoreet finibus. Etiam eu massa ut nisl commodo pellentesque. Praesent mattis augue quis metus fermentum, eu sagittis dolor convallis. Maecenas dapibus ipsum nec commodo ullamcorper. Vivamus nec viverra odio.
                        </p>
                        <p>
                            Quisque hendrerit sapien nulla, eu laoreet est consequat eget. Nam consequat, est in tincidunt consequat, justo lacus auctor felis, sit amet facilisis metus ex ac sem. Donec lobortis vulputate mollis. Nam ut porttitor massa, sit amet auctor urna. Maecenas volutpat mauris vel odio interdum lobortis. Fusce elit nunc, facilisis vitae posuere molestie, hendrerit vel nunc. Nunc ut lectus libero. Nunc viverra nulla a laoreet suscipit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam placerat tristique mauris quis rhoncus. Maecenas ac dignissim nisi. Integer semper, erat consectetur consequat pharetra, magna est cursus justo, eget auctor erat urna at nunc. Sed malesuada erat orci, a luctus elit dictum non. Curabitur suscipit at ex in interdum. Nullam sed eleifend diam. Duis vel erat sed ex sagittis fermentum vitae sed justo.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec laoreet nibh vitae dolor fringilla blandit. Morbi a massa quis nisl consectetur posuere. Nullam non turpis a dui scelerisque consequat in in mauris. In dui lorem, tincidunt et malesuada vitae, tincidunt laoreet justo. Nulla ut massa cursus, tristique nisi at, venenatis urna. Morbi volutpat pellentesque fermentum. Ut volutpat dui in tincidunt placerat. Nullam lobortis pulvinar justo eu blandit.
                        </p>
                    </Col>
                </Row>
            </Container>
        </Modal.Body>
    </Modal>
)