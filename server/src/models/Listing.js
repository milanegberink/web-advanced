import Auction from "./Auction.js";
import writeToFile from "../modules/writeToFile.js";
import listings from '../data/listings.json' assert { type: 'json' };

class Listing {
    constructor(name, description, category, image, manufacturer, auction) {
        this.id = listings.length + 1;
        this.setName(name);
        this.setDescription(description);
        this.category = category;
        this.image = image;
        this.manufacturer = manufacturer;
        this.setAuction(auction);
    }

    setName(name) {
        if (name.length < 3 || name.length > 40) {
            throw new Error('Name must be at least 3 characters long and no more than 40 characters');
        }

        this.name = name;
    }

    setDescription(description) {
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