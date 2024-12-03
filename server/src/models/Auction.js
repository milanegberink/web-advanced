import Bid from "./Bid.js";
import writeToFile from "../modules/writeToFile.js";
import listings from '../data/listings.json' assert { type: 'json' };

class Auction {
    constructor(startingPrice, currentPrice, bids, endDate) {
        this.setStartingPrice(startingPrice);
        this.endDate = endDate;
        this.setBids(bids);
        this.setCurrentPrice(currentPrice)
    }
    setStartingPrice(startingPrice) {
        if (typeof startingPrice !== 'number' || startingPrice < 0) {
            throw new Error('Starting price must be a number greater than or equal to 0');
        }
        this.startingPrice = startingPrice;
    }
    setCurrentPrice(currentPrice) {
        this.currentPrice = Math.max(...this.bids.map(bid => bid.amount));
    }
    setBids(bids) {
        if (!bids.every(bid => bid instanceof Bid)) {
            throw new Error('Bids must be an array of Bid instances');
        }

        this.bids = bids;
    }
    updateCurrentPrice() {
        this.currentPrice = Math.max(...this.bids.map(bid => bid.amount));
    }
    addBid(bid) {
        if (!bid instanceof Bid) {
            throw new Error('Bid must be an instance of Bid');
        }

        if (bid.amount <= this.currentPrice) {
            throw new Error('Bid amount must be greater than the current price');
        }

        listings.auction.bids.push(bid);
        writeToFile(listings, './src/data/listings.json');
        this.updateCurrentPrice();
    }
}

export default Auction;