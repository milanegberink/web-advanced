import express from 'express';
import cors from 'cors';
const app = express();
const port = 3000;
import users from './data/users.json' assert { type: 'json' };
import User from "./models/User.js";
import newBid from "./modules/newBid.js";
import loginUser from "./modules/loginUser.js";
import authenticateUser from "./middleware/authenticateUser.js";
import writeToFile from "./modules/writeToFile.js";

import auth from './routes/auth.js';
import listingsRoute from './routes/listings.js';
import bidsRoute from './routes/bids.js';

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/auth', auth);
app.use('/listings', listingsRoute);
app.use('/bids', bidsRoute);

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
