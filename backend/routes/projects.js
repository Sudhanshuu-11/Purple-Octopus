import { Router } from "express";
import { mkdirSync } from "node:fs";
import { randomUUID } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import multer from "multer";
import Project from "../models/Project.js";

const router = Router();
const uploadDirectory = path.join(path.dirname(fileURLToPath(import.meta.url)), "../uploads");
mkdirSync(uploadDirectory, { recursive: true });
const allowedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
const avatarUpload = multer({
  storage: multer.diskStorage({
    destination: uploadDirectory,
    filename: (_req, file, done) => done(null, `${randomUUID()}${path.extname(file.originalname).toLowerCase()}`),
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, done) => {
    const extension = path.extname(file.originalname).toLowerCase();
    if (!file.mimetype.startsWith("image/") || !allowedExtensions.has(extension)) {
      return done(new Error("Upload a JPG, PNG, WebP or GIF image."));
    }
    return done(null, true);
  },
});

router.get("/", async (req, res, next) => {
  try {
    const filter = req.query.featured === "true" ? { featured: true } : {};
    const projects = await Project.find(filter).sort({ createdAt: -1 }).lean();
    res.json({ data: projects });
  } catch (error) {
    next(error);
  }
});

router.post("/", avatarUpload.single("avatar"), async (req, res, next) => {
  try {
    const avatar = req.file ? `/uploads/${req.file.filename}` : "";
    if (!avatar) return res.status(400).json({ message: "Choose a profile avatar to upload." });

    const project = await Project.create({
      ...req.body,
      avatar,
      image: avatar,
      source: "manual",
    });
    return res.status(201).json({ data: project, message: "Profile saved and added to Work." });
  } catch (error) {
    return next(error);
  }
});

export default router;
