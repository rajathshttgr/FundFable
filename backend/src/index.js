import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorHandling from "./middlewares/errorhandler.js";
import createUserTable from "./data/createUserTable.js";
import createUserAuthTable from "./data/createUserAuthTable.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3002;

//middlewares
app.use(express.json());
app.use(cors());

//error handling middlewares
app.use(errorHandling);

//routes
app.use("/api", userRoutes);
app.use("/api/auth", authRoutes);

//create table before starting server
createUserTable();
createUserAuthTable();

//postgres connection test
app.get("/", async (req, res) => {
  const result = await pool.query("SELECT current_database()");
  console.log("result", result.rows);
  res.send(`The database is :${result.rows[0].current_database}`);
});

//server running
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
