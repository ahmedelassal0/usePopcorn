import { useState } from "react";
import { useMovies } from "./../hooks/useMovies";
import { useLocalStorageState } from "./../hooks/useLocalStorageState";
import { Nav } from "./Nav";
import { SearchBar, NumResults } from "./SearchBar";
import { Box } from "./Box";
import { MoviesList } from "./MoviesList";
import { WatchedList, WatchedSummary } from "./WatchedList";
import { Main } from "./Main";
import { Loader } from "./Loader";
import { ErrorMessage } from "./ErrorMessage";
import { SelectedMovie } from "./SelectedMovie";

function Tag({ setTag }) {
    return (
        <div className="arabic">
            <span role="button" onClick={() => setTag((tag) => false)}>
                &times;
            </span>
            الأفلام والمسلسلات تحتوي على عدد كبير من المخالفات الشرعية وهذا
            التطبيق ليس إقرارًا لها ولكن لمجرد التدريب
        </div>
    );
}
export default function App() {
    const [tag, setTag] = useState(true);
    const [query, setQuery] = useState("");
    const [selectedId, setSelectedId] = useState(null);

    const { movies, isLoading, error } = useMovies(query);
    const [watched, setWatched] = useLocalStorageState([], "watched");
    function handleSetSelectedId(id) {
        setSelectedId((currId) => (currId === id ? null : id));
    }

    function resetSelectedId() {
        setSelectedId(null);
    }

    function handleAddWatched(watchedMovie) {
        setWatched([...watched, watchedMovie]);
    }

    function handleDeleteMovie(id) {
        setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
    }

    return (
        <>
            {tag && <Tag setTag={setTag} />}
            <Nav>
                <SearchBar query={query} setQuery={setQuery} />
                <NumResults movies={movies} />
            </Nav>
            <Main>
                <Box>
                    {/* {isLoading ? <Loader /> : <MoviesList movies={movies} />} */}
                    {error && <ErrorMessage message={error} />}
                    {isLoading && <Loader />}
                    {!error && !isLoading && (
                        <MoviesList
                            movies={movies}
                            handleSetSelectedId={handleSetSelectedId}
                        />
                    )}
                </Box>
                <Box>
                    {selectedId ? (
                        <SelectedMovie
                            selectedId={selectedId}
                            closeMovie={resetSelectedId}
                            onAddWatched={handleAddWatched}
                            watched={watched}
                        />
                    ) : (
                        <>
                            <WatchedSummary watched={watched} />
                            <WatchedList
                                watched={watched}
                                onDeleteMovie={handleDeleteMovie}
                            />
                        </>
                    )}
                </Box>
            </Main>
        </>
    );
}
