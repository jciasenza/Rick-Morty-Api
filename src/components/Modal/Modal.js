import { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Modal = ({ estado, cambiarEstado, children }) => {
  const [visible, setVisible] = useState(estado);

  useEffect(() => {
    if (estado) {
      setVisible(true);
    } else {
      const timeout = setTimeout(() => setVisible(false), 200);
      return () => clearTimeout(timeout);
    }
  }, [estado]);

  if (!visible) return null;

  return (
    <Overlay
      className={estado ? "open" : "close"}
      onClick={() => cambiarEstado(false)}
    >
      <ContenedorModal
        className={estado ? "open" : "close"}
        onClick={(e) => e.stopPropagation()}
      >
        <ContentWrapper key={estado}>
          {children}
          <BotonCerrar onClick={() => cambiarEstado(false)}>X</BotonCerrar>
        </ContentWrapper>
      </ContenedorModal>
    </Overlay>
  );
};

export default Modal;

/* STYLES */

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;

  opacity: 0;
  transition: opacity 0.2s ease;

  &.open {
    opacity: 1;
  }

  &.close {
    opacity: 0;
  }
`;

const ContenedorModal = styled.div`
  width: min(980px, 100%);
  max-height: 90vh;
  background: #111;
  border-radius: 24px;
  position: relative;
  overflow: hidden;

  transform: scale(0.95);
  opacity: 0;
  transition: all 0.25s ease;

  &.open {
    transform: scale(1);
    opacity: 1;
  }

  &.close {
    transform: scale(0.95);
    opacity: 0;
  }
`;

const BotonCerrar = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;
  border: none;
  background: none;
  border-radius: 50%;
  color: red;
  cursor: pointer;

  &:hover {
    background: red;
    color: #fff;
  }
`;

const ContentWrapper = styled.div`
  animation: fadeIn 0.25s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

/* PROP TYPES */

Modal.propTypes = {
  estado: PropTypes.bool.isRequired,
  cambiarEstado: PropTypes.func.isRequired,
  children: PropTypes.node,
};
