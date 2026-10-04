import { Router } from "express";
import Inquiry from "../models/Inquiry.js";

const router = Router();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone, company, service, budget, timeline, message } = req.body;

    if (!name?.trim() || !emailPattern.test(email || "") || !message?.trim()) {
      return res.status(400).json({ message: "Name, a valid email address, and a message are required." });
    }

    const inquiry = await Inquiry.create({ name, email, phone, company, service, budget, timeline, message });
    return res.status(201).json({ data: inquiry, message: "Thanks. Your enquiry has been received." });
  } catch (error) {
    return next(error);
  }
});

export default router;
