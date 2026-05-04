import { useState } from "react";
import "./App.scss";
import { useRickAndMorty } from "./hooks/useRickAndMorty";

import Characters from "./components/Characters/Characters";
import Episodes from "./components/Episodes/Episodes";
import Locations from "./components/Locations/Locations";

import { Container } from "react-bootstrap";
import Loading from "./components/common/Loading";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

import Modal from "./components/Modal/Modal";
import CharacterModal from "./components/Modal/CharacterModal";
import EpisodeModal from "./components/Modal/EpisodeModal";
import LocationModal from "./components/Modal/LocationModal";

import { Routes, Route } from "react-router-dom";

function App() {
  // 🔥 modal único
  const [modalType, setModalType] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  const { getEpisode, getCharacter, getLocation } = useRickAndMorty();

  // 🔥 abrir personaje directo
  const openCharacterModal = (character) => {
    setModalType("character");
    setModalData(character);
  };

  // 🔥 ir a episodio
  const fetchEpisode = async (url) => {
    setModalLoading(true);

    try {
      const data = await getEpisode(url);
      setModalData(data);
      setModalType("episode"); // 👈 después
    } catch (e) {
      console.error(e);
    } finally {
      setModalLoading(false);
    }
  };

  const fetchLocation = async (url) => {
    if (!url) return;

    setModalLoading(true);
    setModalType("location");

    try {
      const data = await getLocation(url);
      setModalData(data);
    } catch (e) {
      console.error(e);
    } finally {
      setModalLoading(false);
    }
  };

  // 🔥 volver a personaje
  const fetchCharacter = async (url) => {
    setModalLoading(true);
    setModalType("character");

    const data = await getCharacter(url);
    if (!data) return;

    setModalData(data);
    setModalLoading(false);
  };

  const closeModal = () => {
    setModalType(null);
    setModalData(null);
    setModalLoading(false);
  };

  return (
    <Container fluid className="App">
      <Header setModalType={setModalType} setModalData={setModalData} />

      <Routes>
        <Route path="/" element={<Characters onOpen={openCharacterModal} />} />

        <Route
          path="/episodios"
          element={<Episodes onOpen={(ep) => fetchEpisode(ep.url)} />}
        />

        <Route
          path="/lugares"
          element={<Locations onOpen={(loc) => fetchLocation(loc.url)} />}
        />
      </Routes>

      <Footer />

      {/* 🔥 MODAL ÚNICO */}
      <Modal estado={!!modalType} cambiarEstado={closeModal}>
        {modalLoading ? (
          <Loading />
        ) : modalType === "character" ? (
          <CharacterModal
            character={modalData}
            onEpisodeClick={fetchEpisode}
            onLocationClick={fetchLocation}
          />
        ) : modalType === "episode" ? (
          <EpisodeModal episode={modalData} onCharacterClick={fetchCharacter} />
        ) : modalType === "location" ? (
          <LocationModal
            location={modalData}
            onCharacterClick={fetchCharacter}
          />
        ) : null}
      </Modal>
    </Container>
  );
}

export default App;
