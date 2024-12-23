import Image from "next/image";
import Link from "next/link";

const MovieCard = ({movie,handleRemove}) => {

    const handleRemoveButtonClick=async(e)=>{
        e.preventDefault();
        e.stopPropagation();
        await handleRemove(movie.id);
    }

  return (
    <Link
        href={`/movie/${movie.id}`}
      className="bg-moviedb-black rounded-lg overflow-hidden shadow-lg group relative"
    >
      <Image
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        height={450}
        width={200}
        alt={movie.title}
        className="w-full h-[450px] object-cover"
      />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h2 className="text-xl font-bold text-light mb-2">{movie.title}</h2>
        <div className="flex justify-between items-center">
          <span className="text-primary">
            {movie.release_date? movie.release_date.slice(0,4): "No data"}
          </span>
          <button onClick={handleRemoveButtonClick} className="bg-moviedb-red text-light px-3 py-1 rounded-full hover:bg-moviedb-red/80 transition">
            Remove
          </button>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
