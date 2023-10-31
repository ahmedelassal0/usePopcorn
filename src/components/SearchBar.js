import { useEffect, useRef } from "react";

export function SearchBar({ query, setQuery }) {
    const focusEl = useRef(null);

    // focus on the search bar right after the page mount
    useEffect(() => {
        focusEl.current.focus();
    });
    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            ref={focusEl}
        />
    );
}

export function NumResults({ movies }) {
    return (
        <p className="num-results">
            Found <strong>{movies.length}</strong> results
        </p>
    );
}