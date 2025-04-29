import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';

// Update props to receive selectedProteins, bowlSize, and onToggleProtein
// selectedProteins now contains count of each protein: { proteinId: count }
function Proteins({ proteinOptions, selectedProteins = {}, bowlSize, onProteinChange }) {
    const [isVisible, setIsVisible] = useState(false);
    const [showMaxAlert, setShowMaxAlert] = useState(false);
    
    // Determine max proteins based on bowl size
    const maxProteins = bowlSize.id === 'regular' ? 1 : bowlSize.id === 'medium' ? 2 : 3;
    
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

    // Handle protein count change
    const handleProteinChange = (proteinId, amount) => {
        const currentCount = selectedProteins[proteinId] || 0;
        const newCount = Math.max(0, currentCount + amount);
        
        // If removing proteins or the new total is within limit
        if (amount < 0 || (totalProteinsSelected - currentCount + newCount <= maxProteins)) {
            onProteinChange(proteinId, newCount);
        } else {
            // Show alert that max limit reached
            setShowMaxAlert(true);
            setTimeout(() => setShowMaxAlert(false), 3000);
        }
    };

    return (
        <div id="proteins" className="proteins section-content py-5">
            <Container>
                <Row className="mb-5">
                    <Col className="text-center">
                        <div className={`section-header fade-in ${isVisible ? 'visible' : ''}`}>
                            <h2 className="section-title">Add Your Proteins</h2>
                            <div className="section-divider"></div>
                            <p className="section-subtitle">
                                {bowlSize.id === 'regular' 
                                    ? 'Select 1 protein for your Regular bowl'
                                    : bowlSize.id === 'medium'
                                    ? 'Select up to 2 proteins for your Medium bowl'
                                    : 'Select up to 3 proteins for your Large bowl'
                                }
                            </p>
                            {bowlSize.id !== 'regular' && (
                                <p className="section-subtitle mt-2">
                                    <small>You can add the same protein multiple times</small>
                                </p>
                            )}
                        </div>
                    </Col>
                </Row>
                
                {showMaxAlert && (
                    <Row className="mb-4">
                        <Col>
                            <Alert variant="warning" onClose={() => setShowMaxAlert(false)} dismissible>
                                <Alert.Heading>Maximum Proteins Reached!</Alert.Heading>
                                <p>
                                    Your {bowlSize.name} bowl can have up to {maxProteins} protein{maxProteins > 1 ? 's' : ''}.
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

                <Row className={`card-grid ${isVisible ? 'visible' : ''}`}>
                    {proteinOptions.map(protein => {
                        const count = selectedProteins[protein.id] || 0;
                        const isSelected = count > 0;
                        return (
                            <Col key={protein.id} xs={12} md={6} lg={3} className="mb-4">
                                <Card
                                    className={`modern-card h-100 ${isSelected ? 'border border-primary border-3' : ''}`}
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
                                            <h3 className="card-title">
                                                {protein.name}
                                                {count > 0 && (
                                                    <Badge 
                                                        bg="primary"
                                                        className="ms-2 protein-count-badge"
                                                    >
                                                        ×{count}
                                                    </Badge>
                                                )}
                                            </h3>
                                            <p className="card-description">{protein.description}</p>
                                            <p className="card-price">€{protein.price.toFixed(2)}</p>
                                        </div>

                                        {/* Show counter buttons for medium and large bowls */}
                                        {bowlSize.id !== 'regular' ? (
                                            <div className="improved-counter mt-3 align-self-start">
                                                <Button
                                                    variant="light"
                                                    className="counter-btn decrement"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleProteinChange(protein.id, -1);
                                                    }}
                                                    disabled={count === 0}
                                                >
                                                    −
                                                </Button>
                                                <span className="counter-display">{count}</span>
                                                <Button
                                                    variant="light"
                                                    className="counter-btn increment"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleProteinChange(protein.id, 1);
                                                    }}
                                                    disabled={totalProteinsSelected >= maxProteins && count === 0}
                                                >
                                                    +
                                                </Button>
                                            </div>
                                        ) : (
                                            // For regular bowls, just show a toggle button
                                            <Button
                                                variant="primary"
                                                className="card-button align-self-start mt-4"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (isSelected) {
                                                        handleProteinChange(protein.id, -count);
                                                    } else {
                                                        // First deselect any other protein
                                                        Object.keys(selectedProteins).forEach(id => {
                                                            if (selectedProteins[id] > 0) {
                                                                onProteinChange(parseInt(id), 0);
                                                            }
                                                        });
                                                        // Then select this one
                                                        handleProteinChange(protein.id, 1);
                                                    }
                                                }}
                                            >
                                                {isSelected ? 'Selected' : 'Select Protein'}
                                            </Button>
                                        )}
                                    </Card.ImgOverlay>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </div>
    );
}

export default Proteins;