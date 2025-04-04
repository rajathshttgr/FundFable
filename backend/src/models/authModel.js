import pool from "../config/db.js";

export const createUserAuthService = async (
  name,
  email,
  username,
  password
) => {
  const result = await pool.query(
    "INSERT INTO userauth (name, email, username, password) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, email, username, password]
  );
  return result.rows[0];
};

export const validatePassword = async (email, password) => {
  const result = await pool.query("SELECT * FROM userauth WHERE email = $1", [
    email,
  ]);

  if (result.rows.length === 0) {
    return false;
  }

  const dbPassword = result.rows[0].password;

  const isValid = dbPassword === password;

  return isValid;
};

export const findUserByUsername = async (username) => {
  const result = await pool.query(
    "SELECT * FROM userauth WHERE username = $1",
    [username]
  );
  console.log(result.rows[0]);

  return result.rows[0];
};

export const findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM userauth WHERE email =$1", [
    email,
  ]);
  return result.rows[0];
};
