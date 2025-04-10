import express from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import { createTables } from "./data/createTables.js";
import { errorHandling } from "./middleware/errorHandler.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import { verifyToken } from "./middleware/authMiddleware.js";

dotenv.config();

const PORT = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("You are running FundFable backend server");
});

//routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/profile", profileRoutes);

//Error Handling Middleware
app.use(errorHandling);

// Start the server
createTables()
  .then(() => {
    console.log("Database setup completed. Starting server...");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to setup database:", err);
    process.exit(1);
  });
