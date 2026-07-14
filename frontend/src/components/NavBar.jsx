import { useState } from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-logo">
          <img src="/logo-cm-ia.jpeg" alt="CM IA" />
        </Link>
      </div>
      <button
        className={`nav-menu-button ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen((current) => !current)}
        aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
      >
        <span />
        <span />
        <span />
      </button>
      <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>
          Inicio
        </Link>
        <Link to="/observatorio" onClick={() => setMenuOpen(false)}>
          Observatorio
        </Link>
        <Link to="/exploracion" onClick={() => setMenuOpen(false)}>
          Exploración
        </Link>
        <Link to="/ml" onClick={() => setMenuOpen(false)}>
          Machine Learning
        </Link>
        <Link to="/insights" onClick={() => setMenuOpen(false)}>
          Hallazgos
        </Link>
        <Link to="/reportes" onClick={() => setMenuOpen(false)}>
          Reportes
        </Link>
        <Link to="/acerca" onClick={() => setMenuOpen(false)}>
          Acerca
        </Link>
      </nav>
    </header>
  );
}
