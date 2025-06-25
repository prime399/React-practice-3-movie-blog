import { useState } from "react";
import Navbar from "./components/Navbar";
import MovieList from "./components/MovieList";
import { useEffect } from "react";
import WatchedList from "./components/WatchedList";

function App() {
  const [movies, setMovies] = useState([]);

  const url =
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZTk1YmIyODkzMWQ5YmY3ODlmYzU4OGNkY2ViMTYzMSIsIm5iZiI6MTU4NTEyNjQ3Ni40ODEsInN1YiI6IjVlN2IxYzRjOWU0MDEyMDAxNTA0YTlmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EpJ2vliFBmRpdbWklIm8LToMEGJJg2PG4g_dP6T56YA",
    },
  };

  const [selectedMovie, setSelectedMovie] = useState([]);
  const [runtime, setRunTime] = useState(0);
  const [stars, setStars] = useState(0);
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    handleRunTime();
    handleStars();
  }, [selectedMovie]);

  useEffect(() => {
    async function getMovies() {
      try {
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
      }
    }

    getMovies();
  }, []);

  function handleRunTime() {
    let runtime = selectedMovie.reduce(
      (total, currentmovie) => total + currentmovie.runtime,
      0
    );
    setRunTime(runtime);
  }

  function handleStars() {
    let stars = selectedMovie.reduce(
      (totalStars, currentmovieStars) =>
        totalStars + currentmovieStars.vote_average,
      0
    );
    setStars(stars);
  }

  function handleToggle() {
    setToggle(!toggle);
  }

  async function handleSelectedMovie(movieWatched) {
    try {
      const WatchedMovieUrl = `https://api.themoviedb.org/3/movie/${movieWatched?.id}?language=en-US`;
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

        console.error("Movie Data Retrieval Failed somehow!");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="bg-slate-900 w-full min-h-screen">
      <Navbar moviesNumber={movies.length} />
      <section className="flex">
        <MovieList movies={movies} onAddWatchedMovie={handleSelectedMovie} />
        <WatchedList
          selectedMovie={selectedMovie}
          runtime={runtime}
          stars={stars}
          toggle={toggle}
          onHandleToggle={handleToggle}
        />
      </section>
    </div>
  );
}

export default App;
