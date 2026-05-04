import { useState, useMemo } from "react";
import { Container, Row } from "react-bootstrap";
import { useFetch } from "../../hooks/useFetch";
import Pagination from "../../components/Pagination/Pagination";
import Loading from "../../components/common/Loading";
import Episode from "./Episode";

const Episodes = ({ onOpen }) => {
  const [page, setPage] = useState(1);

  const endpoint = useMemo(() => {
    return `episode?page=${page}`;
  }, [page]);

  const { data = {}, loading, error } = useFetch(endpoint);
  const { results: episodes = [], info = {} } = data;

  if (loading) return <Loading />;
  if (error) return <h3>Error cargando episodios</h3>;

  return (
    <Container>
      <Row className="justify-content-center">
        <Episode episodes={episodes} onOpen={onOpen} />
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
export default Episodes;