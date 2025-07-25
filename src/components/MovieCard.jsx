import WatchedList from "./WatchedList";

function MovieCard({
  movie,
  i,
  onAddWatchedMovie,
  WatchedList,
  onHandleRemoveMovie,
}) {
  const baseUrl = "https://image.tmdb.org/t/p/";
  const size = "w500";
  const imgUrl = `${baseUrl}${size}${movie.poster_path}`;

  return (
    movie && (
      <div className="bg-slate-500 flex m-4 rounded-3xl mt-2 relative" key={i}>
        <div className="aspect-[2/3] max-w-16">
          <img
            src={imgUrl}
            className="object-cover w-full h-full rounded-xl"
            alt="Movie Poster"
          />
        </div>

        <div className="flex flex-col ml-6">
          <h3 className="text-white font-semibold pr-4">
            {movie.original_title}
          </h3>
          <div className="flex items-center mt-6">
            <span className="text-yellow-100">
              {typeof movie.vote_average === "number"
                ? movie.vote_average.toFixed(1)
                : "N/A"}
              /10
            </span>
            <span className="text-white ml-2">{movie.runtime} min</span>
          </div>
        </div>
        {WatchedList ? (
          <button
            onClick={() => onHandleRemoveMovie(movie)}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            &#128465;
          </button>
        ) : (
          <button
            onClick={() => onAddWatchedMovie(movie)}
            className="font-bold text-white text-2xl absolute right-4 top-1/2 -translate-y-1/2"
          >
            +
          </button>
        )}
      </div>
    )
  );
}

export default MovieCard;
