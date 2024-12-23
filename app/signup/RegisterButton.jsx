"use client"

import { useFormStatus } from "react-dom";

const RegisterButton = () => {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            className={`w-full bg-moviedb-red text-white py-3 rounded hover:bg-red-700 transition duration-300 ${
                pending ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={pending}
        >
            {pending ? "Signing Up..." : "Sign Up"}
        </button>
    );
};

export default RegisterButton;
