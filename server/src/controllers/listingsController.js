import listings from '../data/listings.json' assert {type: 'json'};
import Listing from "../models/Listing.js";
import Auction from "../models/Auction.js";
import writeToFile from "../modules/writeToFile.js";

const getListings = async (req, res) => {
    const {expired} = req.query;

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
}

const getListingById = async (req, res) => {
    const listing = listings.find(listing => listing.id === Number(req.params.id));
    if (!listing) {
        res.sendStatus(404);
    }
    res.send(listing);
}

const createListing = async (req, res) => {
    const {name, description, startingPrice, category, image, endingDate} = req.body;
    try {
        const listing = await new Listing(name,
            description,
            category,
            image,
            new Auction(startingPrice, new Date(endingDate))
        );
        await listing.save();
        res.status(201).send(JSON.stringify('Listing created successfully'));
    } catch (e) {
        console.log(e)
        return res.status(400).send(JSON.stringify(e.message));
    }
}

const deleteListing = async (req, res) => {
    const id = Number(req.params.id);
    const index = listings.findIndex(listing => listing.id === id);
    if (index === -1) {
        return res.sendStatus(404);
    }
    listings.splice(index, 1);
    await writeToFile(listings, './src/data/listings.json');
    res.sendStatus(200);
}

export {getListings, getListingById, createListing, deleteListing}