"use client"

import Link from "next/link";

const NotFound = ({movieID}) => {
  return (
    <section className="bg-gray-900">
      <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
        <div className="flex flex-col items-center max-w-sm mx-auto text-center">
          <p className="p-3 text-sm font-medium text-blue-500 rounded-full bg-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-20 h-20"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              id="Layer_1"
              viewBox="0 0 128 128"
              xmlSpace="preserve"
            >
              <g>
                <circle style={{ fill: "#E16B5A" }} cx={64} cy={64} r={64} />
                <path
                  style={{ fill: "#D16354" }}
                  d="M115.061,102.578L99.605,64.253c-0.028-0.159-0.08-0.314-0.158-0.468   c-0.073-0.522-0.396-1.032-1.004-1.429L45.462,27.644c-1.38-0.904-2.509-0.294-2.509,1.356v0.512v0.512V99v0.512V100l10.796,27.172   C57.088,127.71,60.51,128,64,128C84.855,128,103.376,118.02,115.061,102.578z"
                />
                <path
                  style={{ fill: "#F5F5F5" }}
                  d="M42.953,29c0-1.65,1.129-2.26,2.509-1.356l52.981,34.712c1.38,0.904,1.38,2.384,0,3.289   l-52.981,34.711c-1.38,0.904-2.509,0.295-2.509-1.355V29z"
                />
              </g>
            </svg>
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-white md:text-3xl">
            Movie not found!
          </h1>
          <p className="mt-4 text-gray-400">
            The movie with the movieID {movieID} not found!
          </p>
          <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
            <Link href="/" className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
              Take me home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
