"use server"

import dbConnect from "@/db/connectMongo";
import UserModel from "@/models/users";
import watchlistModel from "@/models/watchlist";
import bcrypt from "bcrypt"

export default async function registerAction(formData) {
    try {
        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        const email = formData.get('email');
        const password = formData.get('password');
        const password2 = formData.get('password2');

        if (!firstName || !lastName || !email || !password || !password2) {
            return { success: false, message: "All fields are required." };
        }

        if (password !== password2) {
            return { success: false, message: "Passwords do not match." };
        }

        await dbConnect();

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return { success: false, message: "User already exists." };
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const createdUser = await UserModel.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        if (!createdUser) {
            return { success: false, message: "Failed to create user." };
        }

        const watchList = await watchlistModel.create({
            userID: createdUser._id.toString(),
            videoList: []
        });

        if (!watchList) {
            return { success: false, message: "User created, but failed to create WatchList." };
        }

        return {
            success: true,
            message: "User registered successfully."
        };
    } catch (error) {
        console.error("Error in registerAction:", error);
        return { success: false, message: "An error occurred during registration." };
    }
}