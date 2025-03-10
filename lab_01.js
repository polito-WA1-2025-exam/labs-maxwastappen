/*
Design and implement a web application for managing take-away orders in a poke shop.

Requirements:
1. Poke bowls can be of three sizes: Regular (R), Medium (M), Large (L).
   - Regular: 1 protein, up to 4 ingredients.
   - Medium: 2 proteins, up to 4 ingredients.
   - Large: 3 proteins, up to 6 ingredients.
2. Options:
   - Bases: rice, black rice, salad.
   - Proteins: tuna, chicken, salmon, tofu.
   - Ingredients: avocado, ananas, cashew nuts, kale, mango, peppers, corn, wakame, tomatoes, carrots, salad.
3. An order may contain one or more bowls.
   - Users can select multiple bowls with the same configuration by modifying a counter.
4. Daily limits for bowl sizes:
   - Regular: 10
   - Medium: 8
   - Large: 6
5. Users can browse availability and options without authentication.
6. Authenticated users can make orders:
   - Interactive configuration page for bowl customization.
   - Real-time price updates during configuration.
   - Total price includes bowl prices and extra ingredient costs.
   - Prices: R = 9 €, M = 11 €, L = 14 €.
   - Extra ingredients increase bowl price by 20%.
   - 10% discount on orders with more than 4 bowls.
7. Order submission:
   - Real-time availability check.
   - Confirmation or error message if bowls are unavailable.
8. Authenticated users can view past orders:
   - List of orders with total bowls and price.
   - Detailed view of each order.
9. Optional text input for special requests or allergies.

Important notes:
- Client-side real-time price computation.
- Server-side final price check.
*/

/**
 * DailyLimits object to track the daily limits for each bowl size.
 * @constructor
 */
function DailyLimits() {
    this.maxRegularBowls = 10;
    this.maxMediumBowls = 8;
    this.maxLargeBowls = 6;
    this.currentRegularBowls = 0;
    this.currentMediumBowls = 0;
    this.currentLargeBowls = 0;
}

/**
 * Order object to manage a list of bowls.
 * @constructor
 */
function Order() {
    this.bowls = [];
    /**
     * Adds a bowl to the order and updates the daily limits.
     * @param {Bowl} bowl - The bowl to add.
     * @param {DailyLimits} dailyLimits - The daily limits object.
     * @throws Will throw an error if the daily limit for the bowl size is exceeded.
     */
    this.addBowl = (bowl, dailyLimits) => {
        if (bowl.size === 'Regular') {
            dailyLimits.currentRegularBowls += bowl.amount;
            if (dailyLimits.currentRegularBowls > dailyLimits.maxRegularBowls) {
                throw new Error('Daily limit for Regular bowls exceeded');
            }
        } else if (bowl.size === 'Medium') {
            dailyLimits.currentMediumBowls += bowl.amount;
            if (dailyLimits.currentMediumBowls > dailyLimits.maxMediumBowls) {
                throw new Error('Daily limit for Medium bowls exceeded');
            }
        } else if (bowl.size === 'Large') {
            dailyLimits.currentLargeBowls += bowl.amount;
            if (dailyLimits.currentLargeBowls > dailyLimits.maxLargeBowls) {
                throw new Error('Daily limit for Large bowls exceeded');
            }
        } else {
            throw new Error('Invalid bowl size');
        }
        this.bowls.push(bowl);
    }
}

/**
 * Bowl object to represent a poke bowl.
 * @constructor
 * @param {string} size - The size of the bowl (Regular, Medium, Large).
 * @throws Will throw an error if an invalid size is provided.
 */
