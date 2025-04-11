import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUserService } from "../models/userModel.js";
import { findUserByEmail } from "../models/userModel.js";
import { findUserByUsername } from "../models/userModel.js";
import { createPublicProfileService } from "../models/profileModel.js";
import { newTransactionService } from "../models/profileModel.js";

// Standardized response function
const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const createUser = async (req, res, next) => {
  const { name, email, username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await createUserService(
      name,
      email,
      username,
      hashedPassword
    );
    if (newUser) {
      try {
        const user = await findUserByEmail(email);
        const token = jwt.sign(
          { id: user.user_id, username: user.username },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        await createPublicProfileService(user.user_id, "", "", "", "", "");
        await newTransactionService(
          user.user_id,
          "FundFable",
          "FundFable",
          "instagram",
          "Welcome to FundFable!",
          100,
          true
        );
        handleResponse(res, 201, "Registration successfully", { token });
      } catch (error) {
        next(error);
      }
    }
  } catch (err) {
    next(err);
  }
};

export const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      handleResponse(res, 404, `User with email ${email} not found`);
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      handleResponse(res, 400, "Invalid credentials");
    }

    const token = jwt.sign(
      { id: user.user_id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    handleResponse(res, 201, "login successfully", { token });
  } catch (error) {
    next(error);
  }
};

export const checkUsernameExists = async (req, res, next) => {
  const { username } = req.params;
  console.log(username);

  try {
    const user = await findUserByUsername(username);
    console.log(user);

    if (user) {
      handleResponse(res, 200, "Username already exists", { exists: true });
    } else {
      handleResponse(res, 200, "Username doesn't exists", { exists: false });
    }
  } catch (err) {
    next(err);
  }
};

export const checkEmailExists = async (req, res, next) => {
  const { email } = req.params;
  console.log(email);

  try {
    const user = await findUserByEmail(email);
    if (user) {
      handleResponse(res, 200, "Email already exits", { exists: true });
    } else {
      handleResponse(res, 200, "Email doesn't exists", { exists: false });
    }
  } catch (error) {
    next(err);
  }
};

export const getUsername = async (req, res) => {
  const decodedUser = req.decodedUser;
  if (decodedUser) {
    res.status(200).json({
      status: 200,
      message: "User data retrieved successfully",
      data: decodedUser,
    });
  } else {
    res.status(400).json({
      status: 400,
      message: "Failed to retrieve user data",
    });
  }
};

export const getUsernameByToken = async (req, res) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return handleResponse(res, 401, "No token. Authorization denied.");
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    handleResponse(res, 200, "User data retrieved successfully", decoded);
  } catch (error) {
    handleResponse(res, 400, "Invalid or expired token.");
  }
};
