import { createUserAuthService } from "../models/authModel.js";
import { findUserByUsername } from "../models/authModel.js";

// Standardized response function
const handleResponse = (res, status, message, data = NULL) => {
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
