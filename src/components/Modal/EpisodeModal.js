import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import {
  CardBody,
  DetailCard,
  CharacterList,
  CharacterItem,
  InfoRow,
  InfoLabel,
  InfoValue,
} from "./ModalStyles";
import PropTypes from "prop-types";
import logo from "../../images/logo.png";
import { useRickAndMorty } from "../../hooks/useRickAndMorty";

const EpisodeModal = ({ episode, onCharacterClick }) => {
  const [charactersData, setCharactersData] = useState([]);
  const { getMultipleCharacters } = useRickAndMorty();

  useEffect(() => {
    if (!episode?.characters?.length) return;

    let cancelled = false;

    const loadCharacters = async () => {
      const data = await getMultipleCharacters(episode.characters);

      if (!cancelled) {
        setCharactersData(data);
      }
    };

    // 👇 evita refetch si ya hay data
    if (charactersData.length === 0) {
      loadCharacters();
    }

    return () => {
      cancelled = true;
    };
  }, [episode?.id, getMultipleCharacters]);

  if (!episode) return null;

  return (
    <CardBody>
      <img
        style={{ width: "50%", marginBottom: "10px" }}
        src={logo}
        alt="Rick y Morty Logo"
      />

      <DetailCard>
        <Card.Title>{episode.name}</Card.Title>
        <hr />

        <InfoRow>
          <InfoLabel>Episodio</InfoLabel>
          <InfoValue>{episode.episode}</InfoValue>
        </InfoRow>

        <InfoRow>
          <InfoLabel>Fecha de estreno</InfoLabel>
          <InfoValue>{episode.air_date}</InfoValue>
        </InfoRow>

        <InfoRow style={{ flexDirection: "column", alignItems: "center" }}>
          <InfoLabel>Personajes</InfoLabel>

          <CharacterList>
            {charactersData.length === 0 ? (
              <span style={{ color: "#aaa" }}>Cargando...</span>
            ) : (
              charactersData.map((char) => (
                <CharacterItem
                  key={char.id}
                  onClick={() => onCharacterClick?.(char.url)}
                >
                  {char.name}
                </CharacterItem>
              ))
            )}
          </CharacterList>
        </InfoRow>
      </DetailCard>
    </CardBody>
  );
};

EpisodeModal.propTypes = {
  episode: PropTypes.object,
  onCharacterClick: PropTypes.func,
};

export default EpisodeModal;
