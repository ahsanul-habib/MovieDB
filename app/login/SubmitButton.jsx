import { useFormStatus } from "react-dom";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            className={`w-full bg-moviedb-red text-white py-3 rounded hover:bg-red-700 transition duration-300 ${
                pending ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={pending}
        >
            {pending ? "Signing You In..." : "Sign In"}
        </button>
    );
}

export default SubmitButton;