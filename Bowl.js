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
        /**
         * @type {Object<string, number>}
         * @description Valid sizes for the bowl and their corresponding prices.
         */
        this.validSizes = {
            'Regular': 9,
            'Medium': 11,
            'Large': 14
        };

        /**
         * @type {Array<string>}
         * @description Valid bases for the bowl.
         */
        this.validBases = ['rice', 'black rice', 'salad'];

        /**
         * @type {Array<string>}
         * @description Valid proteins for the bowl.
         */
        this.validProteins = ['tuna', 'chicken', 'salmon', 'tofu'];

        /**
         * @type {Array<string>}
         * @description Valid ingredients for the bowl.
         */
        this.validIngredients = ['avocado', 'ananas', 'cashew nuts', 'kale', 'mango', 'peppers', 'corn', 'wakame', 'tomatoes', 'carrots', 'salad'];

        /**
         * @type {string|null}
         * @description The size of the bowl.
         */
        this.size = null;

        /**
         * @type {string|null}
         * @description The base of the bowl.
         */
        this.base = null;

        /**
         * @type {Array<string>}
         * @description The proteins added to the bowl.
         */
        this.protein = [];

        /**
         * @type {Array<string>}
         * @description The ingredients added to the bowl.
         */
        this.ingredients = [];

        /**
         * @type {number}
         * @description The amount of bowls being ordered.
         */
        this.amount = 0;

        /**
         * @type {number}
         * @description The price of the bowl.
         */
        this.price = 0;

        if (size) this.chooseSize(size);
    }

    /**
     * Sets the size of the bowl.
     * @param {string} size - The size of the bowl.
     * @throws Will throw an error if an invalid size is provided.
     */
    chooseSize(size) {
        if (!Object.keys(this.validSizes).includes(size)) throw new Error(size + ' is an invalid size');
        this.size = size;
    }

    /**
     * Sets the amount of bowls being ordered.
     * @param {number} amount - The amount to set.
     * @throws Will throw an error if an invalid amount is provided.
     */
    chooseAmount(amount) {
        if (amount <= 0) throw new Error(amount + ' is an invalid amount');
        this.amount = amount;
    }

    /**
     * Adds a base to the bowl.
     * @param {string} base - The base to add.
     * @throws Will throw an error if an invalid base is provided.
     */
    addBase(base) {
        if (!this.validBases.includes(base)) throw new Error(base + ' is an invalid base');
        this.base = base;
    }

    /**
     * Adds a protein to the bowl.
     * @param {string} protein - The protein to add.
     * @throws Will throw an error if an invalid protein is provided.
     */
    addProtein(protein) {
        if (!this.validProteins.includes(protein)) throw new Error(protein + ' is an invalid protein');
        switch (this.size) {
            case 'Regular':
                if (this.protein.length === 1) throw new Error('You can only add 1 protein to a ' + this.size + ' bowl');
                break;
            case 'Medium':
                if (this.protein.length === 2) throw new Error('You can only add 2 proteins to a ' + this.size + ' bowl');
                break;
            case 'Large':
                if (this.protein.length === 3) throw new Error('You can only add 3 proteins to a ' + this.size + ' bowl');
                break;
        }
        this.protein.push(protein);
    }

    /**
     * Adds an ingredient to the bowl.
     * @param {string} ingredient - The ingredient to add.
     * @throws Will throw an error if an invalid ingredient is provided.
     */
    addIngredient(ingredient) {
        if (!this.validIngredients.includes(ingredient)) throw new Error(ingredient + ' is an invalid ingredient');
        this.ingredients.push(ingredient);
    }

    /**
     * Computes the price of the bowl based on its size and ingredients.
     */
    computePrice() {
        this.price += this.validSizes[this.size] * this.amount;
        switch (this.size) {
            case 'Regular':
            case 'Medium':
                if (this.ingredients.length > 4) {
                    let excess = this.ingredients.length - 4;
                    this.price += excess * 0.2 * this.validSizes[this.size] * this.amount;
                }
                break;
            case 'Large':
                if (this.ingredients.length > 6) {
                    let excess = this.ingredients.length - 6;
                    this.price += excess * 0.2 * this.validSizes[this.size] * this.amount;
                }
                break;
        }
    }

    /**
     * Displays the details of the bowl.
     */
    showBowl() {
        console.log(`Size: ${this.size}`);
        console.log(`Base: ${this.base}`);
        console.log(`Proteins: ${this.protein.join(', ')}`);
        console.log(`Ingredients: ${this.ingredients.join(', ')}`);
        console.log(`Amount: ${this.amount}`);
        console.log(`Price: $ ${this.price}`);
    }
}

export default Bowl;