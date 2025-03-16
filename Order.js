/**
 * Represents an order containing multiple bowls.
 */
class Order {
    constructor() {
        /**
         * @type {Array<Bowl>}
         * @description The list of bowls in the order.
         */
        this.bowls = [];

        /**
         * @type {number}
         * @description The total price of the order.
         */
        this.totalPrice = 0;

        /**
         * @type {number}
         * @description The total number of bowls in the order.
         */
        this.totalBowls = 0;

        /**
         * @type {boolean}
         * @description Indicates if a discount is applied.
         */
        this.discount = false;
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

        this.totalPrice += bowl.price;

        this.totalBowls += bowl.amount;
    }

    /**
     * Computes the total price of the order, applying a discount if applicable.
     */
    computeTotalPrice() {
        this.totalPrice = 0;
        this.bowls.forEach(bowl => {
            this.totalPrice += bowl.price * bowl.amount;
        });

        if (this.totalBowls > 4) {
            this.discount = true;
            this.totalPrice -= this.totalPrice * 0.1;
        } else {
            this.discount = false;
        }
    }

    /**
     * Displays the current order.
     */
    showOrder() {
        console.log('CURRENT ORDER\n\n');
        this.bowls.forEach((bowl) => {
            bowl.showBowl();
            console.log('\n');
        });

        this.computeTotalPrice();
        console.log(`Total price: $ ${this.totalPrice}`);
        if (this.discount) {
            console.log('Discount applied: 10%');
        }
    }
}

export default Order;