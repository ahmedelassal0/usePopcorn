import { useEffect, useState } from "react";
const key = process.env.REACT_APP_OMDB_KEY;

export function useMovies(query) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(
        function () {
            const controller = new AbortController();
            async function fetchMovies() {
                try {
                    // reset error to null
                    setError("");

                    // set isLoading to true
                    setIsLoading(true);

                    // 1) fetch the data
                    const res = await fetch(
                        `http://www.omdbapi.com/?apikey=${key}&s=${query}`,
                        { signal: controller.signal }
                    );

                    // handle no response received error
                    if (!res.ok) {
                        throw new Error("connection error");
                    }

                    const data = await res.json();

                    // handle no data received error
                    if (data.Response === "False") {
                        throw new Error("No movie found");
                    }

                    // 2) update state
                    setMovies(data.Search);
                } catch (err) {
                    if (err.name !== "AbortError") {
                        if (query.length > 3) setError(err.message);
                    }
                } finally {
                    // set isLoading to false
                    setIsLoading(false);
                }
            }

            // reset the movies to empty if user deleted searched movie
            if (!query.length) setMovies([]);
            fetchMovies();

            return () => {
                controller.abort();
            };
        },
        [query]
    );

    return { movies, error, isLoading };
}
