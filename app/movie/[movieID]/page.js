import { getMovieDetails, getSimilarMovies } from "@/actions/movies";
import MovieDetails from "./MovieDetails";
import NotFound from "./NotFound";
import { Suspense } from "react";
import SimilarMovies from "./SimilarMovies";
import SkeletonTrendingMovies from "./SkeletonSimilarMovies";

export async function generateMetaData({ params }) {
  const { movieID } = await params;
  const movie = await getMovieDetails(movieID);

  if (!movie) {
    return {
      title: "Movie not found!",
      description: "Movie not found!",
    };
  }

  return {
    title: movie?.title,
    description: movie?.overview,
    openGraph: {
      images: [`https://image.tmdb.org/t/p/original${movie.poster_path}`],
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
