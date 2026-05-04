import { useState } from "react";
import { useGlobalSearch } from "../../hooks/useGlobalSearch";
import "./styles.scss";

const GlobalSearch = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const { results, loading } = useGlobalSearch(query);

  const hasResults =
    results.characters.length ||
    results.episodes.length ||
    results.locations.length;

  return (
    <div className="global-search">
      <input
        type="text"
        placeholder="Buscar personajes, episodios, lugares..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {query && (
        <div className="search-dropdown">
          {loading && <div className="search-loading">Buscando...</div>}

          {!loading && !hasResults && (
            <div className="search-empty">Sin resultados</div>
          )}

          {/* PERSONAJES */}
          {results.characters.slice(0, 5).map((c) => (
            <div
              key={c.id}
              className="search-item"
              onClick={() => onSelect("character", c)}
            >
              👤 {c.name}
            </div>
          ))}

          {/* EPISODIOS */}
          {results.episodes.slice(0, 5).map((e) => (
            <div
              key={e.id}
              className="search-item"
              onClick={() => onSelect("episode", e)}
            >
              🎬 {e.name}
            </div>
          ))}

          {/* LOCATIONS */}
          {results.locations.slice(0, 5).map((l) => (
            <div
              key={l.id}
              className="search-item"
              onClick={() => onSelect("location", l)}
            >
              🌍 {l.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;