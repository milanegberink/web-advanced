import listings from "../data/listings.json" assert {type: "json"};
import newBid from "../modules/newBid.js";

const getBidsOfUser = async (req, res) => {
    const {id} = req.user;
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
}

const createNewBid = async (req, res) => {
    const {bidAmount} = req.body;
    const {listingId} = req.params;
    const user = req.user;
    try {
        await newBid(listingId, user.username, bidAmount, user.id);
        res.sendStatus(200);
    } catch (e) {
        res.status(400).send(JSON.stringify(e.message));
    }
}

export {getBidsOfUser, createNewBid}