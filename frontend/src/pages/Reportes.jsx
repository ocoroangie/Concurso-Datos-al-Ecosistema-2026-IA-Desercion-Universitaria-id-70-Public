import { useEffect, useState } from "react";
import api from "../services/api";
import ReportCard from "../components/ReportCard";
import LoadingOverlay from "../components/LoadingOverlay";

export default function Reportes() {
  const [report, setReport] = useState(null);

  useEffect(() => {
    api.get("/report").then((response) => setReport(response.data)).catch(console.error);
  }, []);

  if (!report) return <LoadingOverlay message="Cargando reportes..." />;

  const findings = report.findings || report.reports || [];

  return (
    <main className="page observatory-page">
      <section className="page-header">
        <div>
          <h1 className="hero-title">Reportes</h1>
          <p className="hero-description">Documentación ejecutiva y resultados listos para presentación.</p>
        </div>
      </section>

      <div className="reports-grid">
        {findings.map((item, index) => (
          <ReportCard
            key={index}
            title={item.title}
            value={item.value || item.summary || "Documento"}
            description={item.description || item.summary || "Resumen ejecutivo disponible."}
          />
        ))}
      </div>
    </main>
  );
}
