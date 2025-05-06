import React, { useState, useEffect } from 'react';
// Import Bootstrap components for layout, forms, buttons, cards, lists, and badges
import { Container, Row, Col, Form, Button, Card, ListGroup, Badge } from 'react-bootstrap';

/**
 * @function OrderForm
 * @description A component that displays the order summary and a form for customer details.
 * This component is used to finalize an order before submission. It allows reviewing
 * the selected bowls, removing items, entering delivery and payment information,
 * and placing the order.
 *
 * @param {Object} props - The component props.
 * @param {Array<Object>} [props.order=[]] - An array of bowl objects representing the current order. Each bowl object should contain details like `id`, `price`, `amount`, `base`, `proteins`, `ingredients`, `size`.
 * @param {function(number): void} [props.onRemoveBowl=()=>{}] - Callback function to decrease the quantity of a specific bowl item in the order by one. Receives the bowl's `id`.
 * @param {function(number): void} [props.onRemoveBowlCompletely=()=>{}] - Callback function to remove a specific bowl item entirely from the order. Receives the bowl's `id`.
 * @param {function(number): Object | null} [props.findItem=()=>null] - Function to find an item (base, protein, ingredient) by its ID from the global data source.
 * @param {Object|null} [props.existingOrder=null] - Optional object representing an existing order to pre-fill the form (e.g., for editing).
 * @param {function(Object): void} [props.onSubmit] - Callback function to call when the form is successfully validated and submitted. Receives an object containing `customerDetails`, `bowls`, `total`, `date`, and `status`.
 * @returns {JSX.Element} The JSX for the Order Form section.
 */
