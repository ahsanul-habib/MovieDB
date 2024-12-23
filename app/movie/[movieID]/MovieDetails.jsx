import { getMovieCastDetails } from "@/actions/movies";
import getFormattedDate from "@/utils/getFormattedDate";
import Image from "next/image";
import AddToWatchButton from "./AddToWatchButton";

const MovieDetails = async ({ movie }) => {
  const movieCastDetails = await getMovieCastDetails(movie.id);
  return (
    <div id="movieDetails" className="min-h-screen mb-8">
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            width={1000}
            height={1000}
            alt="Smile 2"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70" />
        </div>
        <div className="relative container mx-auto px-4 pt-32">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <Image
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                    : "/placeholder.jpg"
                }
                width={400}
                height={600}
                alt="Smile 2"
                className="rounded-lg shadow-lg h-[600px]"
              />
            </div>
            <div className="md:w-2/3">
              <h1 className="text-4xl font-bold mb-4">{movie?.title}</h1>
              <div className="flex items-center mb-4 space-x-4">
                <span className="text-green-500">
                  {getFormattedDate(movie.release_date)}
                </span>
                <span>| </span>
                <span>{movie.runtime} min</span>
              </div>
              <p className="text-lg mb-6">{movie?.overview}</p>
              <div className="mb-6">
                <h3 className="text-gray-400 mb-2">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                    >
                      {genre.name}{" "}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-gray-400 mb-2">Cast</h3>
                <div className="flex flex-wrap gap-4">
                  {movieCastDetails.cast.slice(0, 6).map((cast) => (
                    <div className="text-center" key={cast.id}>
                      <Image
                        src={`https://image.tmdb.org/t/p/original${cast.profile_path}`}
                        width={50}
                        height={50}
                        alt={cast.name}
                        className="w-24 h-24 rounded-full object-cover mb-2"
                      />
                      <p className="text-sm">{cast.name}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <AddToWatchButton movie={movie} movieID={movie.id} />
              </div>
              <div className="mb-6">
                <h3 className="text-gray-400 mb-2">Share on social media</h3>
                <div className="flex flex-wrap gap-4">
                  <button className="text-center cursor-pointer">
                    <Image
                      height={32}
                      width={32}
                      src="http://facebook.com/favicon.ico"
                      alt="Facebook"
                      className="w-8 h-8 rounded-full object-cover mb-2 mx-auto"
                      />
                    <p className="text-sm">Facebook</p>
                  </button>
                  <button className="text-center cursor-pointer">
                    <Image
                      height={32}
                      width={32}
                      src="http://x.com/favicon.ico"
                      alt="Facebook"
                      className="w-8 h-8 rounded-full object-cover mb-2 mx-auto"
                    />
                    <p className="text-sm">X</p>
                  </button>
                  <button className="text-center cursor-pointer">
                    <Image
                      height={32}
                      width={32}
                      src="http://linkedin.com/favicon.ico"
                      alt="Facebook"
                      className="w-8 h-8 rounded-full object-cover mb-2 mx-auto"
                    />
                    <p className="text-sm">Linkedin</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
