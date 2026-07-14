import React, { useState } from "react";
import { Link } from "react-router-dom";

const sections = [
  { label: "Inicio", path: "/", icon: "🏠" },
  { label: "Observatorio", path: "/observatorio", icon: "📊" },
  { label: "Exploración", path: "/exploracion", icon: "🔍" },
  { label: "Machine Learning", path: "/ml", icon: "🤖" },
  { label: "Hallazgos", path: "/insights", icon: "💡" },
  { label: "Reportes", path: "/reportes", icon: "📄" },
  { label: "Acerca", path: "/acerca", icon: "ℹ️" },
];

export default function SideNav() {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className={`side-nav ${expanded ? "" : "collapsed"}`}>
      <div className="side-nav-header">
        <div className="side-nav-brand">
          <img src="/logo-cm-ia.jpeg" alt="CM IA" />
          <div>
            <strong>CM IA</strong>
            <small>Observatorio IA</small>
          </div>
        </div>
        <button
          type="button"
          className="side-nav-toggle"
          onClick={() => setExpanded((current) => !current)}
          aria-label={expanded ? "Cerrar menú lateral" : "Abrir menú lateral"}
        >
          {expanded ? "«" : "»"}
        </button>
      </div>
      <nav className="side-nav-links">
        {sections.map((section) => (
          <Link key={section.path} to={section.path} className="side-nav-link">
            <span className="side-nav-icon">{section.icon}</span>
            <span className="side-nav-text">{section.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
