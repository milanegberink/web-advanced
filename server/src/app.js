import express from 'express';
import cors from 'cors';
const app = express();
const port = 3000;
import listings from './data/listings.json' assert { type: 'json' };
import users from './data/users.json' assert { type: 'json' };
import Listing from './models/Listing.js';
import Auction from "./models/Auction.js";
import Bid from "./models/Bid.js";
import User from "./models/User.js";
import bcrypt from "bcrypt";
import newBid from "./modules/newBid.js";
import {verifyPassword} from "./modules/passwordUtils.js";
import loginUser from "./modules/loginUser.js";
import authenticateUser from "./middleware/authenticateUser.js";
import {findUser, findUserById} from "./modules/findUser.js";
import writeToFile from "./modules/writeToFile.js";

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());


app.get('/listings/:id', (req, res) => {
    const listing = listings.find(listing => listing.id === Number(req.params.id));
    if (!listing) {
        res.sendStatus(404);
    }
    res.send(listing);
});


app.post('/listings/:id/bids', async(req, res) => {
    const id = req.params.id;
    console.log(id)
    const { bidderName, bidAmount, userId } = req.body;
    try {
        await newBid(id, bidderName, bidAmount, userId);
        res.sendStatus(200);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

app.get('/listings', (req, res) => {
    const id = req.query.id; // Extract the id query parameter
    if (id) {
        // Filter listings based on the id
        const filteredListings = listings.filter(listing => listing.id === parseInt(id));
        res.send(filteredListings);
    } else {
        // If no id is provided, return all listings
        res.send(listings);
    }
});

app.get('/listings/:id/bids', (req, res) => {
    const listing = listings.find(listing => listing.id === Number(req.params.id));
    res.send(listing.auction.bids);
});


app.post('/register', async(req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.create(username, password, 'user');
        await user.save()
        res.status(201).send('User created successfully');
    } catch (Error) {
        res.status(400).send(Error.message);
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

app.post('/login', loginUser);


app.post("/auth", authenticateUser, (req, res) => {
    res.sendStatus(200);
});

const newBid2 = async (req, res) => {
    const { listingId, bidAmount } = req.body;
    const user = req.user;
    try {
        await newBid(listingId, user.username, bidAmount, user.id);
        res.sendStatus(200);
    } catch (e) {
        res.status(400).send(JSON.stringify(e.message));
    }
};

app.post('/bids', authenticateUser, newBid2, (req, res) => {
});

app.post('/logout', authenticateUser, async (req, res) => {
    const user = users.find(user => user.id === req.user.id);
    delete user.secret;
    await writeToFile(users, './src/data/users.json');
    res.sendStatus(200)
});
