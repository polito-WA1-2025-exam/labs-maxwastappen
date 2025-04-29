import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

// Receive baseOptions, selectedBaseId, and onSelectBase as props
function Bases({ baseOptions, selectedBaseId, onSelectBase }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const section = document.getElementById('bases');
            if (section) {
                const rect = section.getBoundingClientRect();
                if (rect.top <= window.innerHeight * 0.75 && rect.bottom >= 0) {
                    setIsVisible(true);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div id='bases' className="bases section-content py-5">
            <Container>
                <Row className="mb-5">
                    <Col className="text-center">
                        <div className={`section-header fade-in ${isVisible ? 'visible' : ''}`}>
                            <h2 className="section-title">Choose Your Base</h2>
                            <div className="section-divider"></div>
                            <p className="section-subtitle">Start building your perfect bowl with a delicious foundation</p>
                        </div>
                    </Col>
                </Row>

                <Row className={`card-grid ${isVisible ? 'visible' : ''}`}>
                    {baseOptions.map((base) => (
                        <Col key={base.id} xs={12} md={6} lg={4} className="mb-4">
                            {/* Add border if selected */}
                            <Card
                                className={`modern-card h-100 ${selectedBaseId === base.id ? 'border border-primary border-3' : ''}`}
                                onClick={() => onSelectBase(base.id)} // Call handler on click
                                style={{ cursor: 'pointer' }} // Indicate clickable
                            >
                                <Card.Img
                                    src={base.image}
                                    alt={base.name}
                                    className="modern-card-img"
                                />
                                <div className="card-gradient-overlay"></div>
                                <Card.ImgOverlay className="d-flex flex-column justify-content-between p-4">
                                    <div className="card-content">
                                        <h3 className="card-title">{base.name}</h3>
                                        <p className="card-description">{base.description}</p>
                                        <p className="card-price">€{base.price.toFixed(2)}</p> {/* Ensure price format */}
                                    </div>

                                    {/* Change button text based on selection */}
                                    <Button
                                        variant="primary"
                                        className="card-button align-self-start mt-4"
                                        onClick={(e) => { e.stopPropagation(); onSelectBase(base.id); }} // Prevent card click, call handler
                                    >
                                        {selectedBaseId === base.id ? 'Selected' : 'Select Base'}
                                    </Button>
                                </Card.ImgOverlay>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default Bases;