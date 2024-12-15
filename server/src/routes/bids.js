import express from "express";
import authenticateUser from "../middleware/authenticateUser.js";
const router = express.Router();
import listings from '../data/listings.json' assert { type: 'json' };

router.get('/', authenticateUser, (req, res) => {
    const { id } = req.user;
    const userBids = [];
    listings.forEach((listing) => {
        listing.auction.bids.forEach((bid) => {
            if (bid.userId === id) {
                userBids.push({
                    listingId: listing.id,
                    name: listing.name,
                    bid: bid,
                    currentPrice: listing.auction.currentPrice
                });
            }
        });
    });
    return res.send(userBids);
});

export default router;