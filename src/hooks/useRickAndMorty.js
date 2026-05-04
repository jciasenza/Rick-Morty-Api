import { useState, useCallback, useRef } from "react";

const BASE_URL = "https://rickandmortyapi.com/api";

export const useRickAndMorty = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔥 cache global en memoria
  const cache = useRef(new Map());

  const fetchData = useCallback(async (url) => {
    // 🔥 si ya está cacheado → no fetch
    if (cache.current.has(url)) {
      return cache.current.get(url);
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(url.startsWith("http") ? url : `${BASE_URL}${url}`);
      const data = await res.json();

      // guardar en cache
      cache.current.set(url, data);

      return data;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getCharacters = useCallback((page = 1, name = "") => {
    const query = name
      ? `/character?name=${encodeURIComponent(name)}&page=${page}`
      : `/character?page=${page}`;

    return fetchData(query);
  }, [fetchData]);

  const getEpisode = useCallback((url) => {
    return fetchData(url);
  }, [fetchData]);

  const getLocation = useCallback((url) => {
    return fetchData(url);
  }, [fetchData]);

  const getCharacter = useCallback((url) => {
    return fetchData(url);
  }, [fetchData]);

  const getMultipleCharacters = useCallback(async (urls = []) => {
    if (!urls.length) return [];

    const ids = urls.map((url) => url.split("/").pop()).join(",");
    const endpoint = `${BASE_URL}/character/${ids}`;

    return fetchData(endpoint).then((data) =>
      Array.isArray(data) ? data : [data]
    );
  }, [fetchData]);

  return {
    loading,
    error,
    getCharacters,
    getEpisode,
    getCharacter,
    getMultipleCharacters,
    getLocation,
  };
};