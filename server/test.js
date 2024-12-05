import Listing from "./src/models/Listing.js";
import Auction from "./src/models/Auction.js";
import Bid from "./src/models/Bid.js";

const listing = new Listing(
    'New listing',
    'xyz',
    'y',
    'z',
    new Auction(1,
        [
            new Bid('bidder', 1, 'userId'),
            new Bid('bidder', 200, 'userId')
        ],
        "12"
    )
    );

await listing.save();


// const listing = listings.find(listing => listing.id === 'test3');
//
// console.log(listing.auction.bids)
//
// listing.auction.bids.push(new Bid('bidder', 800, 'userId'));
// let currentPrice = Math.max(...listing.auction.bids.map(bid => bid.amount));
//
// console.log(currentPrice)
//
// listing.auction.currentPrice = currentPrice;
// console.log(listing.auction)
//
// console.log(listing.auction.bids)
//
// writeToFile(listings, './src/data/listings.json');
//
