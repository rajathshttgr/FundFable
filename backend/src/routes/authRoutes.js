import express from "express";
const router = express.Router();
import { createUser, userLogin } from "../controllers/authController.js";
import { checkEmailExists } from "../controllers/authController.js";
import { checkUsernameExists } from "../controllers/authController.js";

router.post("/register", createUser);
router.post("/login", userLogin);
router.get("/check-username/:username", checkUsernameExists);
router.get("/check-email/:email", checkEmailExists);

export default router;
