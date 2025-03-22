import pool from "../config/db.js";

const createUserAuthTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS userauth(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
)
`;

  try {
    pool.query(queryText);
    console.log("User Auth table created if not exists");
  } catch (error) {
    console.log("Error creating users auth table : ", error);
  }
};

export default createUserAuthTable;
