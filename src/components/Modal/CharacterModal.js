import { Card } from "react-bootstrap";
import {
  CardBody,
  ModalGrid,
  PosterCard,
  PosterLabel,
  DetailCard,
  CharacterStatus,
  InfoRow,
  InfoLabel,
  InfoValue,
  EpisodeList,
  EpisodeItem,
} from "./ModalStyles";
import PropTypes from "prop-types";

const CharacterModal = ({ character, onEpisodeClick, onLocationClick }) => {
  if (!character) return null;

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString();
  };

  const getEpisodeId = (url) => url.split("/").pop();

  return (
    <ModalGrid>
      <PosterCard>
        <Card.Img src={character.image} />
        <PosterLabel>Rick & Morty</PosterLabel>
      </PosterCard>

      <DetailCard>
        <Card.Header>
          <Card.Title>{character.name}</Card.Title>
          <hr />
          <CharacterStatus status={character.status}>
            {character.status}
          </CharacterStatus>
        </Card.Header>

        <CardBody>
          <InfoRow>
            <InfoLabel>ID</InfoLabel>
            <InfoValue>{character.id}</InfoValue>
          </InfoRow>

          <InfoRow>
            <InfoLabel>Especie</InfoLabel>
            <InfoValue>{character.species}</InfoValue>
          </InfoRow>

          <InfoRow>
            <InfoLabel>Género</InfoLabel>
            <InfoValue>{character.gender}</InfoValue>
          </InfoRow>

          <InfoRow>
            <InfoLabel>Origen</InfoLabel>
            <InfoValue
              style={{ cursor: "pointer", color: "#f5c518" }}
              onClick={() => onLocationClick?.(character.origin?.url)}
            >
              {character.origin?.name}
            </InfoValue>
          </InfoRow>

          <InfoRow>
            <InfoLabel>Ubicación</InfoLabel>
            <InfoValue
              style={{ cursor: "pointer", color: "#f5c518" }}
              onClick={() => onLocationClick?.(character.location?.url)}
            >
              {character.location?.name}
            </InfoValue>
          </InfoRow>

          <InfoRow>
            <InfoLabel>Creado</InfoLabel>
            <InfoValue>{formatDate(character.created)}</InfoValue>
          </InfoRow>

          <InfoRow>
            <InfoLabel>Episodios</InfoLabel>
            <InfoValue>{character.episode?.length}</InfoValue>
          </InfoRow>

          <InfoRow style={{ flexDirection: "column", alignItems: "center" }}>
            <InfoLabel>Listado de episodios</InfoLabel>

            <EpisodeList>
              {character.episode?.map((ep) => {
                const id = getEpisodeId(ep);

                return (
                  <EpisodeItem key={id} onClick={() => onEpisodeClick?.(ep)}>
                    Ep {id}
                  </EpisodeItem>
                );
              })}
            </EpisodeList>
          </InfoRow>
        </CardBody>
      </DetailCard>
    </ModalGrid>
  );
};

export default CharacterModal;

CharacterModal.propTypes = {
  character: PropTypes.object,
  onEpisodeClick: PropTypes.func,
  onLocationClick: PropTypes.func,
};
