import mongoose from "mongoose";

export async function connectDatabase(uri) {
  if (!uri) {
    console.warn("MongoDB is not connected. Add MONGODB_URI to .env to enable database features.");
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
  }
}
