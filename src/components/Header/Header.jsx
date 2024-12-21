import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/" className="logo-link">
          Secret Santa
        </Link>
      </div>
      <nav className="nav-links">
        <Link to="/menu" className="nav-button">
          Menu
        </Link>
        <Link to="/itinerary" className="nav-button">
          Itinerary
        </Link>
      </nav>
    </header>
  );
};

export default Header;
