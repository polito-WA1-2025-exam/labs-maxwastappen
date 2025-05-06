import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Bases from '../components/Bases';
import Proteins from '../components/Proteins';
import Ingredients from '../components/Ingredients';
import Footer from '../components/Footer';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function BowlBuilderPage({ baseOptions = [], proteinOptions = [], bowlSizes = [], ingredientCategories = [], onAddBowlToOrder = () => {}, findItem = () => null }) {
  const navigate = useNavigate();
  
  // State for the bowl being built
  const [currentBowl, setCurrentBowl] = useState({
    base: null, // id of selected base
    proteins: {}, // { proteinId: quantity }
    ingredients: {} // { ingredientId: quantity }
  });
  
  // Default to regular size with safe access to bowlSizes
  const [bowlSize, setBowlSize] = useState(bowlSizes.length > 0 ? bowlSizes[0] : { id: 'regular', name: 'Regular', priceMultiplier: 1.0 });
  const [bowlQuantity, setBowlQuantity] = useState(1); // Default quantity is 1

  // Check if we have the necessary data at the beginning of the component
  useEffect(() => {
    // If any required data is missing, log an error
    if (!baseOptions || baseOptions.length === 0 || 
        !proteinOptions || proteinOptions.length === 0 || 
        !bowlSizes || bowlSizes.length === 0 || 
        !ingredientCategories || ingredientCategories.length === 0) {
      console.error("Required data is missing for BowlBuilderPage");
    }
  }, [baseOptions, proteinOptions, bowlSizes, ingredientCategories]);

  // Handler functions for building the bowl
  const handleSelectBase = (baseId) => {
    setCurrentBowl(prev => ({ ...prev, base: baseId }));
  };

  const handleSelectProtein = (proteinId) => {
    setCurrentBowl(prev => {
      const newProteins = { ...prev.proteins };
      if (newProteins[proteinId]) {
        // If protein is already selected, remove it
        delete newProteins[proteinId];
        return { ...prev, proteins: newProteins };
      } else {
        // Otherwise, add the new protein
        return { ...prev, proteins: { ...newProteins, [proteinId]: 1 } };
      }
    });
  };

  const handleIngredientChange = (ingredientId, quantity) => {
    setCurrentBowl(prev => {
      const newIngredients = { ...prev.ingredients };
      if (quantity > 0) {
        newIngredients[ingredientId] = quantity;
      } else {
        delete newIngredients[ingredientId]; // Remove if quantity is 0
      }
      return { ...prev, ingredients: newIngredients };
    });
  };

  const calculateBowlPrice = (bowl) => {
    let price = 0;
    if (bowl.base) {
      const baseItem = findItem(bowl.base);
      if (baseItem) price += baseItem.price;
    }
    Object.entries(bowl.proteins).forEach(([id, quantity]) => {
      const proteinItem = findItem(parseInt(id)); // Ensure id is number
      if (proteinItem) price += proteinItem.price * quantity;
    });
    Object.entries(bowl.ingredients).forEach(([id, quantity]) => {
      const ingredientItem = findItem(parseInt(id)); // Ensure id is number
      if (ingredientItem) price += ingredientItem.price * quantity;
    });
    price *= bowlSize.priceMultiplier; // Apply size multiplier
    return price;
  };

  const resetCurrentBowl = () => {
    setCurrentBowl({ base: null, proteins: {}, ingredients: {} });
    setBowlQuantity(1); // Reset quantity
    setBowlSize(bowlSizes.length > 0 ? bowlSizes[0] : { id: 'regular', name: 'Regular', priceMultiplier: 1.0 }); // Safely reset size
  };

  const handleAddToOrder = () => {
    if (!currentBowl.base || Object.keys(currentBowl.proteins).length === 0) {
      alert("Please select a base and at least one protein for your bowl.");
      return;
    }

    // Set the price in the bowl object
    const bowlWithPrice = {
      ...currentBowl,
      price: calculateBowlPrice(currentBowl)
    };

    // Call the parent handler with the complete bowl details
    onAddBowlToOrder(bowlWithPrice, bowlSize, bowlQuantity);
    
    // Reset for the next bowl
    resetCurrentBowl();
    
    // Navigate to cart (optional - could also stay on the build page)
    navigate('/cart');
  };

  // Bowl Size Selector Component
  const BowlSizeSelector = () => {
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
      setIsVisible(true); // Show component with animation
    }, []);
    
    return (
      <div id="bowl-sizes" className="bowl-sizes section-content py-5">
        <Container>
          <Row className="mb-5">
            <Col className="text-center">
              <div className={`section-header fade-in ${isVisible ? 'visible' : ''}`}>
                <h2 className="section-title">Select Bowl Size</h2>
                <div className="section-divider"></div>
                <p className="section-subtitle">Choose your perfect bowl size to start your meal</p>
              </div>
            </Col>
          </Row>
          
          <Row className={`justify-content-center fade-in ${isVisible ? 'visible' : ''}`}>
            <Col md={10} lg={8}>
              <Card className="dark-bg mb-4">
                <Card.Body className="py-4">
                  <Card.Title className="mb-4 text-center">Bowl Size Options</Card.Title>
                  <Row>
                    {bowlSizes.map((size) => (
                      <Col key={size.id} md={4} className="mb-3">
                        <Card 
                          className={`h-100 text-center size-selector-card ${bowlSize.id === size.id ? 'border border-primary border-3 selected-size' : ''}`}
                          onClick={() => setBowlSize(size)}
                          style={{ 
                            cursor: 'pointer',
                            background: bowlSize.id === size.id ? 'rgba(110, 72, 170, 0.3)' : 'rgba(30, 30, 30, 0.7)',
                            transition: 'all 0.3s ease',
                            minHeight: '200px', // Set minimum height
                          }}
                        >
                          <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                            <div style={{ 
                              fontSize: size.id === 'regular' ? '3.5rem' : size.id === 'medium' ? '4rem' : '4.5rem',
                              opacity: '0.8',
                              marginBottom: '15px'
                            }}>
                              🍜
                            </div>
                            <Card.Title className="mb-2" style={{ color: 'white' }}>{size.name}</Card.Title>
                            <Card.Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                              Price: ×{size.priceMultiplier.toFixed(1)}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                  <div className="text-center mt-3" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    <small>The selected size affects all ingredients quantity and price</small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  };

  // Bowl Summary Component
  const BowlSummary = () => {
    const base = currentBowl.base ? findItem(currentBowl.base) : null;
    const proteinItems = Object.entries(currentBowl.proteins).map(([id, quantity]) => {
        const item = findItem(parseInt(id));
        return item ? { ...item, quantity } : null;
    }).filter(item => item !== null);
    const ingredientsList = Object.entries(currentBowl.ingredients).map(([id, quantity]) => {
        const item = findItem(parseInt(id));
        return item ? { ...item, quantity } : null;
    }).filter(item => item !== null);

    const currentPrice = calculateBowlPrice(currentBowl);
    
    // Handle quantity change
    const handleQuantityChange = (amount) => {
      const newQuantity = Math.max(1, bowlQuantity + amount); // Minimum quantity is 1
      setBowlQuantity(newQuantity);
    };

    return (
        <Card className="dark-bg mb-4">
            <Card.Body>
                <Card.Title className="mb-3">Your Bowl Summary</Card.Title>
                
                <ListGroup variant="flush">
                    {base && <ListGroup.Item className="dark-bg d-flex justify-content-between"><span>Base: {base.name}</span> <span>€{base.price.toFixed(2)}</span></ListGroup.Item>}
                    {proteinItems.length > 0 && <ListGroup.Item className="dark-bg d-flex justify-content-between"><span>Protein{proteinItems.length > 1 ? 's' : ''}: {proteinItems.map(p => `${p.name}${p.quantity > 1 ? ` ×${p.quantity}` : ''}`).join(', ')}</span> <span>€{proteinItems.reduce((total, p) => total + (p.price * p.quantity), 0).toFixed(2)}</span></ListGroup.Item>}
                    {ingredientsList.length > 0 && <ListGroup.Item className="dark-bg pt-2 pb-0"><span className="fw-bold">Ingredients:</span></ListGroup.Item>}
                    {ingredientsList.map(ing => (
                         <ListGroup.Item key={ing.id} className="dark-bg d-flex justify-content-between ps-4">
                            <span>{ing.name} x {ing.quantity}</span>
                            <span>€{(ing.price * ing.quantity).toFixed(2)}</span>
                        </ListGroup.Item>
                    ))}
                     <ListGroup.Item className="dark-bg fw-bold d-flex justify-content-between mt-2">
                        <span>Bowl Size:</span>
                        <span>{bowlSize.name} (×{bowlSize.priceMultiplier})</span>
                    </ListGroup.Item>
                     <ListGroup.Item className="dark-bg fw-bold d-flex justify-content-between">
                        <span>Price per Bowl:</span>
                        <span>€{currentPrice.toFixed(2)}</span>
                    </ListGroup.Item>
                </ListGroup>
                
                {/* Bowl Quantity Selector */}
                <div className="mt-3 mb-3">
                    <label className="d-block mb-2 fw-bold">Quantity:</label>
                    <div className="modern-quantity-selector d-flex align-items-center">
                        <Button 
                            variant="outline-light" 
                            className="modern-quantity-btn"
                            onClick={() => handleQuantityChange(-1)}
                            disabled={bowlQuantity <= 1}
                        >
                            −
                        </Button>
                        <span className="modern-quantity-display">{bowlQuantity}</span>
                        <Button 
                            variant="outline-light" 
                            className="modern-quantity-btn"
                            onClick={() => handleQuantityChange(1)}
                        >
                            +
                        </Button>
                        <span className="ms-3 fw-bold">Total: €{(currentPrice * bowlQuantity).toFixed(2)}</span>
                    </div>
                </div>
                
                <Button
                    variant="primary"
                    className="w-100 mt-3 card-button"
                    onClick={handleAddToOrder}
                    disabled={!currentBowl.base || Object.keys(currentBowl.proteins).length === 0}
                >
                    Add {bowlQuantity > 1 ? `${bowlQuantity} Bowls` : 'Bowl'} to Order
                </Button>
            </Card.Body>
        </Card>
    );
  };

  return (
    <>
      <Navigation />
      <div className="section-content section-darker">
        <Container>
          <Row className="mb-5 text-center">
            <Col>
              <h1 className="section-title">Build Your Custom Bowl</h1>
              <div className="section-divider"></div>
              <p className="section-subtitle">Craft your perfect poke experience step by step.</p>
            </Col>
          </Row>
        </Container>

        {/* Bowl Size Selector */}
        <BowlSizeSelector />

        {/* Bases */}
        <Bases 
          baseOptions={baseOptions} 
          selectedBaseId={currentBowl.base} 
          onSelectBase={handleSelectBase}
        />

        {/* Proteins */}
        <Proteins 
          proteinOptions={proteinOptions} 
          selectedProteins={currentBowl.proteins} 
          onSelectProtein={handleSelectProtein}
        />

        {/* Ingredients */}
        <Ingredients 
          ingredientCategories={ingredientCategories} 
          selectedIngredients={currentBowl.ingredients} 
          onIngredientChange={handleIngredientChange}
        />

        {/* Bowl Summary and Add to Order */}
        <Container>
          <Row className="justify-content-center mt-4 mb-5">
            <Col md={8}>
              <BowlSummary />
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default BowlBuilderPage;