import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';

function CustomCarousel() {
  return (
    <Carousel>
      <Carousel.Item>
      <Card className="bg-dark text-white">
            <Card.Img src="poke.webp" alt="Card image"/>
            <Card.ImgOverlay>
                <Card.Title className='text-dark'>Card title</Card.Title>
                <Card.Text>
                    This is a wider card with supporting text below as a natural lead-in
                    to additional content. This content is a little bit longer.
                </Card.Text>
                <Card.Text>Last updated 3 mins ago</Card.Text>
            </Card.ImgOverlay>
        </Card>
      </Carousel.Item>
      <Carousel.Item>
      <Card className="bg-dark text-white">
            <Card.Img src="poke.webp" alt="Card image"/>
            <Card.ImgOverlay>
                <Card.Title className='text-dark'>Card title</Card.Title>
                <Card.Text>
                    This is a wider card with supporting text below as a natural lead-in
                    to additional content. This content is a little bit longer.
                </Card.Text>
                <Card.Text>Last updated 3 mins ago</Card.Text>
            </Card.ImgOverlay>
        </Card>
      </Carousel.Item>
      <Carousel.Item>
        <Card className="bg-dark text-white">
            <Card.Img src="poke.webp" alt="Card image"/>
            <Card.ImgOverlay>
                <Card.Title className='text-dark'>Card title</Card.Title>
                <Card.Text>
                    This is a wider card with supporting text below as a natural lead-in
                    to additional content. This content is a little bit longer.
                </Card.Text>
                <Card.Text>Last updated 3 mins ago</Card.Text>
            </Card.ImgOverlay>
        </Card>
      </Carousel.Item>
    </Carousel>
  );
}


export default CustomCarousel;