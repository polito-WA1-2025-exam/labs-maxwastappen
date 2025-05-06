import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Bases from '../components/Bases';
import Proteins from '../components/Proteins';
import Ingredients from '../components/Ingredients';
import Footer from '../components/Footer';
// Import Bootstrap components for layout and styling
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
// Import hook for programmatic navigation
import { useNavigate } from 'react-router-dom';

/**
 * @function BowlBuilderPage
 * @description A React component page for building a custom poke bowl.
 * It guides the user through selecting a size, base, proteins, and ingredients.
 * It also displays a summary of the current bowl and allows adding it to the order.
 *
 * @param {Object} props - The component props.
 * @param {Array<Object>} [props.baseOptions=[]] - Array of available base options.
 * @param {Array<Object>} [props.proteinOptions=[]] - Array of available protein options.
 * @param {Array<Object>} [props.bowlSizes=[]] - Array of available bowl sizes with multipliers.
 * @param {Array<Object>} [props.ingredientCategories=[]] - Array of ingredient categories, each containing a list of ingredients.
 * @param {function(Object, Object, number): void} [props.onAddBowlToOrder=()=>{}] - Callback function to add the built bowl to the main order.
 * @param {function(number): Object | null} [props.findItem=()=>null] - Function to find an item (base, protein, ingredient) by its ID.
 * @returns {JSX.Element} The JSX for the Bowl Builder Page.
 */
