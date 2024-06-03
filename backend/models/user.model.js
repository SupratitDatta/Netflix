import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: [60, "Email id can't be greater than 60 characters"]
    },
    likedMovies: {
        type: Array,
        default: []
    }
});

export const User = mongoose.model("users", userSchema);