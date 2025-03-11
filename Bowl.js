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
         * @type {Array<string>}
         * @description Valid sizes for the bowl.
         */
        this.validSizes = ['Regular', 'Medium', 'Large'];

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

    /**
     * Displays the details of the bowl.
     */
    showBowl() {
        console.log('- Size: ', this.size);
        console.log('- Base: ', this.base);
        console.log('- Proteins: ', this.protein);
        console.log('- Ingredients: ', this.ingredients);
        console.log('- Amount: ', this.amount);
    }
}

module.exports = Bowl;