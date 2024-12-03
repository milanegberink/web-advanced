import Listing from "./src/models/Listing.js";
import Auction from "./src/models/Auction.js";
import Bid from "./src/models/Bid.js";
import listings from './src/data/listings.json' assert { type: 'json' };
import writeToFile from "./src/modules/writeToFile.js";

// const listing3 = new Listing(
//     'test3',
//     'xyz',
//     'y',
//     'z',
//     'a',
//     'b',
//     'c',
//     new Auction(1,
//         2,
//         [
//             new Bid('bidder', 1, 'userId'),
//             new Bid('bidder', 200, 'userId')
//         ],
//         "12"
//     ));

const listing = listings.find(listing => listing.id === 'test');

console.log(listing.auction.bids)

listing.auction.bids.push(new Bid('bidder', 500, 'userId'));

console.log(listing.auction.bids)

writeToFile(listings, './src/data/listings.json');