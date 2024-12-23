"use client";

import loginAction from "@/actions/login";
import { useSetAuth } from "@/providers/AuthProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SubmitButton from "./SubmitButton";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [error, setError] = useState("");
  const setAuth = useSetAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
      await toast.promise(
        (async () => {
          const result = await loginAction(formData);
          if (result.success) {
            setError("");
            setAuth(result.user);
            localStorage.setItem("auth", JSON.stringify(result.user));
            if (window.history.length > 1) {
              router.back();
            } else {
              router.push("/");
            }
          } else {
            setError(result.message);
            throw new Error(result.message || "Failed sign in...");
          }
          return result;
        })(),
        {
          pending: "Signing you in... ⏳",
          success: {
            render({ data }) {
              return data?.message || "Signed in successfully! 🎉";
            },
          },
          error: {
            render({ data }) {
              return data?.message || "Failed to sign in... 😢";
            },
          },
        }
      );
  };

  return (
    <div className="h-screen w-full bg-black/70 rounded-lg p-8 shadow-xl flex flex-col justify-center items-center">
      <div className="text-center mb-6">
        <h1 className="text-white text-3xl font-bold mb-2">Sign In</h1>
        <h3 className="text-red-500 text-2xl mb-3">{error}</h3>
        <form id="loginForm" onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email or phone number"
            className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
            required
          />

          <SubmitButton />
        </form>
        <div className="mt-4 flex justify-between text-moviedb-gray text-sm">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Remember me
          </label>
          <Link href="#" className="hover:underline">
            Need help?
          </Link>
        </div>
        <div className="mt-6 text-moviedb-gray">
          New to moviedb?
          <button
            onClick={() => router.replace("/signup")}
            className="text-white hover:underline"
          >
            Sign up now
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
