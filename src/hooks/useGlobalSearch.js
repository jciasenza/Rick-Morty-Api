import { useState, useEffect } from "react";

export const useGlobalSearch = (query) => {
  const [results, setResults] = useState({
    characters: [],
    episodes: [],
    locations: [],
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults({ characters: [], episodes: [], locations: [] });
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);

      try {
        const [chars, eps, locs] = await Promise.all([
          fetch(`https://rickandmortyapi.com/api/character/?name=${query}`).then(r => r.json()),
          fetch(`https://rickandmortyapi.com/api/episode/?name=${query}`).then(r => r.json()),
          fetch(`https://rickandmortyapi.com/api/location/?name=${query}`).then(r => r.json()),
        ]);

        setResults({
          characters: chars.results || [],
          episodes: eps.results || [],
          locations: locs.results || [],
        });
      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    }, 400); // 🔥 debounce

    return () => clearTimeout(timeout);
  }, [query]);

  return { results, loading };
};