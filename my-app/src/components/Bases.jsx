import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function Bases() {
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => {
            const section = document.getElementById('bases');
            if (section) {
                const rect = section.getBoundingClientRect();
                // If the section is in view
                if (rect.top <= window.innerHeight * 0.75 && rect.bottom >= 0) {
                    setIsVisible(true);
                }
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        // Trigger on initial render
        handleScroll();
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    
    const baseOptions = [
        { id: 1, name: 'White Rice', description: 'Japanese short-grain white rice', price: '2.50', image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?q=80&w=2070' },
        { id: 2, name: 'Brown Rice', description: 'Whole grain brown rice', price: '2.50', image: 'https://images.unsplash.com/photo-1557592722-a0a649c8c5c7?q=80&w=2070' },
        { id: 3, name: 'Mixed Greens', description: 'Fresh mixed salad greens', price: '3.00', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=2084' }
    ];

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
                            <Card className="modern-card h-100">
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
                                        <p className="card-price">€{base.price}</p>
                                    </div>
                                    
                                    <Button variant="primary" className="card-button align-self-start mt-4">
                                        Select Base
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