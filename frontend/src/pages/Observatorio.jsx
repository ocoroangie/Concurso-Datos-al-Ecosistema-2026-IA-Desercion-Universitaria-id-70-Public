import { useEffect, useState } from "react";

function Observatorio() {
  const [kpis, setKpis] = useState(null);

  useEffect(() => {
    // fetch KPIs from backend
    fetch('/api/dashboard')
      .then(res => res.json())
      .then(setKpis)
      .catch(() => setKpis({}));
  }, []);

  return (
    <main className="hero-page">
      <section className="hero-card">
        <div className="hero-copy">
          <h1 className="hero-title">Observatorio de Deserción</h1>
          <p className="hero-description">KPIs y visualizaciones interactivas.</p>
          <div style={{display: 'grid', gap: 12, marginTop: 20}}>
            <div className="panel">
              <strong>Total registros</strong>
              <div>{kpis?.total_records ?? '—'}</div>
            </div>
            <div className="panel">
              <strong>Total datasets</strong>
              <div>{kpis?.total_datasets ?? '—'}</div>
            </div>
            <div className="panel">
              <strong>Total variables</strong>
              <div>{kpis?.total_variables ?? '—'}</div>
            </div>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="orb orb-one"></div>
          <div className="orb orb-two"></div>
        </div>
      </section>
    </main>
  );
}

export default Observatorio;
