import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <header className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-logo">
          <img src="/logo-cm-ia.jpeg" alt="CM IA" />
        </Link>
      </div>
      <nav className="nav-links">
        <Link to="/">Inicio</Link>
        <Link to="/observatorio">Observatorio</Link>
        <Link to="/exploracion">Exploración</Link>
        <Link to="/eda">EDA</Link>
        <Link to="/ml">Machine Learning</Link>
        <Link to="/insights">Hallazgos</Link>
        <Link to="/reportes">Reportes</Link>
        <Link to="/acerca">Acerca</Link>
      </nav>
    </header>
  );
}
