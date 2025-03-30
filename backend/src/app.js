import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import pool from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import errorHandling from "./middlewares/errorhandler.js";
import createUserAuthTable from "./data/createUserAuthTable.js";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Error handling middleware
app.use(errorHandling);

// Routes
app.use("/api/auth", authRoutes);

// PostgreSQL connection test
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT current_database()");
    res.send(`The database is: ${result.rows[0].current_database}`);
  } catch (error) {
    res.status(500).send("Error connecting to database");
  }
});

// Create tables before starting server
createUserAuthTable();

export default app;
