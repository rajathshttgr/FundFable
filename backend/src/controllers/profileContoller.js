import { newTransactionService } from "../models/profileModel.js";
import { getUserPublicProfileService } from "../models/profileModel.js";
import { getRecentCommentsService } from "../models/profileModel.js";

const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const newTransaction = async (req, res, next) => {
  const {
    user_id,
    supporter_name,
    supporter_username,
    supporter_socialmedia,
    supporter_message,
    amount,
    transaction_success,
  } = req.body;

  try {
    const transaction = await newTransactionService(
      user_id,
      supporter_name,
      supporter_username,
      supporter_socialmedia,
      supporter_message,
      amount,
      transaction_success
    );

    if (transaction) {
      handleResponse(
        res,
        201,
        "transaction Data uploaded successfully",
        transaction
      );
      console.log(transaction);
    }
  } catch (err) {
    next(err);
  }
};

export const getPublicProfile = async (req, res, next) => {
  const { username } = req.params;

  try {
    const profile = await getUserPublicProfileService(username);
    if (profile) {
      handleResponse(res, 200, "Data fetched successfully", {
        exists: true,
        profile,
      });
    } else {
      handleResponse(res, 200, "Username doesn't exists", { exists: false });
    }
  } catch (error) {
    next(err);
  }
};

export const getRecentComments = async (req, res, next) => {
  const { username } = req.params;
  try {
    const recentcomments = await getRecentCommentsService(username);
    if (recentcomments) {
      handleResponse(
        res,
        200,
        "Recent comments fetched successfully",
        recentcomments
      );
    } else {
      handleResponse(res, 200, "No records found");
    }
  } catch (error) {
    next(err);
  }
};
