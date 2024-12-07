import listings from '../data/listings.json' assert { type: 'json' };

const findListing = (listingId) => {
    const listing = listings.find(listing => listing.id === Number(listingId));

    if (!listing) {
        throw Error('Listing not found');
    }

    return listing;
}

export default findListing;