function BowlBuilderPage({ baseOptions = [], proteinOptions = [], bowlSizes = [], ingredientCategories = [], onAddBowlToOrder = () => {}, findItem = () => null }) {
  // Hook to allow navigation programmatically
  const navigate = useNavigate();

  // State to hold the current bowl configuration being built by the user
  const [currentBowl, setCurrentBowl] = useState({
    base: null, // Stores the ID of the selected base (null if none selected)
    proteins: {}, // Stores selected proteins as { proteinId: quantity }
    ingredients: {} // Stores selected ingredients as { ingredientId: quantity }
  });

  // State for the selected bowl size. Defaults to the first size available or a fallback.
  const [bowlSize, setBowlSize] = useState(
    bowlSizes.length > 0 ? bowlSizes[0] : { id: 'regular', name: 'Regular', priceMultiplier: 1.0 }
  );
  // State for the quantity of the current bowl being built
  const [bowlQuantity, setBowlQuantity] = useState(1); // Default quantity is 1

  // Effect hook to check if required data is available when the component mounts or data changes
  useEffect(() => {
    // Check if any essential data arrays are missing or empty
    if (!baseOptions || baseOptions.length === 0 ||
      !proteinOptions || proteinOptions.length === 0 ||
      !bowlSizes || bowlSizes.length === 0 ||
      !ingredientCategories || ingredientCategories.length === 0) {
      console.error("Required data is missing for BowlBuilderPage");
      // Potentially redirect to an error page or display a message if data is critical
    }
  }, [baseOptions, proteinOptions, bowlSizes, ingredientCategories]); // Dependencies: re-run effect if these props change

  /**
   * @function handleSelectBase
   * @description Handles the selection of a base for the bowl.
   * @param {number} baseId - The ID of the selected base.
   */
  const handleSelectBase = (baseId) => {
    // Update the currentBowl state, keeping existing proteins and ingredients
    setCurrentBowl(prev => ({ ...prev, base: baseId }));
  };

  /**
   * @function handleSelectProtein
   * @description Handles the selection/deselection of a protein.
   * Supports adding multiple quantities of the same protein.
   * @param {number} proteinId - The ID of the protein to toggle or update.
   * @param {number} quantity - Optional quantity to set (if provided).
   */
  const handleSelectProtein = (proteinId, quantity) => {
    setCurrentBowl(prev => {
      const newProteins = { ...prev.proteins };
      
      // If a specific quantity is provided, use it
      if (quantity !== undefined) {
        if (quantity <= 0) {
          // If quantity is 0 or less, remove the protein
          delete newProteins[proteinId];
        } else {
          // Otherwise set to the specified quantity
          newProteins[proteinId] = quantity;
        }
      } else {
        // Legacy toggle behavior if no quantity is provided
        if (newProteins[proteinId]) {
          // If protein is already selected, remove it
          delete newProteins[proteinId];
        } else {
          // Otherwise, add the new protein with quantity 1
          newProteins[proteinId] = 1;
        }
      }
      
      return { ...prev, proteins: newProteins };
    });
  };

  /**
   * @function handleIngredientChange
   * @description Handles changes to the quantity of a specific ingredient.
   * @param {number} ingredientId - The ID of the ingredient.
   * @param {number} quantity - The new quantity for the ingredient.
   */
  const handleIngredientChange = (ingredientId, quantity) => {
    setCurrentBowl(prev => {
      const newIngredients = { ...prev.ingredients };
      if (quantity > 0) {
        // If quantity is greater than 0, add/update the ingredient
        newIngredients[ingredientId] = quantity;
      } else {
        // If quantity is 0 or less, remove the ingredient from the list
        delete newIngredients[ingredientId];
      }
      return { ...prev, ingredients: newIngredients };
    });
  };

  /**
   * @function calculateBowlPrice
   * @description Calculates the total price of the current bowl based on selected items and size multiplier.
   * @param {Object} bowl - The bowl object containing base, proteins, and ingredients IDs and quantities.
   * @returns {number} The calculated price of the bowl.
   */
  const calculateBowlPrice = (bowl) => {
    let price = 0;
    // Add base price if a base is selected
    if (bowl.base) {
      const baseItem = findItem(bowl.base);
      if (baseItem) price += baseItem.price;
    }
    // Add protein prices based on quantity
    Object.entries(bowl.proteins).forEach(([id, quantity]) => {
      const proteinItem = findItem(parseInt(id)); // Ensure ID is an integer
      if (proteinItem) price += proteinItem.price * quantity;
    });
    // Add ingredient prices based on quantity
    Object.entries(bowl.ingredients).forEach(([id, quantity]) => {
      const ingredientItem = findItem(parseInt(id)); // Ensure ID is an integer
      if (ingredientItem) price += ingredientItem.price * quantity;
    });
    // Apply the price multiplier based on the selected bowl size
    price *= bowlSize.priceMultiplier;
    return price;
  };

  /**
   * @function resetCurrentBowl
   * @description Resets the current bowl configuration to its initial empty state.
   */
  const resetCurrentBowl = () => {
    setCurrentBowl({ base: null, proteins: {}, ingredients: {} });
    setBowlQuantity(1); // Reset quantity to 1
    // Safely reset size to the default/first available size
    setBowlSize(bowlSizes.length > 0 ? bowlSizes[0] : { id: 'regular', name: 'Regular', priceMultiplier: 1.0 });
  };

  /**
   * @function handleAddToOrder
   * @description Validates the current bowl and adds it to the main order via a prop function.
   * Then, it resets the bowl builder for creating another bowl and navigates to the cart page.
   */
  const handleAddToOrder = () => {
    // Basic validation: check if a base and at least one protein are selected
    if (!currentBowl.base || Object.keys(currentBowl.proteins).length === 0) {
      alert("Please select a base and at least one protein for your bowl.");
      return; // Stop if validation fails
    }

    // Calculate the price for the bowl currently being added
    const bowlPrice = calculateBowlPrice(currentBowl);

    // Create a complete bowl object including price for the order
    const bowlToAdd = {
      ...currentBowl, // Include base, proteins, ingredients IDs and quantities
      price: bowlPrice, // Add the calculated price per bowl
    };

    // Call the parent handler function to add the bowl to the global order state
    // Pass the bowl object, size object, and quantity as separate parameters
    onAddBowlToOrder(bowlToAdd, bowlSize, bowlQuantity);

    // Reset the bowl builder state so the user can create a new bowl
    resetCurrentBowl();

    // Navigate the user to the cart page after adding the bowl
    // This is optional; could also show a confirmation message and stay on the page
    navigate('/cart');
  };

  /**
   * @function BowlSizeSelector
   * @description A functional component to display and allow selection of bowl sizes.
   * @returns {JSX.Element} The JSX for the bowl size selection section.
   */
  const BowlSizeSelector = () => {
    // State for managing component visibility for animation
    const [isVisible, setIsVisible] = useState(false);

    // Effect to trigger the fade-in animation when the component mounts
    useEffect(() => {
      setIsVisible(true);
    }, []); // Empty dependency array means this effect runs only once after the initial render

    // New handler to prevent default behavior when selecting a bowl size
    const handleSizeSelection = (e, size) => {
      e.preventDefault(); // Prevent default form submission behavior
      e.stopPropagation(); // Stop event propagation
      setBowlSize(size); // Set the selected size
    };

    return (
      // Section container with ID, styling, and padding
      <div id="bowl-sizes" className="bowl-sizes section-content py-5">
        <Container>
          {/* Header row */}
          <Row className="mb-5">
            <Col className="text-center">
              {/* Header content with fade-in animation */}
              <div className={`section-header fade-in ${isVisible ? 'visible' : ''}`}>
                <h2 className="section-title">Select Bowl Size</h2>
                <div className="section-divider"></div>
                <p className="section-subtitle">Choose your perfect bowl size to start your meal</p>
              </div>
            </Col>
          </Row>

          {/* Row for bowl size cards, also with fade-in animation */}
          <Row className={`justify-content-center fade-in ${isVisible ? 'visible' : ''}`}>
            <Col md={10} lg={8}> {/* Constrain width on larger screens */}
              <Card className="dark-bg mb-4"> {/* Card container for size options */}
                <Card.Body className="py-4">
                  <Card.Title className="mb-4 text-center">Bowl Size Options</Card.Title>
                  <Row>
                    {/* Map through bowlSizes array to create a card for each size */}
                    {bowlSizes.map((size) => (
                      <Col key={size.id} md={4} className="mb-3"> {/* Column for each size card */}
                        <Card
                          // Apply h-100 for equal height, text-center, custom classes
                          // selected-size class applies border/shadow based on selection
                          className={`h-100 text-center size-selector-card ${bowlSize.id === size.id ? 'selected-size' : ''}`}
                          style={{
                            cursor: 'pointer', // Indicate clickability
                            // Dynamic background color based on selection state
                            background: bowlSize.id === size.id ? 'rgba(110, 72, 170, 0.3)' : 'rgba(30, 30, 30, 0.7)',
                            transition: 'all 0.3s ease', // Smooth transition on style changes
                            minHeight: '200px', // Ensure cards have a minimum height
                          }}
                        >
                          {/* Use a button instead of direct onClick on the Card */}
                          <button 
                            className="size-select-btn" 
                            onClick={(e) => handleSizeSelection(e, size)}
                            type="button" // Explicitly set type to button to prevent form submission
                          >
                            {/* Card body with flex centering */}
                            <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                              {/* Emoji icon with dynamic size based on bowl size */}
                              <div style={{
                                fontSize: size.id === 'regular' ? '3.5rem' : size.id === 'medium' ? '4rem' : '4.5rem',
                                opacity: '0.8',
                                marginBottom: '15px'
                              }}>
                                🍜 {/* Bowl emoji */}
                              </div>
                              {/* Card title for the size name */}
                              <Card.Title className="mb-2" style={{ color: 'white' }}>{size.name}</Card.Title>
                              {/* Card text for price multiplier */}
                              <Card.Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                                Price: ×{size.priceMultiplier.toFixed(1)} {/* Display multiplier */}
                              </Card.Text>
                            </Card.Body>
                          </button>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                  {/* Small text providing additional info */}
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

  /**
   * @function BowlSummary
   * @description A functional component to display a summary of the current bowl being built.
   * It includes the selected items, price, quantity selector, and the "Add to Order" button.
   * @returns {JSX.Element} The JSX for the bowl summary card.
   */
  const BowlSummary = () => {
    // Find the base item details using its ID
    const base = currentBowl.base ? findItem(currentBowl.base) : null;
    // Find details for selected protein items and include their quantities
    const proteinItems = Object.entries(currentBowl.proteins).map(([id, quantity]) => {
        const item = findItem(parseInt(id)); // Convert ID to number and find item
        return item ? { ...item, quantity } : null; // Return item details with quantity or null if not found
    }).filter(item => item !== null); // Filter out any items that weren't found
    // Find details for selected ingredient items and include their quantities
    const ingredientsList = Object.entries(currentBowl.ingredients).map(([id, quantity]) => {
        const item = findItem(parseInt(id)); // Convert ID to number and find item
        return item ? { ...item, quantity } : null; // Return item details with quantity or null if not found
    }).filter(item => item !== null); // Filter out any items that weren't found

    // Calculate the price for a single bowl based on current selections and size
    const currentPrice = calculateBowlPrice(currentBowl);

    /**
     * @function handleQuantityChange
     * @description Handles changing the quantity of bowls to add to the order.
     * @param {number} amount - The amount to change the quantity by (e.g., +1 or -1).
     */
    const handleQuantityChange = (amount) => {
      // Calculate the new quantity, ensuring it's at least 1
      const newQuantity = Math.max(1, bowlQuantity + amount);
      setBowlQuantity(newQuantity); // Update quantity state
    };

    return (
      // Card container for the summary
      <Card className="dark-bg mb-4">
        <Card.Body>
          <Card.Title className="mb-3">Your Bowl Summary</Card.Title>

          {/* List group to display selected items */}
          <ListGroup variant="flush">
            {/* Display base if selected */}
            {base && <ListGroup.Item className="dark-bg d-flex justify-content-between"><span>Base: {base.name}</span> <span>€{base.price.toFixed(2)}</span></ListGroup.Item>}
            {/* Display proteins if selected */}
            {proteinItems.length > 0 && <ListGroup.Item className="dark-bg d-flex justify-content-between"><span>Protein{proteinItems.length > 1 ? 's' : ''}: {proteinItems.map(p => `${p.name}${p.quantity > 1 ? ` ×${p.quantity}` : ''}`).join(', ')}</span> <span>€{proteinItems.reduce((total, p) => total + (p.price * p.quantity), 0).toFixed(2)}</span></ListGroup.Item>}
            {/* Display Ingredients label if any ingredients are selected */}
            {ingredientsList.length > 0 && <ListGroup.Item className="dark-bg pt-2 pb-0"><span className="fw-bold">Ingredients:</span></ListGroup.Item>}
            {/* Display each selected ingredient with its quantity */}
            {ingredientsList.map(ing => (
              <ListGroup.Item key={ing.id} className="dark-bg d-flex justify-content-between ps-4">
                <span>{ing.name} x {ing.quantity}</span>
                <span>€{(ing.price * ing.quantity).toFixed(2)}</span>
              </ListGroup.Item>
            ))}
            {/* Display Bowl Size */}
            <ListGroup.Item className="dark-bg fw-bold d-flex justify-content-between mt-2">
              <span>Bowl Size:</span>
              <span>{bowlSize.name} (×{bowlSize.priceMultiplier})</span>
            </ListGroup.Item>
            {/* Display Price per Bowl */}
            <ListGroup.Item className="dark-bg fw-bold d-flex justify-content-between">
              <span>Price per Bowl:</span>
              <span>€{currentPrice.toFixed(2)}</span>
            </ListGroup.Item>
          </ListGroup>

          {/* Bowl Quantity Selector */}
          <div className="mt-3 mb-3">
            <label className="d-block mb-2 fw-bold">Quantity:</label>
            {/* Container for the quantity buttons and display */}
            <div className="modern-quantity-selector d-flex align-items-center justify-content-center"> {/* Added justify-content-center here */}
              {/* Decrement button */}
              <Button
                variant="outline-light"
                className="modern-quantity-btn"
                onClick={() => handleQuantityChange(-1)}
                disabled={bowlQuantity <= 1} // Disable if quantity is 1 or less
              >
                − {/* Minus symbol */}
              </Button>
              {/* Quantity display */}
              <span className="modern-quantity-display">{bowlQuantity}</span>
              {/* Increment button */}
              <Button
                variant="outline-light"
                className="modern-quantity-btn"
                onClick={() => handleQuantityChange(1)}
              >
                + {/* Plus symbol */}
              </Button>
              {/* Total price for the selected quantity */}
              <span className="ms-3 fw-bold">Total: €{(currentPrice * bowlQuantity).toFixed(2)}</span>
            </div>
          </div>

          {/* Add to Order Button */}
          <Button
            variant="primary"
            className="w-100 mt-3 card-button"
            onClick={handleAddToOrder}
            disabled={!currentBowl.base || Object.keys(currentBowl.proteins).length === 0} // Disable if base or proteins are not selected
          >
            {/* Button text dynamically updates based on quantity */}
            Add {bowlQuantity > 1 ? `${bowlQuantity} Bowls` : 'Bowl'} to Order
          </Button>
        </Card.Body>
      </Card>
    );
  };

  // Main render function for the Bowl Builder Page
  return (
    <>
      {/* Render the Navigation component */}
      <Navigation />
      {/* Main content section for the builder */}
      <div className="section-content section-darker">
        <Container>
          {/* Section header */}
          <Row className="mb-5 text-center">
            <Col>
              <h1 className="section-title">Build Your Custom Bowl</h1>
              <div className="section-divider"></div>
              <p className="section-subtitle">Craft your perfect poke experience step by step.</p>
            </Col>
          </Row>
        </Container>

        {/* Render the Bowl Size Selector component */}
        <BowlSizeSelector />

        {/* Render the Bases selection component */}
        <Bases
          baseOptions={baseOptions}
          selectedBaseId={currentBowl.base}
          onSelectBase={handleSelectBase}
        />

        {/* Render the Proteins selection component */}
        <Proteins
          proteinOptions={proteinOptions}
          selectedProteins={currentBowl.proteins}
          onSelectProtein={handleSelectProtein}
        />

        {/* Render the Ingredients selection component */}
        <Ingredients
          ingredientCategories={ingredientCategories}
          selectedIngredients={currentBowl.ingredients}
          onIngredientChange={handleIngredientChange}
        />

        {/* Container for the Bowl Summary and Add to Order section */}
        <Container>
          <Row className="justify-content-center mt-4 mb-5">
            <Col md={8}> {/* Constrain summary width on larger screens */}
              {/* Render the Bowl Summary component */}
              <BowlSummary />
            </Col>
          </Row>
        </Container>
      </div>
      {/* Render the Footer component */}
      <Footer />
    </>
  );
}

export default BowlBuilderPage;