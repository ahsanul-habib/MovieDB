"use client";
import getFormattedCurrency from "@/utils/getFormattedCurrency";
import Image from "next/image";

const MovieSlot = ({ movieData, removeSlot, index, setIndexToSearchMovie }) => {

  if (!movieData) {
    return (
      <div className="bg-zinc-900 rounded-lg p-4 flex flex-col min-h-[400px]">
        <div className="flex justify-end mb-4">
          <button
            className="text-gray-400 hover:text-white"
            onClick={() => removeSlot(index)}
          >
            ✕
          </button>
        </div>
        <div className="flex-grow flex flex-col items-center justify-center">
          <button
            onClick={() => {
              setIndexToSearchMovie(index);
            }}
            className="bg-zinc-800 text-white px-6 py-3 rounded hover:bg-zinc-700 transition-colors cursor-pointer"
          >
            Select Movie
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 rounded-lg p-4 flex flex-col">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => removeSlot(index)}
          className="text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-2 h-full">
          <Image
            src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`}
            height={500}
            width={300}
            alt="Snowden"
            className="w-full rounded-lg mb-4 object-contain max-h-full"
          />
          <h2 className="text-xl font-bold mb-2 text-center">
            {movieData? movieData.title : "No data"}
          </h2>
        </div>
        <div className="w-full space-y-4 col-span-3">
          <div className="bg-zinc-800 p-3 rounded">
            <span className="text-gray-400">Rating:</span>
            <span className="float-right">{movieData.vote_average}/10</span>
          </div>
          <div className="bg-zinc-800 p-3 rounded">
            <span className="text-gray-400">Release Year:</span>
            <span className="float-right">
              {movieData.release_date? movieData.release_date.slice(0, 4) :"No data" }
            </span>
          </div>
          <div className="bg-zinc-800 p-3 rounded">
            <span className="text-gray-400">Runtime:</span>
            <span className="float-right">{movieData.runtime!=null ? `${movieData.runtime} min`:"No data"} </span>
          </div>
          <div className="bg-zinc-800 p-3 rounded">
            <span className="text-gray-400">Budget:</span>
            <span className="float-right">
              {getFormattedCurrency(movieData.budget)}
            </span>
          </div>
          <div className="bg-zinc-800 p-3 rounded">
            <span className="text-gray-400">Revenue:</span>
            <span className="float-right">
              {getFormattedCurrency(movieData.revenue)}
            </span>
          </div>
          <div className="bg-zinc-800 p-3 rounded">
            <span className="text-gray-400">Genres:</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {movieData?.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-zinc-700 px-2 py-1 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieSlot;
