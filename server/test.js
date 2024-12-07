import Listing from "./src/models/Listing.js";
import Auction from "./src/models/Auction.js";
import Bid from "./src/models/Bid.js";
import newBid from "./src/modules/newBid.js";
import users from "./src/data/users.json" assert { type: 'json' };
import bcrypt from "bcrypt";
import User from "./src/models/User.js";
import {verifyPassword} from "./src/modules/passwordUtils.js";

// const listing = new Listing(
//     'New listing',
//     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam accumsan erat libero, sed placerat tellus pharetra sed. Mauris dignissim placerat ante, sed congue lectus efficitur quis. Duis ut arcu sit amet lectus ultricies tincidunt vitae nec nisi. Nam nisi diam, finibus quis mauris ullamcorper, imperdiet gravida sem.',
//     'Electronics',
//     'https://cf-images.dustin.eu/cdn-cgi/image/fit=contain,format=auto,quality=75,width=828,fit=contain/image/d2000010011181779/asus-geforce-rtx-4090-rog-strix-gaming-24gb.png',
//     'z',
//     new Auction(1,
//         [],
//         new Date(2025, 1, 1, 0, 0, 0, 0)
//     )
//     );
//
// await listing.save();


// await newBid(1, 'Test1330', 5000, 'userId');

const user = await User.create('Milan', 'password', 'user');


console.log(await verifyPassword('password', user.password));