// Updated props to include onRemoveBowlCompletely and existingOrder
function OrderForm({
    order = [], // Default to empty array if order prop is not provided
    onRemoveBowl = () => {}, // Default to a no-op function
    onRemoveBowlCompletely = () => {}, // Default to a no-op function
    findItem = () => null, // Default to a function returning null
    existingOrder = null, // Default to null
    onSubmit // No default for onSubmit as it might be required behavior
}) {
    // State to hold the form data for customer details
    // Initialize from existingOrder data if provided, otherwise empty strings
    const [formData, setFormData] = useState({
        id: existingOrder?.id || '', // Order ID if editing existing
        name: existingOrder?.name || '',
        email: existingOrder?.email || '',
        phone: existingOrder?.phone || '',
        address: existingOrder?.address || '',
        notes: existingOrder?.notes || '',
        deliveryTime: existingOrder?.deliveryTime || '',
        paymentMethod: existingOrder?.paymentMethod || 'card' // Default payment method
    });

    // State for managing Bootstrap form validation visual feedback
    const [validated, setValidated] = useState(false);

    // State for managing the visibility of the component for animation purposes
    const [isVisible, setIsVisible] = useState(false);

    // Effect hook to trigger the fade-in animation when the component mounts
    useEffect(() => {
        // Set isVisible to true after the component mounts
        setIsVisible(true);
        // Empty dependency array means this effect runs only once on mount
    }, []);

    // Calculate the total price of all bowls in the current order
    // This is a derived value, recalculated whenever the 'order' prop changes
    const totalOrderPrice = order.reduce(
        (sum, bowl) => sum + (bowl.price * bowl.amount), // Accumulate sum of price * amount for each bowl
        0 // Initial value for the sum
    ).toFixed(2); // Format the total to two decimal places

    /**
     * @function handleChange
     * @description Handles changes to input fields in the customer details form.
     * Updates the corresponding field in the `formData` state.
     * @param {Object} e - The synthetic event object from the input change.
     */
    const handleChange = (e) => {
        const { name, value } = e.target; // Destructure name and value from the event target
        setFormData({
            ...formData, // Copy existing form data
            [name]: value // Update the specific field dynamically using the input's 'name' attribute
        });
    };

    /**
     * @function handleSubmit
     * @description Handles the form submission event.
     * Prevents the default browser form submission, triggers Bootstrap validation,
     * and if valid, calls the `onSubmit` prop with the complete order details.
     * @param {Object} e - The synthetic event object from the form submission.
     */
    const handleSubmit = (e) => {
        const form = e.currentTarget; // Get the form element
        e.preventDefault(); // Prevent default form submission (page reload)

        // Perform Bootstrap form validation
        if (form.checkValidity() === false) {
            e.stopPropagation(); // Stop the event propagation
            setValidated(true); // Set validated state to true to show validation feedback
            return; // Stop the submission process if the form is invalid
        }

        // If validation passes, prepare the data object to submit
        const orderDataToSubmit = {
            customerDetails: formData, // Include customer form data
            bowls: order, // Include the array of bowls in the order
            total: parseFloat(totalOrderPrice), // Include the calculated total price as a number
            date: new Date().toISOString(), // Add the current date and time
            status: existingOrder ? existingOrder.status : 'pending' // Set status (e.g., 'pending' for new orders)
        };

        // Call the onSubmit prop if it's provided
        if (onSubmit) {
            onSubmit(orderDataToSubmit);
        } else {
            // Fallback behavior if onSubmit is not provided (e.g., on a static page)
            console.log("Order Submitted:", orderDataToSubmit);
            alert('Order Placed (Check Console)!'); // Simple alert for demo purposes
        }
    };

    /**
     * @function renderBowlSummary
     * @description Renders a detailed summary item for a single bowl in the order list.
     * Includes base, proteins, ingredients, quantity controls, and price.
     * @param {Object} bowl - The bowl object to render.
     * @returns {JSX.Element} A ListGroup.Item element representing the bowl summary.
     */
    const renderBowlSummary = (bowl) => {
        const { id, amount } = bowl; // Destructure bowl ID and amount (quantity)
        const base = findItem(bowl.base); // Find the base item details

        // Map through the proteins object to get details and quantities
        const proteinItems = Object.entries(bowl.proteins).map(([id, quantity]) => {
            const item = findItem(parseInt(id)); // Find protein item details by ID (ensure ID is integer)
            return item ? { ...item, quantity } : null; // Return item details including quantity, or null if not found
        }).filter(item => item !== null); // Filter out any null entries

        // Map through the ingredients object to get details and quantities
        const ingredientsList = Object.entries(bowl.ingredients).map(([id, quantity]) => {
            const item = findItem(parseInt(id)); // Find ingredient item details by ID (ensure ID is integer)
            return item ? { ...item, quantity } : null; // Return item details including quantity, or null if not found
        }).filter(item => item !== null); // Filter out any null entries

        // Calculate the total price for this specific bowl item (price * amount)
        const bowlTotal = (bowl.price * amount).toFixed(2);

        return (
            // ListGroup Item for a single bowl summary
            // Use bowl.id as the unique key for list rendering
            // dark-bg, mb-3, p-3, border, rounded: Apply custom and Bootstrap styling
            <ListGroup.Item key={id} className="dark-bg mb-3 p-3 border rounded">
                {/* Header row for bowl type, quantity badge, and remove buttons */}
                <div className="d-flex justify-content-between align-items-start mb-2">
                    {/* Bowl type and quantity badge */}
                    <div className="d-flex align-items-center">
                        <h6 className="mb-0">
                            {bowl.size?.name || 'Regular'} Bowl {/* Display size name, fallback to 'Regular' */}
                        </h6>
                        {/* Quantity Badge */}
                        <Badge bg="primary" pill className="ms-2">
                            ×{amount} {/* Display the amount (quantity) of this bowl type */}
                        </Badge>
                    </div>
                    {/* Container for remove buttons */}
                    <div>
                        {/* Button to decrease bowl quantity by one */}
                        {/* variant="outline-danger": Red outline button */}
                        {/* size="sm": Small button size */}
                        {/* p-1, lh-1, me-2: Add padding, adjust line height, add right margin */}
                        <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => onRemoveBowl(id)} // Call the handler to decrease quantity
                            className="p-1 lh-1 me-2"
                        >
                            − Remove One {/* Text and symbol */}
                        </Button>
                        {/* Button to remove the bowl type completely */}
                        {/* p-1, lh-1: Add padding, adjust line height */}
                        <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => onRemoveBowlCompletely(id)} // Call the handler to remove completely
                            className="p-1 lh-1"
                        >
                            ✕ Remove All {/* Text and symbol */}
                        </Button>
                    </div>
                </div>
                {/* Section for detailed bowl contents (base, proteins, ingredients) */}
                <div className="small"> {/* Smaller font size */}
                    {base && <div><strong>Base:</strong> {base.name}</div>} {/* Display base if selected */}

                    {/* Display proteins if any are selected */}
                    {proteinItems.length > 0 && (
                        <div>
                            <strong>Protein{proteinItems.length > 1 ? 's' : ''}:</strong>
                            {' '} {/* Add a space */}
                            {/* Map through protein items to list them */}
                            {proteinItems.map((p, i) => (
                                <span key={p.id}>
                                    {p.name}{p.quantity > 1 ? ` ×${p.quantity}` : ''} {/* Display name and quantity if > 1 */}
                                    {i < proteinItems.length - 1 ? ', ' : ''} {/* Add comma and space if not the last item */}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Display ingredients if any are selected */}
                    {ingredientsList.length > 0 && (
                        <div>
                            <strong>Ingredients:</strong>
                            {/* Unstyled list for ingredients */}
                            <ul className="list-unstyled ps-3 mb-0">
                                {ingredientsList.map(ing => (
                                    // List item for each ingredient
                                    <li key={ing.id}>{ing.name} ×{ing.quantity}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                {/* Section for price details */}
                {/* d-flex justify-content-between align-items-center fw-bold mt-2: Use flexbox, justify, align, bold font, top margin */}
                <div className="d-flex justify-content-between fw-bold mt-2">
                    <div>Price per bowl: €{bowl.price.toFixed(2)}</div> {/* Price of a single bowl */}
                    <div>Subtotal: €{bowlTotal}</div> {/* Total price for this item type (price * amount) */}
                </div>
            </ListGroup.Item>
        );
    };

    return (
        // Main container div for the Order Form section
        // id="order-form": Assigns an ID for potential linking or scrolling
        // section-content, py-5: Apply custom styling and vertical padding
        // isVisible ? 'visible' : '': Apply 'visible' class for animation
        <div id="order-form" className={`section-content py-5 ${isVisible ? 'visible' : ''}`}>
            <Container> {/* Bootstrap container */}
                {/* Section header row */}
                <Row className="mb-5">
                    <Col className="text-center"> {/* Full width column, centered text */}
                        {/* Header content with fade-in animation */}
                        <div className={`section-header fade-in ${isVisible ? 'visible' : ''}`}>
                            {/* Section title changes based on whether there are bowls in the order */}
                            <h2 className="section-title">{order.length > 0 ? 'Finalize Your Order' : 'Your Order is Empty'}</h2>
                            {/* section-divider: Styles the decorative line */}
                            <div className="section-divider"></div>
                            {/* Section subtitle changes based on whether there are bowls in the order */}
                            <p className="section-subtitle">
                                {order.length > 0
                                    ? 'Review your bowls and provide delivery details below'
                                    : 'Add some bowls using the sections above!'}
                            </p>
                        </div>
                    </Col>
                </Row>

                {/* Main content row for the form and summary, with fade-in-delay animation */}
                <Row className={`fade-in-delay ${isVisible ? 'visible' : ''}`}>
                    {/* Customer Details Form Column */}
                    {/* Only show the form if there are bowls in the order */}
                    {order.length > 0 && (
                        <Col lg={7}> {/* Takes 7 columns on large screens and up */}
                            <Card className="dark-bg mb-4"> {/* Card container for the form */}
                                <Card.Body>
                                    <Card.Title className="mb-4">Your Information</Card.Title> {/* Form title */}
                                    {/* Form component with noValidate and validated state for Bootstrap validation */}
                                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                        {/* Name and Email Row */}
                                        <Row>
                                            <Col md={6}> {/* Name column */}
                                                <Form.Group className="mb-3"> {/* Form group for name */}
                                                    <Form.Label>Full Name</Form.Label> {/* Label */}
                                                    {/* Form control (input field) */}
                                                    <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter your name" className="dark-bg" />
                                                    {/* Invalid feedback message */}
                                                    <Form.Control.Feedback type="invalid">Please provide your name.</Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}> {/* Email column */}
                                                <Form.Group className="mb-3"> {/* Form group for email */}
                                                    <Form.Label>Email</Form.Label> {/* Label */}
                                                    <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Enter your email" className="dark-bg" />
                                                    <Form.Control.Feedback type="invalid">Please provide a valid email.</Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        {/* Phone and Delivery Time Row */}
                                        <Row>
                                            <Col md={6}> {/* Phone column */}
                                                <Form.Group className="mb-3"> {/* Form group for phone */}
                                                    <Form.Label>Phone</Form.Label> {/* Label */}
                                                    <Form.Control type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="Enter your phone" className="dark-bg" />
                                                    <Form.Control.Feedback type="invalid">Please provide your phone number.</Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}> {/* Delivery Time column */}
                                                <Form.Group className="mb-3"> {/* Form group for delivery time */}
                                                    <Form.Label>Delivery Time</Form.Label> {/* Label */}
                                                    <Form.Control type="time" name="deliveryTime" value={formData.deliveryTime} onChange={handleChange} required className="dark-bg" />
                                                    <Form.Control.Feedback type="invalid">Please select a delivery time.</Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        {/* Delivery Address Field */}
                                        <Form.Group className="mb-3"> {/* Form group for address */}
                                            <Form.Label>Delivery Address</Form.Label> {/* Label */}
                                            <Form.Control as="textarea" name="address" value={formData.address} onChange={handleChange} required placeholder="Enter your delivery address" rows={2} className="dark-bg" /> {/* Textarea for address */}
                                            <Form.Control.Feedback type="invalid">Please provide your delivery address.</Form.Control.Feedback>
                                        </Form.Group>

                                        {/* Special Notes Field */}
                                        <Form.Group className="mb-3"> {/* Form group for notes */}
                                            <Form.Label>Special Notes</Form.Label> {/* Label */}
                                            <Form.Control as="textarea" name="notes" value={formData.notes} onChange={handleChange} placeholder="Any special instructions or allergies?" rows={2} className="dark-bg" /> {/* Textarea for notes */}
                                        </Form.Group>

                                        {/* Payment Method Radio Buttons */}
                                        <Form.Group className="mb-4"> {/* Form group for payment method */}
                                            <Form.Label>Payment Method</Form.Label> {/* Label */}
                                            <div> {/* Container for inline radios */}
                                                {/* Credit Card Radio */}
                                                <Form.Check inline type="radio" id="payment-card" name="paymentMethod" value="card" label="Credit Card" checked={formData.paymentMethod === 'card'} onChange={handleChange} className="me-4" />
                                                {/* Cash on Delivery Radio */}
                                                <Form.Check inline type="radio" id="payment-cash" name="paymentMethod" value="cash" label="Cash on Delivery" checked={formData.paymentMethod === 'cash'} onChange={handleChange} />
                                            </div>
                                        </Form.Group>

                                        {/* Place Order Button */}
                                        <div className="d-grid mt-4"> {/* d-grid makes the button full width */}
                                            <Button type="submit" className="order-complete-btn btn-lg"> {/* Submit button with custom style */}
                                                {/* Button text changes based on whether it's a new order or updating existing */}
                                                {existingOrder ? 'Update Order' : 'Place Final Order'}
                                            </Button>
                                        </div>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    )}

                    {/* Order Summary Column */}
                    {/* Takes 5 columns if form is shown, 12 columns if form is hidden (order empty) */}
                    <Col lg={order.length > 0 ? 5 : 12}>
                        <Card className="dark-bg"> {/* Card container for the summary */}
                            <Card.Body>
                                <Card.Title className="mb-4">Order Summary</Card.Title> {/* Summary title */}

                                {/* List Group for displaying bowl summaries */}
                                {/* mb-3: Add bottom margin */}
                                {/* order-summary-list: Custom class (if needed) */}
                                <ListGroup variant="flush" className="mb-3 order-summary-list">
                                    {/* Conditional rendering: Display bowl summaries if order is not empty */}
                                    {order.length > 0 ? (
                                        // Map through the order array and render a bowl summary for each bowl object
                                        order.map(bowl => renderBowlSummary(bowl))
                                    ) : (
                                        // Display message if order is empty
                                        <ListGroup.Item className="dark-bg text-center py-3">
                                            Your order is currently empty. Add items from the sections above.
                                        </ListGroup.Item>
                                    )}
                                </ListGroup>

                                {/* Display total price section only if there are bowls in the order */}
                                {order.length > 0 && (
                                    <>
                                        {/* Horizontal rule separator */}
                                        <hr className="footer-divider" />
                                        {/* Total price display */}
                                        <div className="d-flex justify-content-between align-items-center mt-3">
                                            <h5 className="mb-0">Total Order Price:</h5>
                                            <h4 className="mb-0">€{totalOrderPrice}</h4> {/* Display calculated total price */}
                                        </div>
                                    </>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default OrderForm;