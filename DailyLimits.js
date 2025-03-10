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

module.exports = DailyLimits;