import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import GlobalSearch from "../Search/GlobalSearch";
import "./Header.scss";

const Header = ({ setModalType, setModalData }) => {
  return (
    <header className="app-header">
      <div className="header-inner">
        <Link to="/" className="logo">
          <img src={logo} alt="Rick y Morty Logo" />
        </Link>

        <GlobalSearch
          onSelect={(type, data) => {
            setModalType(type);
            setModalData(data);
          }}
        />

        <nav className="nav">
          <Link to="/" className="nav-link">
            Personajes
          </Link>
          <Link to="/episodios" className="nav-link">
            Episodios
          </Link>
          <Link to="/lugares" className="nav-link">
            Lugares
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
