const Loading = () => {
  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <div className="text-center flex flex-col">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto" />
        <h2 className="text-white mt-4">Loading...</h2>
        <p className="text-zinc-400 dark:text-zinc-400">
          Your adventure is about to begin
        </p>
      </div>
    </div>
  );
};

export default Loading;
