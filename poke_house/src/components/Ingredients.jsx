import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Ingredients() {
  return (
    <Container>
      <Row>
        {[1, 2, 3].map((_, index) => (
          <Col md={4} key={index}>
            <Carousel>
              <Carousel.Item>
                <Card className="bg-dark text-white"  style={{height: '40vh'}}>
                  <Card.Img src="poke.webp" alt="Card image" style={{objectFit: 'none'}}/>
                  <Card.ImgOverlay>
                    <Card.Title className="text-dark">Card title</Card.Title>
                    <Card.Text>
                      This is a wider card with supporting text below as a natural lead-in
                      to additional content. This content is a little bit longer.
                    </Card.Text>
                    <Card.Text>Last updated 3 mins ago</Card.Text>
                  </Card.ImgOverlay>
                </Card>
              </Carousel.Item>
              <Carousel.Item>
                <Card className="bg-dark text-white"  style={{height: '40vh'}}>
                  <Card.Img src="poke.webp" alt="Card image" />
                  <Card.ImgOverlay>
                    <Card.Title className="text-dark">Card title</Card.Title>
                    <Card.Text>
                      This is a wider card with supporting text below as a natural lead-in
                      to additional content. This content is a little bit longer.
                    </Card.Text>
                    <Card.Text>Last updated 3 mins ago</Card.Text>
                  </Card.ImgOverlay>
                </Card>
              </Carousel.Item>
              <Carousel.Item>
                <Card className="bg-dark text-white"  style={{height: '40vh'}}>
                  <Card.Img src="poke.webp" alt="Card image" />
                  <Card.ImgOverlay>
                    <Card.Title className="text-dark">Card title</Card.Title>
                    <Card.Text>
                      This is a wider card with supporting text below as a natural lead-in
                      to additional content. This content is a little bit longer.
                    </Card.Text>
                    <Card.Text>Last updated 3 mins ago</Card.Text>
                  </Card.ImgOverlay>
                </Card>
              </Carousel.Item>
            </Carousel>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Ingredients;