import MovieCard from "./MovieCard";

function WatchedList({
  selectedMovie,
  runtime,
  stars,
  toggle,
  onHandleToggle,
}) {
  return (
    <div className="bg-slate-600 w-1/2 h-full rounded-2xl m-6 mt-10 relative">
      <div className="bg-slate-500 h-6 text-white font-semibold ">
        Movies You have Watched
      </div>
      <button
        onClick={onHandleToggle}
        className="text-white bg-gray-400 absolute top-0 right-0 rounded-full w-6 h-6 flex items-center justify-center"
      >
        {toggle ? "-" : "+"}
      </button>
      {toggle && (
        <section className="">
          <div className="flex h-6 px-2 justify-between items-center ">
            <div className="text-white font-thin">
              🎥 {selectedMovie?.length} Movies
            </div>
            <div className="text-white font-thin">⭐ {stars.toFixed(1)}</div>
            <div className="text-white font-thin">⌛ {runtime} min</div>
          </div>
          {selectedMovie &&
            selectedMovie.map((movie, i) => (
              <MovieCard movie={movie} key={i} WatchedList={true} />
            ))}
        </section>
      )}
    </div>
  );
}

export default WatchedList;
