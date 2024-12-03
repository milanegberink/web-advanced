import Bid from "./Bid.js";

class Auction {
    constructor(startingPrice, bids, endDate) {
        this.setStartingPrice(startingPrice);
        this.endDate = endDate;
        this.setBids(bids);
    }
    setStartingPrice(startingPrice) {
        if (typeof startingPrice !== 'number' || startingPrice < 0) {
            throw new Error('Starting price must be a number greater than or equal to 0');
        }
        this.startingPrice = startingPrice;
    }
    setBids(bids) {
        if (!bids.every(bid => bid instanceof Bid)) {
            throw new Error('Bids must be an array of Bid instances');
        }
        this.bids = bids;
    }
}

export default Auction;