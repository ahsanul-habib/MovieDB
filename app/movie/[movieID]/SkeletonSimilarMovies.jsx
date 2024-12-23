export default function SkeletonTrendingMovies() {
    return (
      <section className="mb-8 animate-pulse text-gray-100 p-4 rounded-lg">
        <div className="h-6 bg-gray-700 rounded w-1/4 mb-4"></div>
        <div
          id="trendingMovies"
          className="flex space-x-4 overflow-x-auto pb-4"
        >
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-60 bg-gray-800 shadow-lg rounded-lg overflow-hidden"
            >
              <div className="h-80 bg-gray-700"></div>
              <div className="p-4 space-y-2">
                <div className="h-5 bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                <div className="h-3 bg-gray-700 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  