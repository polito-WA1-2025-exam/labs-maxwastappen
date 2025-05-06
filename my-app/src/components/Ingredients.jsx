import React, { useState, useEffect } from 'react';
// Import Bootstrap components for layout, cards, buttons, and tabs
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

/**
 * @function Ingredients
 * @description A component to display and allow selection of ingredients organized by categories using tabs.
 * Users can adjust the quantity of each ingredient using a counter. Includes scroll-based animation.
 *
 * @param {Object} props - The component props.
 * @param {Array<Object>} [props.ingredientCategories=[]] - Array of ingredient categories. Each object should have a 'category' string and an 'items' array.
 * @param {Object} [props.selectedIngredients={}] - An object representing the currently selected ingredients and their quantities, e.g., { ingredientId: quantity }.
 * @param {function(number, number): void} [props.onIngredientChange=()=>{}] - Callback function to call when an ingredient's quantity changes. It receives the ingredient ID and the new quantity.
 * @returns {JSX.Element} The JSX for the Ingredients section.
 */
// Receive ingredientCategories, selectedIngredients, and onIngredientChange as props with defaults
function Ingredients({ ingredientCategories = [], selectedIngredients = {}, onIngredientChange = () => {} }) {
    // State to manage the visibility for the scroll-based animation
    const [isVisible, setIsVisible] = useState(false);

    // Effect hook to handle the scroll event and trigger the animation
    useEffect(() => {
        /**
         * @function handleScroll
         * @description Checks if the 'ingredients' section is visible in the viewport
         * and updates the isVisible state accordingly to trigger animation classes.
         */
        const handleScroll = () => {
            const section = document.getElementById('ingredients'); // Get the section element by its ID
            if (section) { // Check if the element exists
                const rect = section.getBoundingClientRect(); // Get the element's position and dimensions relative to the viewport
                // Check if the top of the section is within 75% of the viewport height
                // AND if the bottom of the section is still within the viewport
                if (rect.top <= window.innerHeight * 0.75 && rect.bottom >= 0) {
                    setIsVisible(true); // If visible, set isVisible to true
                }
            }
        };

        // Add the scroll event listener when the component mounts
        window.addEventListener('scroll', handleScroll);
        // Call handleScroll once on mount to check initial visibility
        handleScroll();

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Empty dependency array ensures this effect runs only once on mount and cleans up on unmount

    /**
     * @function increaseQuantity
     * @description Increases the quantity of a specific ingredient by 1.
     * Calls the parent's onIngredientChange handler.
     * @param {number} id - The ID of the ingredient to increase.
     */
    const increaseQuantity = (id) => {
        // Get the current quantity from selectedIngredients state, defaulting to 0 if not found
        const currentQuantity = selectedIngredients[id] || 0;
        // Call the parent handler with the ingredient ID and the new quantity (current + 1)
        onIngredientChange(id, currentQuantity + 1);
    };

    /**
     * @function decreaseQuantity
     * @description Decreases the quantity of a specific ingredient by 1, as long as it's greater than 0.
     * Calls the parent's onIngredientChange handler.
     * @param {number} id - The ID of the ingredient to decrease.
     */
    const decreaseQuantity = (id) => {
        // Get the current quantity from selectedIngredients state, defaulting to 0 if not found
        const currentQuantity = selectedIngredients[id] || 0;
        // Only decrease if the current quantity is greater than 0
        if (currentQuantity > 0) {
            // Call the parent handler with the ingredient ID and the new quantity (current - 1)
            onIngredientChange(id, currentQuantity - 1);
        }
    };

    /**
     * @function getQuantity
     * @description Helper function to retrieve the current quantity of a specific ingredient.
     * @param {number} id - The ID of the ingredient.
     * @returns {number} The current quantity of the ingredient, or 0 if not selected.
     */
    const getQuantity = (id) => selectedIngredients[id] || 0;

    return (
        // Section container with ID, custom styling classes, and vertical padding
        <div id="ingredients" className="ingredients section-content py-5">
            <Container> {/* Bootstrap container for responsive centering and padding */}
                {/* Section header row */}
                <Row className="mb-5">
                    <Col className="text-center"> {/* Full width column for the header */}
                        {/* Header content with fade-in animation controlled by isVisible */}
                        <div className={`section-header fade-in ${isVisible ? 'visible' : ''}`}>
                            {/* section-title: Styles the main heading */}
                            <h2 className="section-title">Customize Your Bowl</h2>
                            {/* section-divider: Styles the decorative line */}
                            <div className="section-divider"></div>
                            {/* section-subtitle: Styles the introductory paragraph */}
                            <p className="section-subtitle">Add fresh ingredients to create your perfect flavor</p>
                        </div>
                    </Col>
                </Row>

                {/* Conditional rendering: Show loading message if ingredientCategories is empty */}
                {ingredientCategories.length === 0 ? (
                    <Row className="justify-content-center">
                        <Col md={8} className="text-center">
                            <div className="dark-bg p-4 rounded">
                                <p>Loading ingredient options...</p> {/* Loading message */}
                            </div>
                        </Col>
                    </Row>
                ) : (
                    // If ingredients are available, render the tabs and cards
                    // fade-in-delay: Apply animation with a delay
                    // isVisible controls the 'visible' class for the animation
                    <Row className={`fade-in-delay ${isVisible ? 'visible' : ''}`}>
                        <Col> {/* Full width column for the tabs and ingredient cards */}
                            <div className="ingredients-tabs">
                                {/* Bootstrap Tabs component for category navigation */}
                                <Tabs
                                    // Set the default active tab to the first category (or 'vegetables' as fallback)
                                    defaultActiveKey={ingredientCategories[0]?.category.toLowerCase() || 'vegetables'}
                                    id="ingredients-categories" // Unique ID for the tabs component
                                    // mb-5: Add bottom margin
                                    // justify-content-center: Center the tabs horizontally
                                    // custom-tabs: Apply custom styling to the tabs
                                    className="mb-5 justify-content-center custom-tabs"
                                >
                                    {/* Map through the ingredientCategories array to create a Tab for each category */}
                                    {ingredientCategories.map(category => (
                                        <Tab
                                            // eventKey: Unique key for the tab (using category name lowercase)
                                            eventKey={category.category.toLowerCase()}
                                            title={category.category} // Text displayed on the tab header
                                            key={category.id} // Unique key for React rendering
                                        >
                                            {/* Row to display ingredient cards within the current tab */}
                                            {/* card-grid: Apply custom grid styling and animation state */}
                                            {/* isVisible controls the 'visible' class for the grid animation */}
                                            <Row className={`card-grid ${isVisible ? 'visible' : ''}`}>
                                                {/* Map through the items within the current category */}
                                                {category.items.map(item => {
                                                    // Get the current quantity for this item
                                                    const quantity = getQuantity(item.id);
                                                    return (
                                                        // Column for each ingredient card
                                                        // xs={12}: Full width on extra small screens
                                                        // sm={6}: 6 columns on small screens (2 cards per row)
                                                        // md={4}: 4 columns on medium screens (3 cards per row)
                                                        // lg={3}: 3 columns on large screens (4 cards per row)
                                                        <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                                                            {/* Card container with custom styling and conditional border/highlight if quantity > 0 */}
                                                            <Card className={`modern-card h-100 ${quantity > 0 ? 'border border-primary border-1' : ''}`}>
                                                                {/* Card image */}
                                                                <Card.Img
                                                                    src={item.image} // Image source from item data
                                                                    alt={item.name} // Alt text
                                                                    className="modern-card-img" // Apply custom image styling
                                                                />
                                                                {/* Gradient overlay */}
                                                                <div className="card-gradient-overlay"></div>
                                                                {/* Card content overlay */}
                                                                <Card.ImgOverlay className="d-flex flex-column justify-content-between p-4">
                                                                    {/* card-content: Apply custom styling */}
                                                                    <div className="card-content">
                                                                        {/* card-title: Styles the title */}
                                                                        <h3 className="card-title">{item.name}</h3>
                                                                        {/* card-price: Styles the price */}
                                                                        <p className="card-price">€{item.price.toFixed(2)}</p> {/* Ensure price format */}
                                                                    </div>

                                                                    {/* Improved Quantity Counter Component */}
                                                                    {/* improved-counter: Apply custom styling for the counter */}
                                                                    <div className="improved-counter">
                                                                        {/* Decrement Button */}
                                                                        <Button
                                                                            variant="light" // Light button style
                                                                            className="counter-btn decrement" // Custom button class for counter and decrement styling
                                                                            // Stop click propagation from the button to prevent triggering unwanted parent clicks
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                decreaseQuantity(item.id); // Call decrease handler
                                                                            }}
                                                                            disabled={quantity === 0} // Disable button if quantity is 0
                                                                        >
                                                                            − {/* Minus symbol */}
                                                                        </Button>
                                                                        {/* Quantity Display */}
                                                                        <span className="counter-display">{quantity}</span> {/* Display current quantity */}
                                                                        {/* Increment Button */}
                                                                        <Button
                                                                            variant="light" // Light button style
                                                                            className="counter-btn increment" // Custom button class for counter and increment styling
                                                                            // Stop click propagation from the button
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                increaseQuantity(item.id); // Call increase handler
                                                                            }}
                                                                        >
                                                                            + {/* Plus symbol */}
                                                                        </Button>
                                                                    </div>
                                                                </Card.ImgOverlay>
                                                            </Card>
                                                        </Col>
                                                    );
                                                })}
                                            </Row>
                                        </Tab>
                                    ))}
                                </Tabs>
                            </div>
                        </Col>
                    </Row>
                )}
            </Container>
        </div>
    );
}

export default Ingredients;