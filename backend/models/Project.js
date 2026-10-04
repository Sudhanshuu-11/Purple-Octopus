import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    client: { type: String, required: true, trim: true, maxlength: 100 },
    handle: { type: String, required: true, trim: true, maxlength: 100 },
    profileUrl: { type: String, trim: true, maxlength: 500 },
    platform: { type: String, enum: ["Instagram", "Facebook", "LinkedIn"], required: true },
    type: { type: String, trim: true, maxlength: 100, default: "" },
    metric: { type: String, trim: true, maxlength: 30, default: "" },
    followers: { type: String, required: true, trim: true, maxlength: 30 },
    posts: { type: String, trim: true, maxlength: 30, default: "" },
    image: { type: String, required: true, trim: true },
    avatar: { type: String, required: true, trim: true },
    bio: { type: String, trim: true, maxlength: 240, default: "" },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default mongoose.model("Project", projectSchema);
