import express from "express";
import { createUserAuth } from "../controllers/authController.js";
import { checkUsernameExists } from "../controllers/authController.js";
import { checkEmailExists } from "../controllers/authController.js";
import { userLoginAuth } from "../controllers/authController.js";
import validateUser from "../middlewares/inputValidator.js";

const router = express.Router();

router.post("/register", validateUser, createUserAuth);
router.post("/login", userLoginAuth);
router.get("/check-username/:username", checkUsernameExists);
router.get("/check-email/:email", checkEmailExists);

export default router;
