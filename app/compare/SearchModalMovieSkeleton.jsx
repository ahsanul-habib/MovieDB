const SearchModalMovieSkeleton = () => {
  return (
    <div className="flex items-center gap-4 p-2 cursor-default rounded animate-pulse">
      <div className="w-16 h-24 bg-gray-200 rounded" />
      <div className="flex flex-col gap-4">
        <div className="h-4 bg-gray-200 w-40 mx-2 rounded mb-1" />
        <div className="h-4 bg-gray-200 w-16 mx-2 rounded" />
      </div>
    </div>
  );
};

export default SearchModalMovieSkeleton;
