import { useEffect } from "react";

export function useKey(key, action) {
    // close the movie with escape key pressed
    useEffect(() => {
        const callback = (e) => {
            if (e.code.toLowerCase() === key.toLowerCase()) action();
        };
        document.addEventListener("keydown", callback);

        return () => {
            document.removeEventListener("keydown", callback);
        };
    }, [key, action]);
}
