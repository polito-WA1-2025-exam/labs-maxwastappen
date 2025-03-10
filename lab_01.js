/**
 * Represents the daily limits for each bowl size.
 */
class DailyLimits {
    constructor() {
        this.maxRegularBowls = 10;
        this.maxMediumBowls = 8;
        this.maxLargeBowls = 6;
        this.currentRegularBowls = 0;
        this.currentMediumBowls = 0;
        this.currentLargeBowls = 0;
    }

    /**
     * Displays the available bowls for each size.
     */
    showAvailableBowls() {
        console.log(`Regular: ${this.maxRegularBowls - this.currentRegularBowls}, Medium: ${this.maxMediumBowls - this.currentMediumBowls}, Large: ${this.maxLargeBowls - this.currentLargeBowls}`);
    }
}

/**
 * Represents an order containing multiple bowls.
 */
class Order {
    constructor() {
        this.bowls = [];
    }

    /**
     * Adds a bowl to the order and updates the daily limits.
     * @param {Bowl} bowl - The bowl to add.
     * @param {DailyLimits} dailyLimits - The daily limits object.
     * @throws Will throw an error if the daily limit for the bowl size is exceeded.
     */
    addBowl(bowl, dailyLimits) {
        const sizeMap = {
            'Regular': 'currentRegularBowls',
            'Medium': 'currentMediumBowls',
            'Large': 'currentLargeBowls'
        };

        dailyLimits[sizeMap[bowl.size]] += bowl.amount;
        if (dailyLimits[sizeMap[bowl.size]] > dailyLimits[`max${bowl.size}Bowls`]) {
            throw new Error(`Daily limit for ${bowl.size} bowls exceeded`);
        }
        this.bowls.push(bowl);
    }
}

/**
 * Represents a poke bowl.
 */
class Bowl {
    /**
     * Creates a new Bowl instance.
     * @param {string} size - The size of the bowl (Regular, Medium, Large).
     * @throws Will throw an error if an invalid size is provided.
     */
    constructor(size) {
        this.validSizes = ['Regular', 'Medium', 'Large'];
        this.validBases = ['rice', 'black rice', 'salad'];
        this.validProteins = ['tuna', 'chicken', 'salmon', 'tofu'];
        this.validIngredients = ['avocado', 'ananas', 'cashew nuts', 'kale', 'mango', 'peppers', 'corn', 'wakame', 'tomatoes', 'carrots', 'salad'];

        this.size = null;
        this.base = null;
        this.protein = [];
        this.ingredients = [];
        this.amount = 0;

        if (size) this.chooseSize(size);
    }

    /**
     * Sets the size of the bowl.
     * @param {string} size - The size of the bowl.
     * @throws Will throw an error if an invalid size is provided.
     */
    chooseSize(size) {
        if (!this.validSizes.includes(size)) throw new Error('Invalid size');
        this.size = size;
    }

    /**
     * Sets the amount of bowls being ordered.
     * @param {number} amount - The amount to set.
     * @throws Will throw an error if an invalid amount is provided.
     */
    chooseAmount(amount) {
        if (amount <= 0) throw new Error('Invalid amount');
        this.amount = amount;
    }

    /**
     * Adds a base to the bowl.
     * @param {string} base - The base to add.
     * @throws Will throw an error if an invalid base is provided.
     */
    addBase(base) {
        if (!this.validBases.includes(base)) throw new Error('Invalid base');
        this.base = base;
    }

    /**
     * Adds a protein to the bowl.
     * @param {string} protein - The protein to add.
     * @throws Will throw an error if an invalid protein is provided.
     */
    addProtein(protein) {
        if (!this.validProteins.includes(protein)) throw new Error('Invalid protein');
        this.protein.push(protein);
    }

    /**
     * Adds an ingredient to the bowl.
     * @param {string} ingredient - The ingredient to add.
     * @throws Will throw an error if an invalid ingredient is provided.
     */
    addIngredient(ingredient) {
        if (!this.validIngredients.includes(ingredient)) throw new Error('Invalid ingredient');
        this.ingredients.push(ingredient);
    }
}

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

console.log('Final Order:');
console.log(JSON.stringify(order, null, 2));

dailyLimits.showAvailableBowls();