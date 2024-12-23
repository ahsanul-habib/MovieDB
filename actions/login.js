"use server"

import bcrypt from "bcrypt";
import dbConnect from "@/db/connectMongo";
import UserModel from "@/models/users";

export default async function loginAction(formData) {
    try {
        const email = formData.get("email");
        const password = formData.get("password");

        if (!email || !password) {
            return { success: false, message: "Email and password are required." };
        }

        await dbConnect();

        const existingUser = await UserModel.findOne({ email });
        if (!existingUser) {
            return { success: false, message: "User not found." };
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return { success: false, message: "Invalid password." };
        }

        return {
            success: true,
            message: "Login successful.",
            user: { id: existingUser._id.toString(), email: existingUser.email }
        };

    } catch (error) {
        console.error("Error in loginAction:", error);
        return { success: false, message: "An error occurred during login." };
    }
}
