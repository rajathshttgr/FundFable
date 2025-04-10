import express from "express";
const router = express.Router();
import { newTransaction } from "../controllers/profileContoller.js";
import { getPublicProfile } from "../controllers/profileContoller.js";
import { getRecentComments } from "../controllers/profileContoller.js";

router.post("/transaction", newTransaction);
router.get("/publicprofile/:username", getPublicProfile);
router.get("/recentcomments/:username", getRecentComments);

export default router;
