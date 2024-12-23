import { getMovieDetails, getSimilarMovies } from "@/actions/movies";
import MovieDetails from "./MovieDetails";
import MovieCarousel from "@/app/components/MovieCarousel";
import NotFound from "./NotFound";

export async function generateMetaData({params}){
  const {movieID}=await params;
  const movie = await getMovieDetails(movieID);

  if(!movie){
    return {
      title: "Movie not found!",
      description: "Movie not found!"
    }
  }

  return {
    title: movie?.title,
    description: movie?.overview,
    openGraph:{
      images: [`https://image.tmdb.org/t/p/original${movie.poster_path}`]
    }
  }
}

const page = async ({ params }) => {
  const {movieID}=await params;
  const movie = await getMovieDetails(movieID);
  if(!movie){
    return (<NotFound movieID={movieID}/>)
  }
  const similarMovies = await getSimilarMovies(movieID);

  return (
    <>
      <div>
        <MovieDetails movie={movie} />
        <div className="pt-12">
          <MovieCarousel
            title="Similar Movies"
            movieList={similarMovies.results}
          />
        </div>
      </div>
    </>
  );
};

export default page;
