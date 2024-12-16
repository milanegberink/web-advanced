class Auction {
    constructor(startingPrice, endDate) {
        this.setStartingPrice(startingPrice);
        this.setEndDate(endDate);
        this.bids = [];
        this.currentPrice = startingPrice;
    }
    setStartingPrice(startingPrice) {
        if (typeof startingPrice !== 'number' || startingPrice < 0) {
            throw new Error('Starting price must be a number greater than or equal to 0');
        }
        this.startingPrice = startingPrice;
    }

    setEndDate(endDate) {
        if (!(endDate instanceof Date)) {
            throw new Error('End date must be a Date object');
        }

        const proposedDate = new Date(endDate);
        const now = new Date();

        if (proposedDate < now) {
            throw new Error('End date must be in the future');
        }

        this.endDate = endDate;
    }
}

export default Auction;