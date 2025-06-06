import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BowlBuilderPage from './pages/BowlBuilderPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import MenuPage from './pages/MenuPage';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

/**
 * @typedef {Object} Item
 * @property {number} id - Unique identifier for the item.
 * @property {string} name - Name of the item.
 * @property {string} description - Description of the item.
 * @property {number} price - Price of the item.
 * @property {string} image - URL of the item's image.
 */

/**
 * @typedef {Object} BowlSize
 * @property {string} id - Unique identifier for the bowl size (e.g., 'regular', 'medium', 'large').
 * @property {string} name - Name of the bowl size.
 * @property {number} priceMultiplier - Multiplier to apply to the base price based on the bowl size.
 */

/**
 * @typedef {Object} IngredientCategory
 * @property {number} id - Unique identifier for the category.
 * @property {string} category - Name of the category (e.g., 'Vegetables', 'Toppings', 'Dressings').
 * @property {Item[]} items - Array of items within the category.
 */

/**
 * @type {Item[]}
 * Array of base options for the bowl.
 */
const baseOptions = [
    { id: 1, name: 'White Rice', description: 'Japanese short-grain white rice', price: 2.50, image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?q=80&w=2070' },
    { id: 2, name: 'Brown Rice', description: 'Whole grain brown rice', price: 2.50, image: 'https://images.unsplash.com/photo-1557592722-a0a649c8c5c7?q=80&w=2070' },
    { id: 3, name: 'Mixed Greens', description: 'Fresh mixed salad greens', price: 3.00, image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=2084' }
];

/**
 * @type {Item[]}
 * Array of protein options for the bowl.
 */
const proteinOptions = [
    { id: 1, name: 'Tuna', description: 'Fresh tuna cubes', price: 4.50, image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?q=80&w=2070' },
    { id: 2, name: 'Salmon', description: 'Norwegian salmon', price: 4.50, image: 'https://images.unsplash.com/photo-1526434426615-1abe81efcb0b?q=80&w=2070' },
    { id: 3, name: 'Chicken', description: 'Grilled chicken', price: 3.50, image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?q=80&w=2187' },
    { id: 4, name: 'Tofu', description: 'Organic tofu', price: 3.00, image: 'https://images.unsplash.com/photo-1584948528512-fd980cd94361?q=80&w=1936' },
];

/**
 * @type {BowlSize[]}
 * Array of bowl size options with price multipliers.
 */
const bowlSizes = [
    { id: 'regular', name: 'Regular', priceMultiplier: 1.0 },
    { id: 'medium', name: 'Medium', priceMultiplier: 1.3 },
    { id: 'large', name: 'Large', priceMultiplier: 1.5 }
];

/**
 * @type {IngredientCategory[]}
 * Array of ingredient categories, each containing an array of items.
 */
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

/**
 * Finds an item (base, protein, or ingredient) by its ID.
 * @param {number} id - The ID of the item to find.
 * @returns {Item | null} - The item object with an added 'type' property, or null if not found.
 */
export const findItem = (id) => {
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

/**
 * Generates a unique key for a bowl based on its base, proteins, ingredients, and size.
 * @param {Object} bowl - The bowl object containing base, proteins, and ingredients.
 * @param {BowlSize} size - The size of the bowl.
 * @returns {string} - A unique key for the bowl.
 */
export const getBowlKey = (bowl, size) => {
    return `${bowl.base}-${JSON.stringify(bowl.proteins)}-${JSON.stringify(bowl.ingredients)}-${size.id}`;
};

/**
 * Main App component that manages the application's state and routing.
 * @returns {JSX.Element} - The rendered JSX element.
 */
function App() {
  /**
   * @type {[Array, function]}
   * @description order - Array of bowl objects with amount field
   * @description setOrder - Function to update the order state
  */
  const [order, setOrder] = useState([]);
  /**
   * @type {[number, function]}
   * @description nextBowlId - For unique bowl keys/ids in the order
   * @description setNextBowlId - Function to update the nextBowlId state
   */
  const [nextBowlId, setNextBowlId] = useState(1);

  /**
   * Adds a bowl to the order. If the bowl already exists, it updates the amount. Otherwise, it adds a new bowl to the order.
   * @param {Object} bowl - The bowl object containing base, proteins, and ingredients.
   * @param {BowlSize} bowlSize - The size of the bowl.
   * @param {number} bowlQuantity - The quantity of the bowl to add.
   */
  const handleAddBowlToOrder = (bowl, bowlSize, bowlQuantity) => {
    // Create a unique key for this bowl configuration
    const bowlKey = getBowlKey(bowl, bowlSize);
    
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
            ...bowl,
            size: bowlSize, // Include the bowl size in the order
            amount: bowlQuantity // Initial amount from the quantity selector
        };
        
        setOrder(prevOrder => [...prevOrder, newBowl]);
        setNextBowlId(prevId => prevId + 1); // Increment ID for the next bowl
    }
  };

  /**
   * Removes a bowl from the order by decreasing its amount. If the amount becomes 0 or less, the bowl is removed completely.
   * @param {number} bowlIdToRemove - The ID of the bowl to remove.
   * @param {number} [decreaseBy=1] - The amount to decrease the bowl by. Defaults to 1.
   */
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

  /**
   * Completely removes a bowl from the order.
   * @param {number} bowlIdToRemove - The ID of the bowl to remove.
   */
  const handleRemoveBowlCompletely = (bowlIdToRemove) => {
    setOrder(prevOrder => prevOrder.filter(bowl => bowl.id !== bowlIdToRemove));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route 
          path="/build" 
          element={
            <BowlBuilderPage 
              baseOptions={baseOptions}
              proteinOptions={proteinOptions}
              bowlSizes={bowlSizes}
              ingredientCategories={ingredientCategories}
              onAddBowlToOrder={handleAddBowlToOrder}
              findItem={findItem}
            />
          } 
        />
        <Route 
          path="/cart" 
          element={
            <CartPage 
              order={order}
              onRemoveBowl={handleRemoveBowl}
              onRemoveBowlCompletely={handleRemoveBowlCompletely}
              findItem={findItem}
            />
          } 
        />
        <Route 
          path="/checkout" 
          element={
            <CheckoutPage 
              order={order}
              findItem={findItem}
            />
          } 
        />
        <Route 
          path="/confirmation" 
          element={
            <OrderConfirmationPage 
              order={order}
              findItem={findItem}
            />
          } 
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/menu" element={<MenuPage />} />
      </Routes>
    </Router>
  );
}

export default App;