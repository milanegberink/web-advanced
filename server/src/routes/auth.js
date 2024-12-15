import express from "express";
import authenticateUser from "../middleware/authenticateUser.js";
const router = express.Router();

router.post("/", authenticateUser, (req, res) => {
    res.sendStatus(200);
});

export default router;