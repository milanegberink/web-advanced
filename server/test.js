import Listing from "./src/models/Listing.js";
import Auction from "./src/models/Auction.js";
import Bid from "./src/models/Bid.js";
import listings from './src/data/listings.json' assert { type: 'json' };
import writeToFile from "./src/modules/writeToFile.js";

// const listing = new Listing(
//     'test3',
//     'xyz',
//     'y',
//     'z',
//     'a',
//     'b',
//     'c',
//     new Auction(1,
//         [
//             new Bid('bidder', 1, 'userId'),
//             new Bid('bidder', 200, 'userId')
//         ],
//         "12"
//     ));
// listing.save();

const listing = listings.find(listing => listing.id === 'test3');

console.log(listing.auction.bids)

listing.auction.bids.push(new Bid('bidder', 700, 'userId'));
let currentPrice = Math.max(...listing.auction.bids.map(bid => bid.amount));

console.log(currentPrice)

listing.auction.currentPrice = currentPrice;
console.log(listing.auction)

console.log(listing.auction.bids)

writeToFile(listings, './src/data/listings.json');