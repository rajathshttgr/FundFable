import express from "express";
const router = express.Router();
import { getProfileData } from "../controllers/dashboardController.js";
import { getRecentSupports } from "../controllers/dashboardController.js";
import { updatePublicProfileData } from "../controllers/dashboardController.js";
import { createPublicProfileData } from "../controllers/dashboardController.js";

router.get("/profiledata/:username", getProfileData);
router.get("/recentsupports/:username", getRecentSupports);

router.put("/publicprofiledata/:user_id", updatePublicProfileData);
router.post("/publicprofiledata/:user_id", createPublicProfileData);

export default router;
