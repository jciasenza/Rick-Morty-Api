import styled from "styled-components";
import { Card } from "react-bootstrap";

export const ModalGrid = styled.div`
  display: grid;
  grid-template-columns: 320px 1fr;
  height: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const PosterCard = styled.div`
  position: relative;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const PosterLabel = styled.span`
  position: absolute;
  bottom: 16px;
  left: 16px;
  background: rgba(0, 0, 0, 0.7);
  color: #f5c518;
  padding: 6px 12px;
  font-size: 12px;
  border-radius: 8px;
  letter-spacing: 1px;
`;

export const DetailCard = styled(Card)`
  background:rgb(17, 17, 17);
  border: none;
  border-radius: 0;
  display: flex;
  flex-direction: column;

  .card-header {
    background: transparent;
    border-bottom: 1px solid #333;
    padding: 20px;
  }

  .card-title {
    margin: 0;
    font-size: 24px;
    color: #fff;
  }
`;

export const CharacterStatus = styled.span`
  display: inline-block;
  margin-top: 8px;
  padding: 4px 10px;
  font-size: 12px;
  border-radius: 12px;
  font-weight: bold;
  text-transform: uppercase;

  background: ${({ status }) => {
    if (status === "Alive") return "#1db954";
    if (status === "Dead") return "#e50914";
    return "#999";
  }};

  color: #fff;
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 14px;
  border-bottom: 1px solid #2a2a2a;
  padding-bottom: 16px;
`;

export const InfoLabel = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #aaa;
`;

export const InfoValue = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #aaa;
`;

export const Description = styled.p`
  margin-top: 20px;
  font-size: 14px;
  line-height: 1.5;
  color: #ccc;
`;

export const EpisodeList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
  justify-content: center;
  overflow-y: auto;
`;

export const EpisodeItem = styled.span`
  background: #222;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 12px;
  color: #f5c518;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #f5c518;
    color: #000;
  }
`;

export const CharacterList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
  justify-content: center;

  max-height: 250px;   /* 🔥 límite */
  overflow-y: auto;    /* 🔥 scroll */

  padding-right: 6px;  /* evita corte con scrollbar */

  /* scrollbar custom (opcional pro) */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #f5c518;
    border-radius: 10px;
  }
`;

export const CharacterItem = styled.button`
  background: #1e1e1e;
  color: #f5c518;
  border: none;
  border-radius: 12px;
  padding: 6px 10px;
  font-size: 12px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #f5c518;
    color: #111;
  }
`;

export const Chip = styled.button`
  background: #222;
  color: #f5c518;
  border: 1px solid rgba(245, 197, 24, 0.15);
  border-radius: 999px;
  padding: 6px 12px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  justify-content: center;

  &:hover {
    background: #f5c518;
    color: #111;
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.96);
  }
`;

export const CardBody = styled(Card.Body)`
  padding: 24px;
  overflow-y: auto;
  flex: 1;
`;
