import { useState, useCallback, useRef } from "react";

const BASE_URL = "https://rickandmortyapi.com/api";

export const useRickAndMorty = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔥 cache en memoria
  const cache = useRef(new Map());

  const fetchData = useCallback(async (url) => {
    const fullUrl = url.startsWith("http") ? url : `${BASE_URL}${url}`;

    // ✅ usar cache
    if (cache.current.has(fullUrl)) {
      return cache.current.get(fullUrl);
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(fullUrl);
      const data = await res.json();

      cache.current.set(fullUrl, data); // guardar en cache

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
    try {
      if (!urls.length) return [];

      const ids = urls.map((url) => url.split("/").pop()).join(",");

      const fullUrl = `${BASE_URL}/character/${ids}`;

      // ✅ cache también para múltiples
      if (cache.current.has(fullUrl)) {
        return cache.current.get(fullUrl);
      }

      const res = await fetch(fullUrl);
      const data = await res.json();

      const result = Array.isArray(data) ? data : [data];

      cache.current.set(fullUrl, result);

      return result;
    } catch (err) {
      console.error(err);
      return [];
    }
  }, []);

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