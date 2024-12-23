"use client";

import { useState } from "react";
import MovieSlot from "./MovieSlot";
import SearchModal from "./SearchModal";

let indexCount = 3;

const Compare = () => {
  const [indexToSearchMovie, setIndexToSearchMovie] = useState(null);
  const [movieSlotList, setMovieSlotList] = useState([
    { movieID: null, movieData: null, index: 1 },
    { movieID: null, movieData: null, index: 2 },
  ]);

  const fetchAndSetMovieDetails = async (movieID, index) => {
    try {
      const response = await fetch(`/api/movies/data/${movieID}`);
      if (response.status === 200) {
        const data = await response.json();
        setMovieSlotList((prevState) =>
          prevState.map((slot) => {
            if (slot.index === index) {
              return {
                ...slot,
                movieData: data,
              };
            }
            return slot;
          })
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addEmptySlot = () => {
    setMovieSlotList([
      ...movieSlotList,
      {
        movieData: null,
        index: indexCount++,
      },
    ]);
  };

  const removeSlot = (index) => {
    setMovieSlotList(movieSlotList.filter((slot) => slot.index !== index));
  };

  const setMovieToCompare = async (movieID) => {
    await fetchAndSetMovieDetails(movieID, indexToSearchMovie);
  };

  return (
    <div>
      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24 pb-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Compare Movies</h1>
          <button
            onClick={addEmptySlot}
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Add Movie +
          </button>
        </div>
        {/* Movie Comparison Container */}
        <div className="grid gap-6 md:grid-cols-2">
          {movieSlotList.map((slot) => (
            <MovieSlot
              key={slot.index}
              index={slot.index}
              movieData={slot.movieData}
              removeSlot={removeSlot}
              setIndexToSearchMovie={setIndexToSearchMovie}
            />
          ))}
        </div>
      </main>
      {/* Movie Search Modal */}
      {indexToSearchMovie !== null && (
        <SearchModal
          setIndexToSearchMovie={setIndexToSearchMovie}
          setMovieToCompare={setMovieToCompare}
        />
      )}
    </div>
  );
};

export default Compare;
