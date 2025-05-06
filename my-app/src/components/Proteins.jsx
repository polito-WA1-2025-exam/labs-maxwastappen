import React, { useState, useEffect } from 'react';
// Import Bootstrap components for layout, cards, buttons, alerts, and badges
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';

/**
 * @file Proteins.js
 * @description Component to display and allow selection of protein options for a poke bowl.
 */

/**
 * @function Proteins
 * @description A component to display and allow selection of protein options for building a poke bowl.
 * It shows protein options as cards, allows selecting up to a maximum number of proteins,
 * displays a counter for selected proteins, and includes scroll-based animation.
 *
 * @param {Object} props - The component props.
 * @param {Array<Object>} [props.proteinOptions=[]] - Array of available protein options. Each object should have an `id`, `name`, `description`, `price`, and `image` property.
 * @param {Object} [props.selectedProteins={}] - An object representing the currently selected proteins and their quantities (although quantity is always 1 for protein selection here), e.g., { proteinId: 1 }.
 * @param {function(number): void} [props.onSelectProtein=()=>{}] - Callback function to call when a protein card or its button is clicked. It receives the `proteinId`. The parent component is responsible for updating the `selectedProteins` state.
 * @returns {JSX.Element} The JSX for the Proteins section.
 */
// Update props to receive selectedProteins, onSelectProtein with default values
function Proteins({ proteinOptions = [], selectedProteins = {}, onSelectProtein = () => {} }) {
    // State to manage the visibility of the component for the scroll-based animation
    const [isVisible, setIsVisible] = useState(false);
    // State to control the visibility of the alert message when the maximum number of proteins is reached
    const [showMaxAlert, setShowMaxAlert] = useState(false);

    // Define the maximum number of proteins allowed in a bowl
    // This could potentially be passed as a prop if it varies by bowl size
    const maxProteins = 3;

    // Calculate the total number of selected proteins
    // Object.values() gets an array of quantities from the selectedProteins object
    // reduce sums these quantities. For this component, quantities are implicitly 1 when selected.
    const totalProteinsSelected = Object.values(selectedProteins).reduce((sum, count) => sum + count, 0);

    /**
     * @function increaseProteinQuantity
     * @description Increases the quantity of a specific protein by 1 if total proteins limit is not exceeded.
     * @param {number} id - The ID of the protein to increase.
     * @param {number} newQuantity - Optional specific quantity to set (used by the Remove button)
     */
    const increaseProteinQuantity = (id, newQuantity) => {
        // If newQuantity is provided (0 for remove button), use it directly
        if (newQuantity !== undefined) {
            onSelectProtein(id, newQuantity);
            return;
        }
        
        // Get the current quantity for this protein
        const currentQuantity = selectedProteins[id] || 0;
        
        // Check if adding another protein would exceed the maximum
        if (totalProteinsSelected >= maxProteins && currentQuantity === 0) {
            // Show alert if trying to add a new protein when max is reached
            setShowMaxAlert(true);
            return;
        }
        
        // Call the parent handler with the protein ID and the new quantity
        onSelectProtein(id, currentQuantity + 1);
    };

    // Effect hook to handle the scroll event and trigger the animation
    useEffect(() => {
        /**
         * @function handleScroll
         * @description Checks if the 'proteins' section is visible in the viewport
         * and updates the isVisible state accordingly to trigger animation classes.
         */
        const handleScroll = () => {
            const section = document.getElementById('proteins'); // Get the section element by its ID
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

    return (
        // Section container with ID, custom styling classes, and vertical padding
        <div id="proteins" className="proteins section-content py-5">
            <Container> {/* Bootstrap container for responsive centering and padding */}
                {/* Section header row */}
                <Row className="mb-5">
                    <Col className="text-center"> {/* Full width column for the header */}
                        {/* Header content with fade-in animation controlled by isVisible */}
                        <div className={`section-header fade-in ${isVisible ? 'visible' : ''}`}>
                            {/* section-title: Styles the main heading */}
                            <h2 className="section-title">Add Your Proteins</h2>
                            {/* section-divider: Styles the decorative line */}
                            <div className="section-divider"></div>
                            {/* section-subtitle: Styles the introductory paragraph */}
                            <p className="section-subtitle">
                                Select your proteins for a delicious bowl
                            </p>
                             {/* Note about the protein limit */}
                            <p className="section-subtitle mt-2">
                                <small>You can add up to {maxProteins} proteins to your bowl</small>
                            </p>
                        </div>
                    </Col>
                </Row>

                {/* Alert message for maximum proteins reached */}
                {showMaxAlert && (
                    <Row className="mb-4 justify-content-center"> {/* Center the alert row */}
                        <Col md={8}> {/* Constrain alert width */}
                            {/* Bootstrap Alert component */}
                            <Alert variant="warning" onClose={() => setShowMaxAlert(false)} dismissible>
                                <Alert.Heading>Maximum Proteins Reached!</Alert.Heading> {/* Alert title */}
                                <p> {/* Alert message */}
                                    Your bowl can have up to {maxProteins} proteins.
                                    Remove a protein before adding more.
                                </p>
                            </Alert>
                        </Col>
                    </Row>
                )}

                 {/* Row for the protein counter display */}
                <Row className="mb-3">
                    <Col className="text-center"> {/* Center the counter */}
                        <div className="protein-counter"> {/* Custom class for potential counter styling */}
                            {/* Display current number of selected proteins */}
                            {/* Conditionally apply text-success class if max is reached */}
                            <span className={`selected-count ${totalProteinsSelected === maxProteins ? 'text-success' : ''}`}>
                                {totalProteinsSelected}
                            </span>
                            {/* Display the maximum allowed proteins */}
                            <span className="max-count">/ {maxProteins} proteins selected</span>
                        </div>
                    </Col>
                </Row>


                {/* Conditional rendering: Show loading message if proteinOptions is empty */}
                {proteinOptions.length === 0 ? (
                    <Row className="justify-content-center">
                        <Col md={8} className="text-center">
                            <div className="dark-bg p-4 rounded">
                                <p>Loading protein options...</p> {/* Loading message */}
                            </div>
                        </Col>
                    </Row>
                ) : (
                    // If proteins are available, render the grid of cards
                    // card-grid: Apply custom grid styling and initial animation state
                    // isVisible controls the 'visible' class for the grid animation
                    <Row className={`card-grid ${isVisible ? 'visible' : ''}`}>
                        {/* Map through the proteinOptions array to render a card for each protein */}
                        {proteinOptions.map(protein => {
                            // Check if the current protein is selected by looking it up in selectedProteins
                            const isSelected = selectedProteins[protein.id] ? true : false;
                            return (
                                // Column for each protein card
                                // xs={12}: Full width on extra small screens
                                // md={6}: 6 columns on medium screens (2 cards per row)
                                // lg={3}: 3 columns on large screens (4 cards per row)
                                <Col key={protein.id} xs={12} md={6} lg={3} className="mb-4">
                                    {/* Card container with custom styling and conditional border/highlight if selected */}
                                    <Card
                                        // modern-card: Apply custom card styling
                                        // h-100: Make cards equal height
                                        // Conditional classes for the border/highlight based on selection
                                        className={`modern-card h-100 ${isSelected ? 'border border-primary border-3 selected-size' : ''}`}
                                        // Call onSelectProtein when the card is clicked
                                        // This handles both selection and deselection based on the proteinId
                                        onClick={() => onSelectProtein(protein.id)}
                                        style={{ cursor: 'pointer' }} // Indicate clickability
                                    >
                                        {/* Card image */}
                                        <Card.Img
                                            src={protein.image} // Image source from protein data
                                            alt={protein.name} // Alt text for accessibility
                                            className="modern-card-img" // Apply custom image styling
                                        />
                                        {/* Gradient overlay for the image */}
                                        <div className="card-gradient-overlay"></div>
                                        
                                        {/* Price tag now positioned via CSS in top right */}
                                        <p className="card-price">€{protein.price.toFixed(2)}</p>
                                        
                                        {/* Card content overlay, positioned over the image */}
                                        <Card.ImgOverlay 
                                            className="d-flex flex-column justify-content-between p-4"
                                            onClick={() => increaseProteinQuantity(protein.id)} // Increment quantity when card is clicked
                                        >
                                            <div className="card-content">
                                                {/* card-title: Styles the title */}
                                                <h3 className="card-title">{protein.name}</h3>
                                                {/* card-description: Styles the description */}
                                                <p className="card-description">{protein.description}</p>
                                                {/* Removed price tag from here */}
                                                {/* Show quantity badge if protein is selected */}
                                                {selectedProteins[protein.id] > 0 && (
                                                    <div className="quantity-badge">
                                                        ×{selectedProteins[protein.id]}
                                                    </div>
                                                )}
                                            </div>
                                            
                                            {/* Modified button layout - consistent width and centered text */}
                                            <div className="d-flex justify-content-between w-100 mb-2">
                                                <Button
                                                    variant="primary"
                                                    className="card-button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        increaseProteinQuantity(protein.id);
                                                    }}
                                                    disabled={totalProteinsSelected >= maxProteins && !selectedProteins[protein.id]}
                                                >
                                                    {isSelected ? 'Add More' : 'Select'}
                                                </Button>
                                                
                                                {isSelected ? (
                                                    <Button
                                                        variant="outline-danger"
                                                        className="card-button-danger"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            onSelectProtein(protein.id, 0);
                                                        }}
                                                    >
                                                        Remove
                                                    </Button>
                                                ) : (
                                                    <div></div>
                                                )}
                                            </div>
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