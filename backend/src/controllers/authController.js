import { createUserAuthService } from "../models/authModel.js";
import { findUserByUsername } from "../models/authModel.js";
import { findUserByEmail } from "../models/authModel.js";
import { validatePassword } from "../models/authModel.js";

// Standardized response function
const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const createUserAuth = async (req, res, next) => {
  const { name, email, username, password } = req.body;
  try {
    const newUser = await createUserAuthService(
      name,
      email,
      username,
      password
    );
    handleResponse(res, 201, "Registration successfully", newUser);
  } catch (err) {
    next(err);
  }
};

export const userLoginAuth = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      handleResponse(res, 404, "User not found");
    } else {
      const isMatch = await validatePassword(email, password);
      if (isMatch) {
        handleResponse(res, 200, "Login Successful", { jwtToken: "TOKEN2025" });
      } else {
        handleResponse(res, 401, "Invalid credentials");
      }
    }
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
