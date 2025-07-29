import { useEffect } from "react";
import { useState } from "react";

export function useMovies(query) {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [ErrorMessage, setErrorMessage] = useState("");

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

  return [isLoading, movies, ErrorMessage];
}
