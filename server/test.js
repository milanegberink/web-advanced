import Listing from "./src/models/Listing.js";
import Auction from "./src/models/Auction.js";
import Bid from "./src/models/Bid.js";
import newBid from "./src/modules/newBid.js";
import users from "./src/data/users.json" assert { type: 'json' };
import bcrypt from "bcrypt";
import User from "./src/models/User.js";
import {verifyPassword} from "./src/modules/passwordUtils.js";
import { v4 as uuidv4 } from 'uuid';
import loginUser from "./src/modules/loginUser.js";
import jwt from "jsonwebtoken";
import validateToken from "./src/modules/validateToken.js";
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

const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZvcnRuaXRlIiwicm9sZSI6InVzZXIiLCJpZCI6NSwiaWF0IjoxNzMzOTIyNTc5fQ.HF1-Rsecu_f8eAj6RLdHZB8cl83vc_gWxyJwWi6RKi0'

validateToken(jwtToken)
