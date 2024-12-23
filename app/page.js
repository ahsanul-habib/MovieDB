import {
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
} from "@/actions/movies";
import MovieCarousel from "./components/MovieCarousel";
import Hero from "./components/Hero";
import { getRandomNumber } from "@/utils/getRandomNumber";

export default async function Home() {
  const trendingMoviesPromise = getTrendingMovies();
  const popularMoviesPromise = await getPopularMovies();
  const topRatedMoviesPromise = await getTopRatedMovies();

  const [trendingMovies, popularMovies, topRatedMovies] = await Promise.all([trendingMoviesPromise, popularMoviesPromise, topRatedMoviesPromise]);

  return (
    <div>
      {/* Hero Section */}
        <Hero movie={trendingMovies?.results[getRandomNumber(0, trendingMovies?.results?.length-1)]}/>
      {/* Movie Sections */}
      <div className="container mx-auto px-4 py-8">
        {/* Trending Movies */}
        <MovieCarousel
          title="Trending Now"
          movieList={trendingMovies?.results}
        />
        {/* Popular Movies */}
        <MovieCarousel
          title="Popular on MOVIE DB"
          movieList={popularMovies?.results}
        />
        {/* Top Rated Movies */}
        <MovieCarousel title="Top Rated" movieList={topRatedMovies?.results} />
      </div>
    </div>
  );
}
