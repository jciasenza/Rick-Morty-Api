import { Col, Card, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import locationImg from "../../images/location.jpg"; // o tu logo

const Location = ({ locations, onOpen }) => {
  if (!locations?.length) return <h3>No hay lugares</h3>;

  return (
    <>
      {locations.map((loc) => (
        <Col
          md={3}
          sm={12}
          key={loc.id}
          className="character__separation card-visible"
        >
          <Card className="netflix-card">
            <div className="character-image-wrapper">
              <Card.Img variant="top" src={locationImg} />

              <div className="character-overlay">
                <Button
                  className="character-button"
                  onClick={() => onOpen(loc)}
                >
                  Ver lugar
                </Button>
              </div>
            </div>

            <Card.Body className="card-body-flex">
              <Card.Title className="card-title__color">
                {loc.name}
              </Card.Title>

              <div className="card-meta">{loc.type}</div>
              <div className="card-meta">{loc.dimension}</div>
              <div className="card-meta">
                {loc.residents?.length} residentes
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </>
  );
};

Location.propTypes = {
  locations: PropTypes.array,
  onOpen: PropTypes.func,
};

export default Location;