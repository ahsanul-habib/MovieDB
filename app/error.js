"use client"

import Link from "next/link";

const error = ({error}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-200 to-dark-300 flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8 bg-dark-100 p-10 rounded-xl shadow-2xl">
      <div className="text-center">
        <h2 className="mt-6 text-6xl font-extrabold text-red-500">500</h2>
        <p className="mt-2 text-3xl font-bold text-white">Oops! There is an error!</p>
        <p className="mt-2 text-sm text-gray-400">{error?.message}</p>
      </div>
      <div className="mt-8">
        <Link
          href="#"
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-dark-300 bg-red-500 hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
        >
          Go back to homepage
        </Link>
      </div>
    </div>
  </div>
);
}

export default error