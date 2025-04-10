import pool from "../config/db.js";

export const createTables = async () => {
  const queryTextUSerTable = `
    CREATE TABLE IF NOT EXISTS users (
      user_id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      username VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;

  const queryTextTransactionTable = `
    CREATE TABLE IF NOT EXISTS transaction (
       transaction_id SERIAL PRIMARY KEY,
       user_id INT NOT NULL,
       supporter_name VARCHAR(100),
       supporter_username VARCHAR(100),
       supporter_socialmedia VARCHAR(100) DEFAULT 'instagram',
	     supporter_message TEXT,
	     amount NUMERIC NOT NULL,
	     transaction_success BOOLEAN DEFAULT FALSE,
       created_at TIMESTAMP DEFAULT NOW(),

       FOREIGN KEY (user_id) REFERENCES users(user_id),

       -- Ensure at least one of the two fields is NOT NULL
      CHECK (
        supporter_name IS NOT NULL OR 
        supporter_username IS NOT NULL
       ),

       -- Ensure supporter_socialmedia is either 'instagram' or 'twitter'
      CHECK (
        supporter_socialmedia IN ('instagram', 'twitter')
       ),

      -- If supporter_username is NOT NULL, supporter_socialmedia must also be NOT NULL
      CHECK (
        supporter_username IS NULL OR supporter_socialmedia IS NOT NULL
      )
  );
  `;

  const queryTextProfileTable = `
  CREATE TABLE IF NOT EXISTS profile(
    profile_id SERIAL PRIMARY KEY,
    bio TEXT,
    instagram VARCHAR(100),
    twitter  VARCHAR(100),
    linkedin VARCHAR(100),
    github VARCHAR(100),
    user_id INT NOT NULL,

    FOREIGN KEY (user_id) REFERENCES users(user_id)

);`;

  try {
    await pool.query(queryTextUSerTable);
    console.log("User table created if not exists");
    await pool.query(queryTextTransactionTable);
    console.log("Transaction table created if not exists");
    await pool.query(queryTextProfileTable);
    console.log("Profile table created if not exists");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
};
