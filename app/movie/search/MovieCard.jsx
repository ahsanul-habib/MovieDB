import Image from "next/image"
import Link from "next/link"

const MovieCard = ({movie}) => {
  return (
    <Link
    href={`/movie/${movie.id}`}
    className="bg-zinc-900 rounded-lg overflow-hidden hover:scale-105 transition-transform"
  >
    <Image
      src={
        movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : "/placeholder-image.jpg"
      }
      height={400}
      width={200}
      alt={movie.title}
      className="w-full aspect-[2/3] object-cover"
    />
    <div className="p-4">
      <h3 className="font-bold mb-2">{movie.title}</h3>
      <div className="flex justify-between text-sm text-gray-400">
        <span>{movie.release_date?.slice(0, 4) || "N/A"}</span>
        <span>⭐ {movie.vote_average || "N/A"}</span>
      </div>
    </div>
  </Link>
  )
}

export default MovieCard