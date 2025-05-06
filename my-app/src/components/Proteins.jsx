import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';

// Update props to receive selectedProteins, onSelectProtein with default values
function Proteins({ proteinOptions = [], selectedProteins = {}, onSelectProtein = () => {} }) {
    const [isVisible, setIsVisible] = useState(false);
    const [showMaxAlert, setShowMaxAlert] = useState(false);
    
    // Default to regular size rules (1 protein max)
    const maxProteins = 3; // Allow up to 3 proteins by default
    
    // Calculate total proteins selected
    const totalProteinsSelected = Object.values(selectedProteins).reduce((sum, count) => sum + count, 0);

    useEffect(() => {
        const handleScroll = () => {
            const section = document.getElementById('proteins');
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
        <div id="proteins" className="proteins section-content py-5">
            <Container>
                <Row className="mb-5">
                    <Col className="text-center">
                        <div className={`section-header fade-in ${isVisible ? 'visible' : ''}`}>
                            <h2 className="section-title">Add Your Proteins</h2>
                            <div className="section-divider"></div>
                            <p className="section-subtitle">
                                Select your proteins for a delicious bowl
                            </p>
                            <p className="section-subtitle mt-2">
                                <small>You can add up to 3 proteins to your bowl</small>
                            </p>
                        </div>
                    </Col>
                </Row>
                
                {showMaxAlert && (
                    <Row className="mb-4">
                        <Col>
                            <Alert variant="warning" onClose={() => setShowMaxAlert(false)} dismissible>
                                <Alert.Heading>Maximum Proteins Reached!</Alert.Heading>
                                <p>
                                    Your bowl can have up to {maxProteins} proteins.
                                    Remove a protein before adding more.
                                </p>
                            </Alert>
                        </Col>
                    </Row>
                )}

                <Row className="mb-3">
                    <Col className="text-center">
                        <div className="protein-counter">
                            <span className={`selected-count ${totalProteinsSelected === maxProteins ? 'text-success' : ''}`}>
                                {totalProteinsSelected}
                            </span> 
                            <span className="max-count">/ {maxProteins} proteins selected</span>
                        </div>
                    </Col>
                </Row>

                {proteinOptions.length === 0 ? (
                    <Row className="justify-content-center">
                        <Col md={8} className="text-center">
                            <div className="dark-bg p-4 rounded">
                                <p>Loading protein options...</p>
                            </div>
                        </Col>
                    </Row>
                ) : (
                    <Row className={`card-grid ${isVisible ? 'visible' : ''}`}>
                        {proteinOptions.map(protein => {
                            const isSelected = selectedProteins[protein.id] ? true : false;
                            return (
                                <Col key={protein.id} xs={12} md={6} lg={3} className="mb-4">
                                    <Card
                                        className={`modern-card h-100 ${isSelected ? 'border border-primary border-3' : ''}`}
                                        onClick={() => onSelectProtein(protein.id)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <Card.Img
                                            src={protein.image}
                                            alt={protein.name}
                                            className="modern-card-img"
                                        />
                                        <div className="card-gradient-overlay"></div>
                                        <Card.ImgOverlay className="d-flex flex-column justify-content-between p-4">
                                            <div className="card-content">
                                                <h3 className="card-title">{protein.name}</h3>
                                                <p className="card-description">{protein.description}</p>
                                                <p className="card-price">€{protein.price.toFixed(2)}</p>
                                            </div>

                                            <Button
                                                variant="primary"
                                                className="card-button align-self-start mt-4"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onSelectProtein(protein.id);
                                                }}
                                                disabled={totalProteinsSelected >= maxProteins && !isSelected}
                                            >
                                                {isSelected ? 'Selected' : 'Select Protein'}
                                            </Button>
                                        </Card.ImgOverlay>
                                    </Card>
                                </Col>
                            );
                        })}
                    </Row>
                )}
            </Container>
        </div>
    );
}

export default Proteins;