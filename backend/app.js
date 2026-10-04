import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { fileURLToPath } from "node:url";
import path from "node:path";
import inquiriesRouter from "./routes/inquiries.js";
import projectsRouter from "./routes/projects.js";

const app = express();
const backendDirectory = path.dirname(fileURLToPath(import.meta.url));
const allowedOrigins = process.env.CLIENT_ORIGIN?.split(",").map((origin) => origin.trim()).filter(Boolean);

app.use(cors({ origin: allowedOrigins?.length ? allowedOrigins : true }));
app.use(express.json({ limit: "100kb" }));
app.use("/uploads", express.static(path.join(backendDirectory, "uploads")));

app.get("/api/health", (_req, res) => {
  const states = ["disconnected", "connected", "connecting", "disconnecting"];
  res.json({ status: "ok", database: states[mongoose.connection.readyState] });
});

app.use("/api", (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: "Database is not connected. Configure MONGODB_URI and restart the API." });
  }
  return next();
});

app.use("/api/inquiries", inquiriesRouter);
app.use("/api/projects", projectsRouter);

app.use((_req, res) => res.status(404).json({ message: "Route not found." }));

app.use((error, _req, res, _next) => {
  console.error(error);
  if (error.code === "LIMIT_FILE_SIZE" || error.message.startsWith("Upload a JPG")) {
    return res.status(400).json({ message: error.message });
  }
  res.status(500).json({ message: "Something went wrong. Please try again." });
});

export default app;
