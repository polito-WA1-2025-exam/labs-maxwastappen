const DailyLimits = require('./DailyLimits');

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

    /**
     * Displays the current order.
     */
    showOrder() {
        console.log('CURRENT ORDER\n\n');
        this.bowls.forEach((bowl) => {
            bowl.showBowl();
            console.log('\n');
        });
    }
}

module.exports = Order;