import listings from '../data/listings.json' assert { type: 'json' };
import writeToFile from "./writeToFile.js";
import Bid from "../models/Bid.js";
import findListing from "./findListing.js";

const newBid = async (listingId, bidderName, bidAmount, userId) => {
    const listing = findListing(listingId);

    const bids = listing.auction.bids;
    const currentPrice = Math.max(...bids.map(bid => bid.amount));

    if (bidAmount <= currentPrice) {
        throw Error('Bid amount must be greater than the current price');
    }

    if (new Date(listing.auction.endDate).getTime() < new Date().getTime()) {
        throw Error('Auction has ended');
    }


    listing.auction.bids.push(new Bid(bidderName, bidAmount, userId));
    listing.auction.currentPrice = bidAmount;

    console.log(listing)

    await writeToFile(listings, './src/data/listings.json');
};

export default newBid;
