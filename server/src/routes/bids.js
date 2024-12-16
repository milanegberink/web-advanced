import express from "express";
import authenticateUser from "../middleware/authenticate/authenticateUser.js";
const router = express.Router();
import {createNewBid, getBidsOfUser} from "../controllers/bidsController.js";

router.get('/', authenticateUser, getBidsOfUser);

router.post('/:listingId', authenticateUser, createNewBid);

export default router;