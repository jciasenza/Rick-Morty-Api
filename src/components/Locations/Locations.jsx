import { useState, useMemo } from "react";
import { Container, Row } from "react-bootstrap";
import { useFetch } from "../../hooks/useFetch";
import Pagination from "../../components/Pagination/Pagination";
import Loading from "../../components/common/Loading";
import Location from "../Locations/Location";

const Locations = ({ onOpen }) => {
  const [page, setPage] = useState(1);

  const endpoint = useMemo(() => {
    return `location?page=${page}`;
  }, [page]);

  const { data = {}, loading, error } = useFetch(endpoint);
  const { results: locations = [], info = {} } = data;

  if (loading) return <Loading />;
  if (error) return <h3>Error cargando lugares</h3>;

  return (
    <Container>
      <Row className="justify-content-center">
        <Location locations={locations} onOpen={onOpen} />
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

export default Locations;