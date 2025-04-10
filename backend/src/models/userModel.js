import pool from "../config/db.js";

export const createUserService = async (name, email, username, password) => {
  try {
    const result = await pool.query(
      "INSERT INTO users (name, email, username, password) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, username, password]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error inserting user:", error);
    throw error;
  }
};

export const findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email =$1", [
    email,
  ]);
  return result.rows[0];
};

export const findUserByUsername = async (username) => {
  const result = await pool.query(
    "SELECT user_id, name, email, username, created_at FROM users WHERE username = $1",
    [username]
  );
  return result.rows[0];
};
