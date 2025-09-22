import express from "express";
import dotenv from "dotenv";
import contactRoutes from "./routes/contact.js";

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use("/api/contact", contactRoutes);

// Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
// Note: Ensure you have a .env file with GMAIL_USER and GMAIL_PASS for nodemailer to work.