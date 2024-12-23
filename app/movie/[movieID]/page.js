import { getMovieDetails, getSimilarMovies } from "@/actions/movies";
import MovieDetails from "./MovieDetails";
import NotFound from "./NotFound";
import { Suspense } from "react";
import SimilarMovies from "./SimilarMovies";
import SkeletonTrendingMovies from "./SkeletonSimilarMovies";

export async function generateMetadata({ params }) {
  const { movieID } = params;
  const movie = await getMovieDetails(movieID);

  return {
    title: movie?.title || "Movie not found!",
    description: movie?.overview || "No description available.",
    openGraph: {
      images: movie?.poster_path
        ? [`https://image.tmdb.org/t/p/original${movie.poster_path}`]
        : [],
    },
  };
}


const page = async ({ params }) => {
  const { movieID } = params;
  const movie = await getMovieDetails(movieID);
  if (!movie) {
    return <NotFound movieID={movieID} />;
  }

  return (
    <>
      <div>
        <MovieDetails movie={movie} />
        <Suspense fallback={<SkeletonTrendingMovies />}>
          <SimilarMovies movieID={movieID} />
        </Suspense>
      </div>
    </>
  );
};

export default page;
