import findListing from "./findListing.js";

const getHighestBidder = async (listingId) => {
    const listing = findListing(listingId);

    const bids = listing.auction.bids;

    return Math.max(...bids.map(bid => bid.amount));
}

export default getHighestBidder;