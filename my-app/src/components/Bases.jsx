import { useState, useEffect } from 'react';
// Import Bootstrap components
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

/**
 * @function Bases
 * @description A component to display and allow selection of bowl bases.
 * It fetches base options (or receives them via props), displays them as cards,
 * and highlights the currently selected base. Includes scroll-based animation.
 *
 * @param {Object} props - The component props.
 * @param {Array<Object>} [props.baseOptions=[]] - Array of available base options. Each object should have id, name, description, price, image.
 * @param {number|null} [props.selectedBaseId=null] - The ID of the currently selected base.
 * @param {function(number): void} [props.onSelectBase=()=>{}] - Callback function to call when a base is selected. It receives the base ID.
 * @returns {JSX.Element} The JSX for the Bases section.
 */
// Receive baseOptions, selectedBaseId, and onSelectBase as props with defaults
function Bases({ baseOptions = [], selectedBaseId = null, onSelectBase = () => {} }) {
    // State to manage the visibility for the scroll-based animation
    const [isVisible, setIsVisible] = useState(false);

    // Effect hook to handle the scroll event and trigger the animation
    useEffect(() => {
        /**
         * @function handleScroll
         * @description Checks if the 'bases' section is visible in the viewport
         * and updates the isVisible state accordingly to trigger animation classes.
         */
        const handleScroll = () => {
            const section = document.getElementById('bases'); // Get the section element by its ID
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

    // New handler to handle card selection without reloading
    const handleSelectBase = (e, baseId) => {
        e.preventDefault(); // Prevent default form submission behavior
        e.stopPropagation(); // Stop event propagation
        onSelectBase(baseId); // Call the provided onSelectBase handler
    };

    return (
        // Section container with ID, custom styling classes, and vertical padding
        <div id='bases' className="bases section-content py-5">
            <Container> {/* Bootstrap container for responsive centering and padding */}
                {/* Section header row */}
                <Row className="mb-5">
                    <Col className="text-center"> {/* Full width column for the header */}
                        {/* Header content with fade-in animation controlled by isVisible */}
                        <div className={`section-header fade-in ${isVisible ? 'visible' : ''}`}>
                            {/* section-title: Styles the main heading */}
                            <h2 className="section-title">Choose Your Base</h2>
                            {/* section-divider: Styles the decorative line */}
                            <div className="section-divider"></div>
                            {/* section-subtitle: Styles the introductory paragraph */}
                            <p className="section-subtitle">Start building your perfect bowl with a delicious foundation</p>
                        </div>
                    </Col>
                </Row>

                {/* Conditional rendering: Show loading message if baseOptions is empty */}
                {baseOptions.length === 0 ? (
                    <Row className="justify-content-center">
                        <Col md={8} className="text-center">
                            <div className="dark-bg p-4 rounded">
                                <p>Loading base options...</p> {/* Loading message */}
                            </div>
                        </Col>
                    </Row>
                ) : (
                    // If bases are available, render the grid of cards
                    // card-grid: Apply custom grid styling and initial animation state
                    // isVisible controls the 'visible' class for the grid animation
                    <Row className={`card-grid bowl-sizes ${isVisible ? 'visible' : ''}`}>
                        {/* Map through the baseOptions array to render a card for each base */}
                        {baseOptions.map((base) => (
                            // Column for each base card
                            // xs={12}: Full width on extra small screens
                            // md={6}: 6 columns on medium screens (2 cards per row)
                            // lg={4}: 4 columns on large screens (3 cards per row)
                            <Col key={base.id} xs={12} md={6} lg={4} className="mb-4">
                                {/* Card container with custom styling and conditional border/highlight if selected */}
                                <Card
                                    // modern-card: Apply custom card styling
                                    // h-100: Make cards equal height
                                    // Conditional classes for the border/highlight
                                    className={`modern-card h-100 ${selectedBaseId === base.id ? 'selected-size' : ''}`}
                                >
                                    {/* Using a button instead of onClick on the Card itself */}
                                    <button 
                                        className="size-select-btn" 
                                        onClick={(e) => handleSelectBase(e, base.id)}
                                        type="button" // Explicitly set type to button to prevent form submission
                                    >
                                        {/* Card image */}
                                        <Card.Img
                                            src={base.image} // Image source from base data
                                            alt={base.name} // Alt text for accessibility
                                            className="modern-card-img" // Apply custom image styling
                                        />
                                        {/* Gradient overlay for the image */}
                                        <div className="card-gradient-overlay"></div>
                                        
                                        {/* Price tag now positioned via CSS in top right */}
                                        <p className="card-price">€{base.price.toFixed(2)}</p>
                                        
                                        {/* Card content overlay, positioned over the image */}
                                        <Card.ImgOverlay className="d-flex flex-column justify-content-between p-4">
                                            {/* card-content: Apply custom styling for the content area */}
                                            <div className="card-content">
                                                {/* card-title: Styles the title */}
                                                <h3 className="card-title">{base.name}</h3>
                                                {/* card-description: Styles the description */}
                                                <p className="card-description">{base.description}</p>
                                            </div>

                                            {/* Modified button layout for consistent positioning */}
                                            <div className="d-flex justify-content-between w-100 mb-2">
                                                {/* Select Base Button */}
                                                <Button
                                                    variant="primary"
                                                    className="card-button"
                                                    onClick={(e) => handleSelectBase(e, base.id)}
                                                    type="button"
                                                >
                                                    {selectedBaseId === base.id ? 'Selected' : 'Select Base'}
                                                </Button>
                                                
                                                {/* Empty div to maintain space for positioning consistency */}
                                                <div></div>
                                            </div>
                                        </Card.ImgOverlay>
                                    </button>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </div>
    );
}

export default Bases;