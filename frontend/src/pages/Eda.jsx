import { useEffect, useState } from "react";
import api from "../services/api";
import StatCard from "../components/StatCard";
import ChartCard from "../components/ChartCard";
import LoadingOverlay from "../components/LoadingOverlay";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export default function Eda() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/eda")
      .then((response) => setData(response.data))
      .catch((error) => console.error(error));
  }, []);

  if (!data) return <LoadingOverlay message="Cargando análisis exploratorio..." />;

  return (
    <main className="page observatory-page">
      <section className="page-header">
        <div>
          <h1 className="hero-title">Análisis Exploratorio</h1>
          <p className="hero-description">Visualiza tendencias, frecuencias y calidad del dataset.</p>
        </div>
      </section>

      <div className="stats-row">
        <StatCard title="Registros" value={data.total_records.toLocaleString()} />
        <StatCard title="Variables numéricas" value={data.numeric_columns.length} />
        <StatCard title="Variables categóricas" value={data.categorical_columns.length} />
        <StatCard title="Valores faltantes" value={Object.values(data.missing_values).reduce((sum, value) => sum + (value || 0), 0)} />
      </div>

      <div className="dashboard-grid">
        <ChartCard title="Top programas">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data.top_programs}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#34d399" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Top facultades">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data.top_faculties}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#60a5fa" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="dashboard-grid">
        <ChartCard title="Top sedes">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data.top_sedes}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#38bdf8" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Distribución por género">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={data.distribution_columns.GENERO || []} dataKey="value" nameKey="name" outerRadius={90}>
                {data.distribution_columns.GENERO?.map((item, index) => (
                  <Cell key={index} fill={index % 2 ? "#2563eb" : "#22d3ee"} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </main>
  );
}
