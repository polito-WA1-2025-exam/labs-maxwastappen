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

module.exports = Bowl;