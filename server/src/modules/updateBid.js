import listings from './src/data/listings.json' assert { type: 'json' };
import writeToFile from "./writeToFile.js";

const listing = listings.find(listing => listing.id === 'test');

console.log(listing.auction.bids);

