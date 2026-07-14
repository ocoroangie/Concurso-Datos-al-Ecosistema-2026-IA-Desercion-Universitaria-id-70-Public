import { useEffect, useState } from "react";
import api from "../services/api";
import StatCard from "../components/StatCard";
import ChartCard from "../components/ChartCard";
import FeatureImportance from "../components/FeatureImportance";
import ModelMetrics from "../components/ModelMetrics";
import LoadingOverlay from "../components/LoadingOverlay";
import { Button } from "@mui/material";

export default function MachineLearning() {
  const [modelData, setModelData] = useState(null);
  const [training, setTraining] = useState(false);

  useEffect(() => {
    api.get("/model").then((response) => setModelData(response.data)).catch(console.error);
  }, []);

  const handleTrain = async () => {
    setTraining(true);
    try {
      const response = await api.post("/model/train");
      setModelData((current) => ({ ...current, ...response.data, trained: true }));
    } catch (error) {
      console.error(error);
    } finally {
      setTraining(false);
    }
  };

  if (!modelData) return <LoadingOverlay message="Cargando métricas de Machine Learning..." />;

  return (
    <main className="page observatory-page">
      <section className="page-header">
        <div>
          <h1 className="hero-title">Machine Learning</h1>
          <p className="hero-description">Entrena y actualiza el modelo de deserción con datos oficiales.</p>
        </div>
      </section>

      <div className="stats-row">
        <StatCard title="Modelo" value="Random Forest" />
        <StatCard title="Estado" value={modelData.trained ? "Entrenado" : "Pendiente"} />
        <StatCard title="Registros usados" value={modelData.record_count || 0} />
        <StatCard title="Variables" value={modelData.feature_names?.length || 0} />
      </div>

      <div className="dashboard-grid">
        <ChartCard title="Feature Importance">
          <FeatureImportance items={modelData.feature_importance || []} />
        </ChartCard>
        <ChartCard title="Métricas de desempeño">
          <ModelMetrics metrics={modelData.metrics || {}} />
        </ChartCard>
      </div>

      <div className="action-panel">
        <Button variant="contained" color="primary" onClick={handleTrain} disabled={training}>
          {training ? "Entrenando..." : "Entrenar Modelo"}
        </Button>
      </div>
    </main>
  );
}
