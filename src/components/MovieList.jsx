import MovieCard from "./MovieCard";

function MovieList({ movies, onAddWatchedMovie }) {
  return (
    <div className="bg-slate-600 w-1/2 h-full rounded-lg m-6 mt-10 py-2 relative">
      <h2 className="absolute [top:-28px] left-2 text-white font-bold ">
        Movies List:-
      </h2>
      {movies &&
        movies.map((movie, i) => (
          <MovieCard
            movie={movie}
            key={i}
            onAddWatchedMovie={onAddWatchedMovie}
          />
        ))}
    </div>
  );
}

export default MovieList;
