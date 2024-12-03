import express from 'express';
import cors from 'cors';
const app = express();
const port = 3000;
import listings from './data/listings.json' assert { type: 'json' };
import Listing from './models/Listing.js';
import Auction from "./models/Auction.js";
import Bid from "./models/Bid.js";
import User from "./models/User.js";

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());


app.get('/listings/:id', (req, res) => {
    const l = listings.find(listing => listing.id === req.params.id);
    res.send(l);
});

app.post('/register', async(req, res) => {
    const { username, password } = req.body;
    try {
        const user = new User(1, username, password, 'user');
        await user.save()
    } catch (Error) {
        res.status(400).send(Error.message);
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
