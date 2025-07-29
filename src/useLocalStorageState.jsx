import { useEffect, useState } from "react";

export function useLocalStorageState(InitialState, key) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      return JSON.parse(storedValue);
    } else {
      return InitialState;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
    // return () => {};
  }, [value, key]);

  return [value, setValue];
}
