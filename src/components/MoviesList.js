import { SearchedMovie } from "./SearchedMovie";

export function MoviesList({ movies, handleSetSelectedId }) {
    return (
        <ul className="list list-movies">
            {movies?.map((movie) => (
                <SearchedMovie
                    movie={movie}
                    key={movie.imdbID}
                    handleSetSelectedId={handleSetSelectedId}
                />
            ))}
        </ul>
    );
}
