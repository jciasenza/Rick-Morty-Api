import { useState, useEffect } from "react";
import { useRickAndMorty } from "../../hooks/useRickAndMorty";
import { Card } from "react-bootstrap";
import {
  CardBody,
  DetailCard,
  InfoRow,
  InfoLabel,
  InfoValue,
  CharacterList,
  CharacterItem,
} from "./ModalStyles";

const LocationModal = ({ location, onCharacterClick }) => {
  const [charactersData, setCharactersData] = useState([]);
  const { getMultipleCharacters } = useRickAndMorty();

  useEffect(() => {
    if (!location?.residents?.length) {
      setCharactersData([]);
      return;
    }

    let cancelled = false;

    const loadCharacters = async () => {
      try {
        const data = await getMultipleCharacters(location.residents);

        if (!cancelled) {
          setCharactersData(data);
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) setCharactersData([]);
      }
    };

    loadCharacters();

    return () => {
      cancelled = true;
    };
  }, [location?.residents, getMultipleCharacters]);

  if (!location) return null;

  return (
    <CardBody>
      <DetailCard>
        <Card.Title>{location.name}</Card.Title>
        <hr />

        <InfoRow>
          <InfoLabel>Tipo</InfoLabel>
          <InfoValue>{location.type || "-"}</InfoValue>
        </InfoRow>

        <InfoRow>
          <InfoLabel>Dimensión</InfoLabel>
          <InfoValue>{location.dimension || "-"}</InfoValue>
        </InfoRow>

        <InfoRow>
          <InfoLabel>Total residentes</InfoLabel>
          <InfoValue>{location.residents?.length ?? 0}</InfoValue>
        </InfoRow>

        <InfoRow style={{ flexDirection: "column", alignItems: "center" }}>
          <InfoLabel>Residentes</InfoLabel>

          <CharacterList>
            {location.residents?.length === 0 ? (
              <span style={{ color: "#777" }}>
                No hay residentes
              </span>
            ) : charactersData.length === 0 ? (
              <span style={{ color: "#aaa" }}>
                Cargando...
              </span>
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

export default LocationModal;