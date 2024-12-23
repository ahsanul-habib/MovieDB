import Link from "next/link";

const Hero = ({movie}) => {
  return (
    <div
    id="hero"
    className="relative h-screen"
    style={{
      backgroundImage:
        `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
      backgroundSize: "cover",
    }}
  >
    <div className="absolute inset-0 bg-gradient-to-t from-black" />
    <div className="absolute bottom-0 left-0 p-12">
      <h1 id="heroTitle" className="text-5xl font-bold mb-4">
        {movie?.title}
      </h1>
      <p id="heroOverview" className="text-lg max-w-2xl mb-4">
        {movie?.overview}
      </p>
      <Link href={`/movie/${movie?.id}`} className="bg-white text-black px-8 py-2 rounded-lg font-bold hover:bg-opacity-80">
        ▶ Play
      </Link>
    </div>
  </div>
  )
}

export default Hero