/**
 * Represents the daily limits for each bowl size.
 */
class DailyLimits {
    /**
     * Creates an instance of DailyLimits.
     */
    constructor() {
        /**
         * @type {number}
         * @description Maximum number of regular bowls allowed per day.
         */
        this.maxRegularBowls = 10;

        /**
         * @type {number}
         * @description Maximum number of medium bowls allowed per day.
         */
        this.maxMediumBowls = 8;

        /**
         * @type {number}
         * @description Maximum number of large bowls allowed per day.
         */
        this.maxLargeBowls = 6;

        /**
         * @type {number}
         * @description Current number of regular bowls ordered.
         */
        this.currentRegularBowls = 0;

        /**
         * @type {number}
         * @description Current number of medium bowls ordered.
         */
        this.currentMediumBowls = 0;

        /**
         * @type {number}
         * @description Current number of large bowls ordered.
         */
        this.currentLargeBowls = 0;
    }

    /**
     * Displays the available bowls for each size.
     */
    showAvailableBowls() {
        console.log(`Regular: ${this.maxRegularBowls - this.currentRegularBowls}, Medium: ${this.maxMediumBowls - this.currentMediumBowls}, Large: ${this.maxLargeBowls - this.currentLargeBowls}`);
    }
}

export default DailyLimits;