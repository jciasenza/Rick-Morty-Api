import { Col, Card, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import episode from "../../images/episodes.jpg";

const Episode = ({ episodes, onOpen }) => {
  if (!episodes?.length) return <h3>No hay episodios</h3>;

  return (
    <>
      {episodes.map((ep, index) => (
        <Col
          md={3}
          sm={12}
          key={ep.id}
          className="character__separation card-visible"
        >
          <Card className="netflix-card">
            <div className="character-image-wrapper">
              <Card.Img variant="top" src={episode} />

              <div className="character-overlay">
                <Button
                  className="character-button"
                  onClick={() => onOpen(ep)}
                >
                  Ver episodio
                </Button>
              </div>
            </div>

            <Card.Body className="card-body-flex">
              <Card.Title className="card-title__color">
                {ep.name}
              </Card.Title>

              <div className="card-meta">{ep.episode}</div>
              <div className="card-meta">{ep.air_date}</div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </>
  );
};

Episode.propTypes = {
  episodes: PropTypes.array,
  onOpen: PropTypes.func,
};

export default Episode;