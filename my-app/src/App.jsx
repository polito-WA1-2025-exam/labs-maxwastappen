import { useState, useEffect } from 'react';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navigation from './components/Navigation.jsx';
import Hero from './components/Hero.jsx';
import Bases from './components/Bases.jsx';
import Proteins from './components/Proteins.jsx';
import Ingredients from './components/Ingredients.jsx';
import Footer from './components/Footer.jsx';
import OrderForm from './components/OrderForm.jsx';
import { Container, Row, Col, Button, Card, ListGroup, Form, ButtonGroup } from 'react-bootstrap'; // Added Form and ButtonGroup for bowl size/quantity

// Define data centrally
const baseOptions = [
    { id: 1, name: 'White Rice', description: 'Japanese short-grain white rice', price: 2.50, image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?q=80&w=2070' },
    { id: 2, name: 'Brown Rice', description: 'Whole grain brown rice', price: 2.50, image: 'https://images.unsplash.com/photo-1557592722-a0a649c8c5c7?q=80&w=2070' },
    { id: 3, name: 'Mixed Greens', description: 'Fresh mixed salad greens', price: 3.00, image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=2084' }
];

const proteinOptions = [
    { id: 1, name: 'Tuna', description: 'Fresh tuna cubes', price: 4.50, image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?q=80&w=2070' },
    { id: 2, name: 'Salmon', description: 'Norwegian salmon', price: 4.50, image: 'https://images.unsplash.com/photo-1526434426615-1abe81efcb0b?q=80&w=2070' },
    { id: 3, name: 'Chicken', description: 'Grilled chicken', price: 3.50, image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?q=80&w=2187' },
    { id: 4, name: 'Tofu', description: 'Organic tofu', price: 3.00, image: 'https://images.unsplash.com/photo-1584948528512-fd980cd94361?q=80&w=1936' },
];

// Add bowl size options with price multipliers
const bowlSizes = [
    { id: 'regular', name: 'Regular', priceMultiplier: 1.0 },
    { id: 'medium', name: 'Medium', priceMultiplier: 1.3 },
    { id: 'large', name: 'Large', priceMultiplier: 1.5 }
];

const ingredientCategories = [
    {
        id: 1,
        category: 'Vegetables',
        items: [
            { id: 101, name: 'Cucumber', price: 0.50, image: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269d?q=80&w=2070' },
            { id: 102, name: 'Avocado', price: 1.50, image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=2075' },
            { id: 103, name: 'Seaweed', price: 0.80, image: 'https://images.unsplash.com/photo-1622180443366-680932886c7e?q=80&w=2067' },
            { id: 104, name: 'Edamame', price: 1.00, image: 'https://images.unsplash.com/photo-1656961112303-92a11eff6c55?q=80&w=1974' }
        ]
    },
    {
        id: 2,
        category: 'Toppings',
        items: [
            { id: 201, name: 'Sesame Seeds', price: 0.30, image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=2070' },
            { id: 202, name: 'Crispy Onions', price: 0.30, image: 'https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?q=80&w=2070' },
            { id: 203, name: 'Peanuts', price: 0.50, image: 'https://images.unsplash.com/photo-1567529692333-de9fd6772923?q=80&w=1974' },
            { id: 204, name: 'Nori Strips', price: 0.40, image: 'https://images.unsplash.com/photo-1581431886211-6b932f8367f2?q=80&w=2070' }
        ]
    },
    {
        id: 3,
        category: 'Dressings',
        items: [
            { id: 301, name: 'Soy Sauce', price: 0.30, image: 'https://images.unsplash.com/photo-1590942349322-c03f8c7b0171?q=80&w=2070' },
            { id: 302, name: 'Spicy Mayo', price: 0.50, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=1769' },
            { id: 303, name: 'Teriyaki', price: 0.50, image: 'https://images.unsplash.com/photo-1598511726623-d2e9996e1b6c?q=80&w=1925' },
            { id: 304, name: 'Ponzu', price: 0.60, image: 'https://images.unsplash.com/photo-1493808855297-a7d32465d418?q=80&w=1854' }
        ]
    }
];

// Helper to find item by ID
const findItem = (id) => {
    const base = baseOptions.find(b => b.id === id);
    if (base) return { ...base, type: 'Base' };
    const protein = proteinOptions.find(p => p.id === id);
    if (protein) return { ...protein, type: 'Protein' };
    for (const category of ingredientCategories) {
        const ingredient = category.items.find(i => i.id === id);
        if (ingredient) return { ...ingredient, type: category.category };
    }
    return null;
};


function App() {
  const [order, setOrder] = useState([]); // Array of bowl objects with amount field
  const [bowlSize, setBowlSize] = useState(bowlSizes[0]); // Default to regular size
  const [currentBowl, setCurrentBowl] = useState({
    base: null, // id of selected base
    proteins: {}, // { proteinId: quantity }
    ingredients: {} // { ingredientId: quantity }
  });
  const [nextBowlId, setNextBowlId] = useState(1); // For unique bowl keys/ids in the order
  // Add bowlQuantity state at the component level instead of inside the render function
  const [bowlQuantity, setBowlQuantity] = useState(1);

  // Create a separate component for size selection that comes before other sections
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
  };

  const handleAddBowlToOrder = () => {
    if (!currentBowl.base || Object.keys(currentBowl.proteins).length === 0) {
        alert("Please select a base and a protein for your bowl.");
        return;
    }

    const bowlPrice = calculateBowlPrice(currentBowl);
    
    // Create a unique key for this bowl configuration
    const bowlKey = getBowlKey(currentBowl, bowlSize);
    
    // Check if this exact bowl combination already exists in the order
    const existingBowlIndex = order.findIndex(item => getBowlKey(item, item.size) === bowlKey);
    
    if (existingBowlIndex >= 0) {
        // If bowl already exists, update its amount
        setOrder(prevOrder => {
            const newOrder = [...prevOrder];
            newOrder[existingBowlIndex] = {
                ...newOrder[existingBowlIndex],
                amount: newOrder[existingBowlIndex].amount + bowlQuantity
            };
            return newOrder;
        });
    } else {
        // Otherwise add a new bowl with amount
        const newBowl = {
            id: nextBowlId,
            ...currentBowl,
            size: bowlSize, // Include the bowl size in the order
            price: bowlPrice,
            amount: bowlQuantity // Initial amount from the quantity selector
        };
        
        setOrder(prevOrder => [...prevOrder, newBowl]);
        setNextBowlId(prevId => prevId + 1); // Increment ID for the next bowl
    }
    
    resetCurrentBowl(); // Reset selections for the next bowl
    setBowlQuantity(1);  // Reset quantity to 1
  };

  // Helper function to create a unique key for a bowl based on its contents
  const getBowlKey = (bowl, size) => {
    return `${bowl.base}-${JSON.stringify(bowl.proteins)}-${JSON.stringify(bowl.ingredients)}-${size.id}`;
  };

  const handleRemoveBowl = (bowlIdToRemove, decreaseBy = 1) => {
    setOrder(prevOrder => {
        return prevOrder.map(bowl => {
            if (bowl.id === bowlIdToRemove) {
                const newAmount = bowl.amount - decreaseBy;
                if (newAmount <= 0) {
                    return null; // Will be filtered out
                }
                return { ...bowl, amount: newAmount };
            }
            return bowl;
        }).filter(Boolean); // Remove nulls (completely removed bowls)
    });
  };

  const handleRemoveBowlCompletely = (bowlIdToRemove) => {
    setOrder(prevOrder => prevOrder.filter(bowl => bowl.id !== bowlIdToRemove));
  };

  // --- Bowl Builder Section ---
  const renderCurrentBowlSummary = () => {
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
    
    // Handle quantity change using the component-level state
    const handleQuantityChange = (amount) => {
      const newQuantity = Math.max(1, bowlQuantity + amount); // Minimum quantity is 1
      setBowlQuantity(newQuantity);
    };

    return (
        <Card className="dark-bg mb-4">
            <Card.Body>
                <Card.Title className="mb-3">Your Next Bowl</Card.Title>
                
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
                    onClick={() => {
                      // Add the bowl with the correct quantity instead of calling handleAddBowlToOrder multiple times
                      handleAddBowlToOrder();
                    }}
                    disabled={!currentBowl.base || Object.keys(currentBowl.proteins).length === 0}
                >
                    Add {bowlQuantity > 1 ? `${bowlQuantity} Bowls` : 'Bowl'} to Order
                </Button>
            </Card.Body>
        </Card>
    );
  };
  // --- End Bowl Builder Section ---


  return (
    <div className="App dark-mode">
      <Navigation />
      <main>
        <section className="section-darker"><Hero /></section>
        
        {/* Add Bowl Size Selection as the first interactive section */}
        <section className="section-lighter">
            <BowlSizeSelector />
        </section>
        
        <section className="section-darker">
            <Bases
                baseOptions={baseOptions}
                selectedBaseId={currentBowl.base}
                onSelectBase={handleSelectBase}
            />
        </section>
        <section className="section-lighter">
            <Proteins
                proteinOptions={proteinOptions}
                selectedProteins={currentBowl.proteins}
                bowlSize={bowlSize}
                onProteinChange={(proteinId, newCount) => {
                  setCurrentBowl(prev => {
                    const newProteins = { ...prev.proteins };
                    
                    if (newCount > 0) {
                      newProteins[proteinId] = newCount;
                    } else {
                      delete newProteins[proteinId];
                    }
                    
                    return { 
                      ...prev,
                      proteins: newProteins
                    };
                  });
                }}
            />
        </section>
        <section className="section-darker">
            <Ingredients
                ingredientCategories={ingredientCategories}
                selectedIngredients={currentBowl.ingredients}
                onIngredientChange={handleIngredientChange}
            />
        </section>
        {/* Bowl Builder Section */}
        <section className="section-lighter py-5">
            <Container>
                <Row className="justify-content-center">
                     <Col md={8} lg={6}>
                        {renderCurrentBowlSummary()}
                    </Col>
                </Row>
            </Container>
        </section>
        {/* End Bowl Builder Section */}
        <section className="section-darker"> {/* Changed section class for contrast */}
            <OrderForm
                order={order} // Pass the array of bowls with amount
                onRemoveBowl={handleRemoveBowl} // Pass the remove handler (decreases by 1)
                onRemoveBowlCompletely={handleRemoveBowlCompletely} // Pass handler to remove entire bowl
                findItem={findItem} // Pass helper to find item details
                // onSubmit will be handled inside OrderForm for customer details
            />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
