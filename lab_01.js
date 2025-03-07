/*
POKE - LAB_01
 */

/*
Objects to implement:
- Order
- Bowl
- Base
- Protein
- Ingredient
 */

// Order object
function Order() {
    this.bowls = [];
    this.addBowl = (bowl) => {
        this.bowls.push(bowl);
    }
}

// Bowl object
function Bowl(size) {
    this.size = size;
    this.base = null;
    this.protein = [];
    this.ingredients = [];
    this.addBase = (base) => {
        const bases = ['rice', 'black rice', 'salad'];
        if(bases.indexOf(base) !== -1) {
            this.base = base;
        } else {
            throw new Error('Invalid base');
        }
    }
    this.addProtein = (protein) => {
        const proteins = ['tuna', 'chicken', 'salmon', 'tofu'];
        if(proteins.indexOf(protein) !== -1) {
            this.protein.push(protein);
        } else {
            throw new Error('Invalid protein');
        }
    }
    this.addIngredient = (ingredient) => {
        const ingredients = ['avocado', 'mango', 'peppers', 'corn', 'kale', 'tomatoes', 'carrots', 'wakame', 'ananas', 'cashew nuts'];
        if(ingredients.indexOf(ingredient) !== -1) {
            this.ingredients.push(ingredient);
        } else {
            throw new Error('Invalid ingredient');
        }
    }
}

// Base object
function Base(name) {
    this.name = name;
}

// Protein object
function Protein(name, amount) {
    this.name = name;
    this.amount = amount;
}

// Ingredient object
function Ingredient(name, amount) {
    this.name = name;
    this.amount = amount;
}

// Sample items for Poke Bowl Track

// Create an overall Order
var order = new Order();

// Bowl 1: The Classic
// Large bowl with rice, tuna and the tropical twist of avocado & mango.
var bowl1 = new Bowl("Large");
bowl1.addBase("rice");
bowl1.addProtein("tuna");
bowl1.addIngredient("avocado");
bowl1.addIngredient("mango");
order.addBowl(bowl1);

// Bowl 2: The Green Delight
// Medium bowl with a base of salad, tofu as protein, complemented by kale and tomatoes.
var bowl2 = new Bowl("Medium");
bowl2.addBase("salad");
bowl2.addProtein("tofu");
bowl2.addIngredient("kale");
bowl2.addIngredient("tomatoes");
order.addBowl(bowl2);

// Bowl 3: The Protein Powerhouse
// Large bowl with black rice, a mix of chicken and salmon, and vibrant peppers & corn.
var bowl3 = new Bowl("Large");
bowl3.addBase("black rice");
bowl3.addProtein("chicken");
bowl3.addProtein("salmon");
bowl3.addIngredient("peppers");
bowl3.addIngredient("corn");
order.addBowl(bowl3);

// Bowl 4: The Light & Fresh
// Small bowl featuring a salad base, tuna protein, and a subtle mix of wakame and carrots.
var bowl4 = new Bowl("Small");
bowl4.addBase("salad");
bowl4.addProtein("tuna");
bowl4.addIngredient("wakame");
bowl4.addIngredient("carrots");
order.addBowl(bowl4);

// Bowl 5: The Exotic Twist
// Medium bowl with rice, tofu protein, accented by ananas and cashew nuts for a crunch.
var bowl5 = new Bowl("Medium");
bowl5.addBase("rice");
bowl5.addProtein("tofu");
bowl5.addIngredient("ananas");
bowl5.addIngredient("cashew nuts");
order.addBowl(bowl5);

// Print the final order (formatted) so you can review the complete object structure
console.log(JSON.stringify(order, null, 2));
