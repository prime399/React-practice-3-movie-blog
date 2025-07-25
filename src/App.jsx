import { useState } from "react";
import Navbar from "./components/Navbar";
import MovieList from "./components/MovieList";
import { useEffect } from "react";
import WatchedList from "./components/WatchedList";
import Loader from "./components/Loader";
import ErrorMessageComp from "./components/ErrorMessage";

function App() {
  const [movies, setMovies] = useState([]);
  // const [selectedMovie, setSelectedMovie] = useState([]);
  const [runtime, setRunTime] = useState(0);
  const [stars, setStars] = useState(0);
  const [toggle, setToggle] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [query, setQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(() => {
    const storedValue = localStorage.getItem("watched");
    if (storedValue) {
      return JSON.parse(storedValue);
    } else {
      return [];
    }
  });

  useEffect(() => {
    handleRunTime(selectedMovie);
    handleStars(selectedMovie);
  }, [selectedMovie]);

  useEffect(() => {
    const Controller = new AbortController();

    async function getMovies() {
      setIsLoading(true);
      setErrorMessage("");
      try {
        const url = `${
          import.meta.env.VITE_TMDB_BASE_URL
        }/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
          },
          signal: Controller.signal,
        };
        const response = await fetch(url, options);
        const data = await response.json();

        if (data && data.results) {
          console.log(data.results);
          setMovies(data.results);
        } else {
          console.error("APi failed");
        }
      } catch (error) {
        console.error(error);
        if (error.name !== "AbortError") setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    getMovies();

    return function () {
      Controller.abort();
    };
  }, [query]);

  useEffect(() => {
    if (selectedMovie && selectedMovie.length > 0) {
      document.title = `Movie | ${
        selectedMovie[selectedMovie.length - 1].title
      }`;
    } else {
      document.title = "Movie";
    }

    return () => {
      document.title = "UsePopCorn";
    };
  }, [selectedMovie]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.code === "Escape") {
        setSelectedMovie((prevMovies) =>
          prevMovies.length > 1 ? prevMovies.slice(0, -1) : []
        );
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(selectedMovie));
    // return () => {};
  }, [selectedMovie]);

  function handleRunTime(selectedMovie) {
    if (selectedMovie) {
      let runtime = selectedMovie.reduce(
        (total, currentmovie) => total + currentmovie.runtime,
        0
      );
      setRunTime(runtime);
    }
  }

  function handleStars(selectedMovie) {
    if (selectedMovie) {
      let stars = selectedMovie.reduce(
        (totalStars, currentmovieStars) =>
          totalStars + currentmovieStars.vote_average,
        0
      );
      setStars(stars);
    }
  }

  function handleToggle() {
    setToggle(!toggle);
  }

  async function handleSelectedMovie(movieWatched) {
    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
        },
      };
      const WatchedMovieUrl = `${import.meta.env.VITE_TMDB_BASE_URL}/movie/${
        movieWatched?.id
      }?language=en-US`;
      const response = await fetch(WatchedMovieUrl, options);
      const movieData = await response.json();

      if (movieData) {
        console.log(movieData);

        setSelectedMovie((previousMovieWatched) => {
          const isMovieAlreadyAdded = previousMovieWatched.some(
            (movie) => movie.id === movieWatched.id
          );

          if (isMovieAlreadyAdded) {
            return previousMovieWatched;
          } else {
            return [...previousMovieWatched, movieData];
          }
        });
      } else {
        console.log(`Url:-${WatchedMovieUrl} `);
        throw new Error("Movie Data Retrieval Failed somehow!");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message);
    }
  }

  function handleRemoveWatchedMovie(movieToRemove) {
    setSelectedMovie((movieWatchedList) => {
      return movieWatchedList.filter((m) => m.id !== movieToRemove.id);
    });
  }

  return (
    <div className="bg-slate-900 w-full min-h-screen">
      <Navbar
        moviesNumber={movies.length}
        searchQuery={query}
        setSearchQuery={setQuery}
      />
      <section className="flex">
        {!isLoading && !ErrorMessage && (
          <MovieList movies={movies} onAddWatchedMovie={handleSelectedMovie} />
        )}

        {isLoading && <Loader />}

        {ErrorMessage && <ErrorMessageComp ErrorMessage={ErrorMessage} />}

        <WatchedList
          selectedMovie={selectedMovie}
          runtime={runtime}
          stars={stars}
          toggle={toggle}
          onHandleToggle={handleToggle}
          onHandleRemoveMovie={handleRemoveWatchedMovie}
        />
      </section>
    </div>
  );
}

export default App;
