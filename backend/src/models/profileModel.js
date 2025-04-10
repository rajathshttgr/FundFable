import pool from "../config/db.js";

export const newTransactionService = async (
  user_id,
  supporter_name,
  supporter_username,
  supporter_socialmedia,
  supporter_message,
  amount,
  transaction_success
) => {
  try {
    const result = await pool.query(
      "INSERT INTO transaction (user_id,supporter_name,supporter_username,supporter_socialmedia,supporter_message,amount,transaction_success) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        user_id,
        supporter_name,
        supporter_username,
        supporter_socialmedia,
        supporter_message,
        amount,
        transaction_success,
      ]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error inserting transaction:", error);
    throw error;
  }
};

export const getUserPublicProfileService = async (username) => {
  try {
    const result = await pool.query(
      "SELECT users.user_id, bio, instagram, twitter, linkedin, github,name,username FROM profile INNER JOIN users ON profile.user_id=users.user_id WHERE username=$1",
      [username]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error in accessing user public profile:", error);
    throw error;
  }
};

export const getRecentCommentsService = async (username) => {
  try {
    const result = await pool.query(
      "SELECT supporter_name, supporter_message, amount, username FROM transaction INNER JOIN users ON transaction.user_id = users.user_id WHERE username = $1 ORDER BY transaction.transaction_id DESC LIMIT 20;",
      [username]
    );
    return result.rows;
  } catch (error) {
    console.error("Error in fetching data:", error);
    throw error;
  }
};

export const getRecentSupportsService = async (username) => {
  try {
    const result = await pool.query(
      "SELECT supporter_name, supporter_message, amount, transaction.created_at, username FROM transaction INNER JOIN users ON transaction.user_id = users.user_id WHERE username = $1 ORDER BY transaction.transaction_id DESC LIMIT 20;",
      [username]
    );
    return result.rows;
  } catch (error) {
    console.error("Error in fetching data:", error);
    throw error;
  }
};

export const getProfileDataService = async (username) => {
  try {
    const result = await pool.query(
      "SELECT users.name, users.username, SUM(transaction.amount) AS amount FROM users INNER JOIN transaction ON transaction.user_id = users.user_id WHERE users.username = $1 GROUP BY users.name, users.username;",
      [username]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error in fetching data:", error);
    throw error;
  }
};

export const updatePublicProfileService = async (
  user_id,
  bio,
  instagram,
  twitter,
  linkedin,
  github
) => {
  try {
    const result = await pool.query(
      "UPDATE profile SET bio = $1, instagram = $2, twitter = $3, linkedin = $4, github = $5 WHERE user_id = $6 RETURNING *",
      [bio, instagram, twitter, linkedin, github, user_id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error updating public profile:", error);
    throw error;
  }
};

export const createPublicProfileService = async (
  user_id,
  bio,
  instagram,
  twitter,
  linkedin,
  github
) => {
  try {
    const result = await pool.query(
      "INSERT INTO profile (user_id, bio, instagram, twitter, linkedin, github) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [user_id, bio, instagram, twitter, linkedin, github]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error creating public profile:", error);
    throw error;
  }
};
