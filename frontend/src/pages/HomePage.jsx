import { Link } from "react-router-dom";

function HomePage() {
  return (
    <main className="hero-page">
      <section className="hero-card">
        <div className="hero-visual" aria-hidden="true">
          <div className="orb orb-one"></div>
          <div className="orb orb-two"></div>
          <div className="logo-frame">
            <img
              src="/logo-cm-ia.jpeg"
              alt="Logo EduPredict IA"
              className="hero-logo"
            />
          </div>
          <div className="panel">
            <span>Predicción</span>
            <strong>Educación</strong>
            <small>+ IA</small>
          </div>
        </div>
        <div className="hero-copy centered-copy">
          <p className="hero-description hero-title blue-underline">
            Desarrollar análisis estadísticos y de Machine Learning para
            comprender la deserción universitaria.
          </p>
          <div className="hero-description large-info">
            Concurso Datos al Ecosistema 2026
            <br />
            Categoría: Educación – Nivel Intermedio
          </div>
          <div className="hero-description large-info">
            Autores:
            <br />
            Angie Melissa Ocoro Hurtado
            <br />
            Juan Camilo Lopez Quintana
            <br />
            Universidad del Valle
          </div>
          <Link to="/observatorio" className="primary-btn">
            Comenzar
          </Link>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
