import { Link } from "react-router-dom";

function HomePage() {
  return (
    <main className="hero-page">
      <section className="hero-card hero-ai-card">
        <div className="hero-copy">
          <div className="eyebrow">Observatorio IA</div>
          <h1 className="hero-title">
            Inteligencia creativa para comprender la deserción universitaria.
          </h1>
          <p className="hero-description large-info">
            Plataforma innovadora que combina análisis oficial, visualizaciones estratégicas y predicción con modelos de IA.
          </p>
          <div className="hero-actions">
            <Link to="/observatorio" className="primary-btn hero-start">
              Explorar observatorio
            </Link>
          </div>
        </div>
        <aside className="hero-panel">
          <div className="panel-title">Lo que vas a encontrar</div>
          <ul className="panel-list">
            <li>Exploración profunda del dataset oficial</li>
            <li>Métricas de IA para deserción</li>
            <li>Hallazgos inteligentes listos para acción</li>
            <li>Reportes ejecutivos y visualizaciones</li>
          </ul>
          <div className="hero-chip">Diseño creativo · IA explicable · datos oficiales</div>
        </aside>
      </section>
    </main>
  );
}

export default HomePage;
