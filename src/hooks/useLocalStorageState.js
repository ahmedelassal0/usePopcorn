import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
    const [value, setValue] = useState(() => {
        const storedValue = JSON.parse(localStorage.getItem(key));
        return storedValue? storedValue : initialState;
    });

    // track watched array and add it to local storage
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value]);

    return [value, setValue];
}
