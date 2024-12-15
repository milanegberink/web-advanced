import express from "express";
import listings from '../data/listings.json' assert { type: 'json' };
import newBid from "../modules/newBid.js";
const router = express.Router();

router.get('/:id', (req, res) => {
    const listing = listings.find(listing => listing.id === Number(req.params.id));
    if (!listing) {
        res.sendStatus(404);
    }
    res.send(listing);
});


router.post('/:id/bids', async(req, res) => {
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

router.get('/listings/:id/bids', (req, res) => {
    const listing = listings.find(listing => listing.id === Number(req.params.id));
    res.send(listing.auction.bids);
});


router.get('/', (req, res) => {
    const { expired } = req.query;

    if (expired === undefined) {
        return res.json(listings);
    }

    const now = new Date();

    const isExpired = expired === 'true'; // Convert query string to boolean


    const filteredListings = listings.filter(listing => {
        const expiryDate = new Date(listing.auction.endDate);
        return isExpired ? now > expiryDate : now <= expiryDate;
    });

    res.json(filteredListings);
});


export default router;