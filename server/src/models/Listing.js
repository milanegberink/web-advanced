import Auction from "./Auction.js";
import writeToFile from "../modules/writeToFile.js";
import listings from '../data/listings.json' assert {type: 'json'};

class Listing {
    constructor(name, description, category, image, auction) {
        this.id = listings.length + 1;
        this.setName(name);
        this.setDescription(description);
        this.setCategory(category);
        this.image = image;
        this.setAuction(auction);
    }

    setName(name) {
        if (name.length < 3 || name.length > 40) {
            throw new Error('Name must be at least 3 characters long and no more than 40 characters');
        }

        this.name = name;
    }

    setCategory(category) {
        if (!category) {
            throw new Error('Category is required');
        }

        if (category.length < 3 || category.length > 30) {
            throw new Error('Category must be at least 3 characters long and no more than 30 characters');
        }
        this.category = category;
    }

    setDescription(description) {
        if (!description) {
            throw new Error('Description is required');
        }

        if (description.length < 10 || description.length > 500) {
            throw new Error('Description must be at least 10 characters long and no more than 500 characters');
        }

        this.description = description;
    }

    setAuction(auction) {
        if (!auction instanceof Auction || auction === undefined) {
            throw new Error('Auction must be an instance of Auction');
        }

        this.auction = auction;
    }

    async save() {
        listings.push(this);
        await writeToFile(listings, './src/data/listings.json');
    }
}

export default Listing;