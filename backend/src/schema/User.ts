import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    // _id : mongoose.Types.ObjectId,
    name:String,
    email:String,
    password:String,
    refreshToken:String,
    createdAt:Date,
    updatedAt:Date

})

export const User = mongoose.model("User",userSchema);