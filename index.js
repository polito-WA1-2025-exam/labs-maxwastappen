const DailyLimits = require('./DailyLimits');
const Order = require('./Order');
const Bowl = require('./Bowl');

// Sample items for Poke Bowl Track
const order = new Order();
const dailyLimits = new DailyLimits();

/**
 * Creates and adds a bowl to the order.
 * @param {string} size - The size of the bowl.
 * @param {number} amount - The amount of bowls.
 * @param {string} base - The base of the bowl.
 * @param {Array<string>} proteins - The proteins to add.
 * @param {Array<string>} ingredients - The ingredients to add.
 */
function createAndAddBowl(size, amount, base, proteins, ingredients) {
    const bowl = new Bowl(size);
    bowl.chooseAmount(amount);
    bowl.addBase(base);
    proteins.forEach(protein => bowl.addProtein(protein));
    ingredients.forEach(ingredient => bowl.addIngredient(ingredient));
    order.addBowl(bowl, dailyLimits);
}

createAndAddBowl('Large', 1, 'rice', ['tuna'], ['avocado', 'mango']);
createAndAddBowl('Medium', 1, 'salad', ['tofu'], ['kale', 'tomatoes']);
createAndAddBowl('Large', 1, 'black rice', ['chicken', 'salmon'], ['peppers', 'corn']);
createAndAddBowl('Regular', 1, 'salad', ['tuna'], ['wakame', 'carrots']);
createAndAddBowl('Medium', 1, 'rice', ['tofu'], ['ananas', 'cashew nuts']);

order.showOrder()

dailyLimits.showAvailableBowls();