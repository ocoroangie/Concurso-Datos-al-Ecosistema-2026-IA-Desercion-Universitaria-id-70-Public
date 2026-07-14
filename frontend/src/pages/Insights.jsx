import { useEffect, useState } from "react";
import api from "../services/api";
import InsightCard from "../components/InsightCard";
import LoadingOverlay from "../components/LoadingOverlay";

export default function Insights() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/insights").then((response) => setData(response.data)).catch(console.error);
  }, []);

  if (!data) return <LoadingOverlay message="Cargando hallazgos inteligentes..." />;

  return (
    <main className="page observatory-page">
      <section className="page-header">
        <div>
          <h1 className="hero-title">Hallazgos Inteligentes</h1>
          <p className="hero-description">Conclusiones automáticas generadas por el análisis de datos oficiales.</p>
        </div>
      </section>

      <div className="insights">
        {data.insights.map((insight, index) => (
          <InsightCard key={index} title={insight.title} text={insight.description} />
        ))}
      </div>
    </main>
  );
}
