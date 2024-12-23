"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getSearchResult } from "@/actions/movies";
import MovieCard from "./MovieCard";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(movies);
  useEffect(() => {
    const fetchMovies = async () => {
      if (!query) return;
      setLoading(true);
      const response = await fetch(`/api/movies/search?query=${query}`);
      const data=await response.json();
      setMovies(data.results || []);
      setLoading(false);
    };

    fetchMovies();
  }, [query]);

  return (
    <main className="container mx-auto px-4 pt-24 pb-8">
      {/* Search Stats */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          Search Results for: <span className="text-primary">{query || "..."}</span>
        </h1>
        <p className="text-gray-400">
          {loading ? "Loading results..." : `Found ${movies.length} results`}
        </p>
      </div>

      {/* Movie Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          <p className="text-center col-span-full">Loading...</p>
        ) : movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie}/>
          ))
        ) : (
          <p className="text-center col-span-full">No movies found.</p>
        )}
      </div>
    </main>
  );
};

export default SearchPage;
