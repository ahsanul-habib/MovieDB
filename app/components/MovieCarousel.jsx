import Image from "next/image";
import Link from "next/link";

const MovieCarousel = ({ title, movieList }) => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div id="trendingMovies" className="flex space-x-4 overflow-x-auto pb-4">
        {movieList.map((movie) => (
          <div
            key={movie.id}
            className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform"
          >
            <Link href={`/movie/${movie.id}`}>
              <Image
                src={
                  movie?.poster_path
                    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                    : "/placeholder.jpg"
                }
                height={500}
                width={300}
                alt={movie.id}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/2wBDAAoHBwkJCBwYFB8cHB0dGx0dGh0eH1sYFhwgIisgJCkpLCAmLyUoKzM7Jz8xKy8yQy9dPz0ePz4fTj4sXlBF/2wBDAQwMDC8vKy8zM4+0QQD/xAAQAAEBAQEAAAAAAAAAAAAAAAAAAQID/8QAFxABAAICAgIDBQAAAAAAAAAAAQIDBBESIQMTQVFhBhMicpGh8AInEjIkM2JxwdHhFTKCkRMzQlKSj/QD/8QAGwEBAAICAwUFAwUAAAAAAAABAgMEEQUSIQMhMUEGE1FhEyJxFDKBkaEII0JygfAjMoLR8fEJ0jN0f/2gAMAwEAAwEBAQEBAQEAAAAAAAAAAAECAwQFBgcICQo0VmoAXD/2gAIAwEAAwEBAQEBAQEAAAAAAAMFBggICQo1Vmq9A88SBgfnOAz2fbXYy3zYtKxxnL1EwOoVsqpPqFV+3zrlhlgQOZpxj8mqsazYI1llX3h60Yxl7bo5buD+dfGnO6hP0g=="
                className="w-full rounded-lg"
              />
              <div className="mt-2">
                <h3 className="text-light text-sm font-bold truncate">
                  {movie?.title}
                </h3>
                <p className="text-primary text-xs">
                  {movie?.release_date?.slice(0, 4)}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MovieCarousel;
