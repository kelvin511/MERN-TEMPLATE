import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(`${process.env.URI}`);
    console.log("Connected to the Db");
  } catch (error) {
    console.log("failed to connect to the database");
    process.exit(0);
  }
}
