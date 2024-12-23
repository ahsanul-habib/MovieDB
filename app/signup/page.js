"use client";

import registerAction from "@/actions/register";
import { useRouter } from "next/navigation";
import { useState } from "react";
import RegisterButton from "./RegisterButton";
import { toast } from "react-toastify";

const SignUpPage = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      await toast.promise(
        (async () => {
          const result = await registerAction(formData);
          if (result.success) {
            setError("");
            router.replace("/login");
          } else {
            setError(result.message);
            throw new Error(result.message || "Failed sign up...");
          }
          return result;
        })(),
        {
          pending: "Registering user... ⏳",
          success: {
            render({ data }) {
              return data?.message || "Registration successfully! 🎉";
            },
          },
          error: {
            render({ data }) {
              return data?.message || "Failed to register... 😢";
            },
          },
        }
      );
    } catch (err) {
      setError(err.message || "An error occurred during registration.");
    }
  };

  return (
    <div className="bg-moviedb-black min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-black/70 rounded-lg p-8 shadow-xl">
        <div className="text-center">
          <h1 className="text-white text-3xl font-bold mb-3">
            Create Your Account
          </h1>
          <h3 className="text-red-500 text-2xl mb-3">{error}</h3>
          <form id="signupForm" onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Create Password"
              className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
              required
            />
            <input
              type="password"
              name="password2"
              placeholder="Confirm Password"
              className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
              required
            />
            <div className="text-left text-moviedb-gray text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" required />I agree to
                the Terms of Service and Privacy Policy
              </label>
            </div>
            <RegisterButton />
          </form>
          <div className="mt-6 text-moviedb-gray">
            Already have an account?
            <button
              onClick={() => router.replace("/login")}
              className="text-white hover:underline"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
