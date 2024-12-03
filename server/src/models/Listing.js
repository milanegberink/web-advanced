import Auction from "./Auction.js";
import writeToFile from "../modules/writeToFile.js";
import listings from '../data/listings.json' assert { type: 'json' };

class Listing {
    constructor(id, name, genre, description, slug, image, producer, auction) {
        this.setId(id);
        this.setName(name);
        this.genre = genre;
        this.description = description;
        this.slug = slug;
        this.image = image;
        this.producer = producer;
        this.setAuction(auction);
    }
    setId(id) {
        if (listings.find(listing => listing.id === id)) {
            throw new Error('Listing with this ID already exists');
        }
        this.id = id;
    }

    setName(name) {
        if (name.length < 3 || name.length > 50) {
            throw new Error('Name must be at least 3 characters long and no more than 50 characters');
        }

        this.name = name;
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