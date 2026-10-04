import { Router } from "express";
import { createHash, randomUUID } from "node:crypto";
import path from "node:path";
import multer from "multer";
import Project from "../models/Project.js";

const router = Router();
const allowedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
const profileImageUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, done) => {
    const extension = path.extname(file.originalname).toLowerCase();
    if (!file.mimetype.startsWith("image/") || !allowedExtensions.has(extension)) {
      return done(new Error("Upload a JPG, PNG, WebP or GIF image."));
    }
    return done(null, true);
  },
});

async function uploadToCloudinary(file, kind) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const folder = "purple-octopus/profiles";
  const publicId = `${kind}-${randomUUID()}`;
  const signatureBase = `folder=${folder}&public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
  const signature = createHash("sha1").update(signatureBase).digest("hex");
  const form = new FormData();
  form.append("file", new Blob([file.buffer], { type: file.mimetype }), file.originalname);
  form.append("api_key", apiKey);
  form.append("timestamp", timestamp);
  form.append("folder", folder);
  form.append("public_id", publicId);
  form.append("signature", signature);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: form,
  });
  const result = await response.json();
  if (!response.ok || !result.secure_url) {
    throw new Error(result.error?.message || "Cloudinary image upload failed.");
  }
  return result.secure_url;
}

router.get("/", async (req, res, next) => {
  try {
    const filter = req.query.featured === "true" ? { featured: true } : {};
    const projects = await Project.find(filter).sort({ createdAt: -1 }).lean();
    res.json({ data: projects });
  } catch (error) {
    next(error);
  }
});

router.post("/", profileImageUpload.fields([
  { name: "avatar", maxCount: 1 },
  { name: "image", maxCount: 1 },
]), async (req, res, next) => {
  try {
    const avatarFile = req.files?.avatar?.[0];
    const profileImageFile = req.files?.image?.[0];
    if (!avatarFile || !profileImageFile) {
      return res.status(400).json({ message: "Upload both a profile avatar and a profile picture." });
    }
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      return res.status(503).json({ message: "Cloudinary is not configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET to the backend environment." });
    }
    const [avatar, image] = await Promise.all([
      uploadToCloudinary(avatarFile, "avatar"),
      uploadToCloudinary(profileImageFile, "profile"),
    ]);
    const project = await Project.create({
      ...req.body,
      avatar,
      image,
      source: "manual",
    });
    return res.status(201).json({ data: project, message: "Profile saved and added to Work." });
  } catch (error) {
    return next(error);
  }
});

export default router;
