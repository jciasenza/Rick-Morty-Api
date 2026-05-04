import { useState, useMemo } from "react";
import { Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { useFetch } from "../../hooks/useFetch";
import Character from "./Character";
import Loading from "../common/Loading";
import { Container } from "react-bootstrap";
import Pagination from "../Pagination/Pagination";

const Characters = ({ onOpen, searchTerm }) => {
  const [page, setPage] = useState(1);

  const endpoint = useMemo(() => {
    if (searchTerm) {
      return `character?name=${encodeURIComponent(searchTerm)}&page=${page}`;
    }
    return `character?page=${page}`;
  }, [page, searchTerm]);

  const { data = {}, loading, error } = useFetch(endpoint);
  const { results: characters = [], info = {} } = data;

  if (loading) return <Loading />;
  if (error) return <h3>Error cargando personajes</h3>;

  return (

    <Container>
    <Row className="justify-content-center">
      {characters.map((character) => (
        <Character
          key={character.id}
          {...character}
          onOpen={() => onOpen(character)}
        />
      ))}
    </Row>

     <Pagination
        currentPage={page}
        totalPages={info?.pages ?? 1}
        onPrevious={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => Math.min(info.pages, p + 1))}
        onPage={setPage}
      />
      </Container>
  );
};

Characters.propTypes = {
  onOpen: PropTypes.func.isRequired,
  searchTerm: PropTypes.string,
};

export default Characters;