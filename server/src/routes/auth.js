import express from "express";
import authenticateUser from "../middleware/authenticate/authenticateUser.js";
import {handleSuccessfullAuth, loginUser, logoutUser, registerUser} from "../controllers/authController.js";
import authenticateAdmin from "../middleware/authenticate/authenticateAdmin.js";
const router = express.Router();


router.post("/user", authenticateUser, handleSuccessfullAuth);

router.post('/admin', authenticateAdmin, handleSuccessfullAuth);

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/logout', authenticateUser, logoutUser);


export default router;