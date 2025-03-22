import express from "express";
import { createUserAuth } from "../controllers/authController.js";
import { checkUsernameExists } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", createUserAuth);
router.get("/check-username/:username", checkUsernameExists);

export default router;
