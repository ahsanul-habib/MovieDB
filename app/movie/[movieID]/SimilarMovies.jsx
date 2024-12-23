import { getSimilarMovies } from "@/actions/movies";
import MovieCarousel from "@/app/components/MovieCarousel";

const SimilarMovies = async({movieID}) => {
    const similarMovies = await getSimilarMovies(movieID);
  return (
    <div className="pt-12">
      <MovieCarousel title="Similar Movies" movieList={similarMovies.results} />
    </div>
  );
};

export default SimilarMovies;
