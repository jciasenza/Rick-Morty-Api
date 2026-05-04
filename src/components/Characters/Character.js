import { Col, Card, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const Character = ({ id, name, image, species, onOpen }) => {
  return (
    <Col md={3} sm={12} className="character__separation">
      <Card className="netflix-card">
        <div className="character-image-wrapper">
          <Card.Img variant="top" src={image} />

          <div className="character-overlay">
            <Button className="character-button" onClick={onOpen}>
              Ver detalle
            </Button>
          </div>
        </div>

        <Card.Body className="card-body-flex">
          <Card.Title className="card-title__color">
            {name}
          </Card.Title>
          <div className="card-meta">{species}</div>
        </Card.Body>
      </Card>
    </Col>
  );
};

Character.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  image: PropTypes.string,
  species: PropTypes.string,
  onOpen: PropTypes.func,
};

export default Character;