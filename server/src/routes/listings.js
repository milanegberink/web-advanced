import express from "express";
import authenticateAdmin from "../middleware/authenticate/authenticateAdmin.js";
import {createListing, deleteListing, getListingById, getListings} from "../controllers/listingsController.js";


const router = express.Router();

router.get('/', getListings);

router.get('/:id', getListingById);

router.post('/', authenticateAdmin, createListing)

router.delete('/:id', authenticateAdmin, deleteListing);


export default router;