function Bowl(size) {
    this.size = null;
    this.base = null;
    this.protein = [];
    this.ingredients = [];
    this.amount = 0;

    /**
     * Sets the size of the bowl.
     * @param {string} size - The size of the bowl.
     * @throws Will throw an error if an invalid size is provided.
     */
    this.chooseSize = (size) => {
        const sizes = ['Regular', 'Medium', 'Large'];
        if (sizes.indexOf(size) !== -1) {
            this.size = size;
        } else {
            throw new Error('Invalid size');
        }
    };

    if (size) {
        this.chooseSize(size);
    }

    /**
     * Sets the amount of bowls being ordered.
     * @param {number} amount - The amount to set.
     * @throws Will throw an error if an invalid amount is provided.
     */
    this.chooseAmount = (amount) => {
        if (amount > 0) {
            this.amount = amount;
        } else {
            throw new Error('Invalid amount');
        }
    };

    /**
     * Adds a base to the bowl.
     * @param {string} base - The base to add.
     * @throws Will throw an error if an invalid base is provided.
     */
    this.addBase = (base) => {
        const bases = ['rice', 'black rice', 'salad'];
        if (bases.indexOf(base) !== -1) {
            this.base = base;
        } else {
            throw new Error('Invalid base');
        }
    };

    /**
     * Adds a protein to the bowl.
     * @param {string} protein - The protein to add.
     * @throws Will throw an error if an invalid protein is provided.
     */
    this.addProtein = (protein) => {
        const proteins = ['tuna', 'chicken', 'salmon', 'tofu'];
        if (proteins.indexOf(protein) !== -1) {
            this.protein.push(protein);
        } else {
            throw new Error('Invalid protein');
        }
    };

    /**
     * Adds an ingredient to the bowl.
     * @param {string} ingredient - The ingredient to add.
     * @throws Will throw an error if an invalid ingredient is provided.
     */
    this.addIngredient = (ingredient) => {
        const ingredients = [
            'avocado', 'ananas', 'cashew nuts', 'kale', 'mango',
            'peppers', 'corn', 'wakame', 'tomatoes', 'carrots', 'salad'
        ];
        if (ingredients.indexOf(ingredient) !== -1) {
            this.ingredients.push(ingredient);
        } else {
            throw new Error('Invalid ingredient');
        }
    };
}

/**
 * Base object to represent a base option.
 * @constructor
 * @param {string} name - The name of the base.
 */
function Base(name) {
    this.name = name;
}

/**
 * Protein object to represent a protein option.
 * @constructor
 * @param {string} name - The name of the protein.
 * @param {number} amount - The amount of the protein.
 */
function Protein(name, amount) {
    this.name = name;
    this.amount = amount;
}

/**
 * Ingredient object to represent an ingredient option.
 * @constructor
 * @param {string} name - The name of the ingredient.
 * @param {number} amount - The amount of the ingredient.
 */
function Ingredient(name, amount) {
    this.name = name;
    this.amount = amount;
}

// --- Sample items for Poke Bowl Track ---

// Create an overall Order
let order = new Order();

// Create a DailyLimits object to track how many bowls of each size have been ordered today
let dailyLimits = new DailyLimits();
console.log("Daily Limits (Before Orders):");
console.log(JSON.stringify(dailyLimits, null, 2));

// Bowl 1: The Classic
// Large bowl with rice, tuna and the tropical twist of avocado & mango.
let bowl1 = new Bowl("Large");
bowl1.chooseAmount(1);
bowl1.addBase("rice");
bowl1.addProtein("tuna");
bowl1.addIngredient("avocado");
bowl1.addIngredient("mango");
order.addBowl(bowl1, dailyLimits);

// Bowl 2: The Green Delight
// Medium bowl with a base of salad, tofu as protein, complemented by kale and tomatoes.
let bowl2 = new Bowl("Medium");
bowl2.chooseAmount(1);
bowl2.addBase("salad");
bowl2.addProtein("tofu");
bowl2.addIngredient("kale");
bowl2.addIngredient("tomatoes");
order.addBowl(bowl2, dailyLimits);

// Bowl 3: The Protein Powerhouse
// Large bowl with black rice, a mix of chicken and salmon, and vibrant peppers & corn.
let bowl3 = new Bowl("Large");
bowl3.chooseAmount(1);
bowl3.addBase("black rice");
bowl3.addProtein("chicken");
bowl3.addProtein("salmon");
bowl3.addIngredient("peppers");
bowl3.addIngredient("corn");
order.addBowl(bowl3, dailyLimits);

// Bowl 4: The Light & Fresh
// Regular bowl featuring a salad base, tuna protein, and a subtle mix of wakame and carrots.
let bowl4 = new Bowl("Regular");
bowl4.chooseAmount(1);
bowl4.addBase("salad");
bowl4.addProtein("tuna");
bowl4.addIngredient("wakame");
bowl4.addIngredient("carrots");
order.addBowl(bowl4, dailyLimits);

// Bowl 5: The Exotic Twist
// Medium bowl with rice, tofu protein, accented by ananas and cashew nuts for a crunch.
let bowl5 = new Bowl("Medium");
bowl5.chooseAmount(1);
bowl5.addBase("rice");
bowl5.addProtein("tofu");
bowl5.addIngredient("ananas");
bowl5.addIngredient("cashew nuts");
order.addBowl(bowl5, dailyLimits);

// Print the final order
console.log("Final Order:");
console.log(JSON.stringify(order, null, 2));

// Print the updated daily limits after processing the order
console.log("Daily Limits (After Orders):");
console.log(JSON.stringify(dailyLimits, null, 2));