import { useEffect, useState } from "react";
import StarRating from "./../StarRating";
import { useKey } from "./../hooks/useKey";
import { Loader } from "./Loader";

const key = process.env.REACT_APP_OMDB_KEY
export function SelectedMovie({
    selectedId,
    closeMovie,
    onAddWatched,
    watched,
}) {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState(0);
    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre,
    } = movie;
    const isWatched = watched
        .map((movie) => movie.imdbID)
        ?.includes(selectedId);

    const currRating = watched.find(
        (movie) => movie.imdbID === selectedId
    )?.userRating;
    console.log(currRating);

    function addMovieToWatched() {
        const addedMovie = {
            imdbID: selectedId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime,
            userRating,
        };
        onAddWatched(addedMovie);
        closeMovie();
    }

    useKey("Escape", closeMovie);
    useEffect(() => {
        async function fetchMovie() {
            // turn on loading
            setIsLoading(true);

            const res = await fetch(
                `http://www.omdbapi.com/?apikey=${key}&i=${selectedId}`
            );
            const data = await res.json();
            setMovie(data);

            // turn off loading
            setIsLoading(false);
        }
        fetchMovie();
    }, [selectedId]);

    // change page title to selected movie
    useEffect(() => {
        document.title = `Movie | ${title}`;

        return () => {
            document.title = "usePopcorn";
        };
    }, [title]);

    return (
        <div className="details">
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <header>
                        <button className="btn-back" onClick={closeMovie}>
                            &larr;
                        </button>
                        <img src={poster} alt={`poster of ${movie}`} />
                        <div className="details-overview">
                            <h2>{title}</h2>
                            <p>
                                {released} &bull; {runtime}
                            </p>
                            <p>{genre}</p>
                            <p>
                                <span>⭐</span>
                                {imdbRating} imdb rating
                            </p>
                        </div>
                    </header>
                    <center>
                        <div className="rating">
                            {isWatched ? (
                                <p>
                                    You rated this movie <span>⭐</span>{" "}
                                    {currRating}
                                </p>
                            ) : (
                                <>
                                    <StarRating
                                        maxRating={10}
                                        fontSize={24}
                                        setExternalRating={setUserRating}
                                    />
                                    {userRating > 0 && (
                                        <button
                                            className="btn-add"
                                            onClick={addMovieToWatched}
                                        >
                                            Add to watch list
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                    </center>
                    <section>
                        <p>
                            <em>{plot}</em>
                        </p>
                        <p>staring {actors}</p>
                        <p>directed {director}</p>
                    </section>
                </>
            )}
        </div>
    );
}
