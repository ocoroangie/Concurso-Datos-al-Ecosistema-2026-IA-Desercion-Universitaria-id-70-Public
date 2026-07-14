import { useEffect, useState } from "react";
import api from "../services/api";
import KpiCard from "../components/KpiCard";
import FilterBar from "../components/FilterBar";
import ChartCard from "../components/ChartCard";
import AiStatus from "../components/AiStatus";
import InsightCard from "../components/InsightCard";
import DashboardGrid from "../components/DashboardGrid";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const mockKpis = {
  total_records: 0,
  total_datasets: 1,
  total_programs: 0,
  model: "RandomForest v1.0",
  last_update: "—",
};

const trendData = [
  { period: "2024-I", value: 1200 },
  { period: "2024-II", value: 1500 },
  { period: "2025-I", value: 1800 },
  { period: "2025-II", value: 2200 },
  { period: "2026-I", value: 2756 },
];

const pieData = [
  { name: "Académica", value: 5200 },
  { name: "No académica", value: 7256 },
];

const programData = [
  { program: "Ing. Sistemas", value: 3400 },
  { program: "Administración", value: 2100 },
  { program: "Psicología", value: 1600 },
  { program: "Otros", value: 6356 },
];

const variablesImportance = [
  { name: "Asistencia", value: 0.28 },
  { name: "Promedio", value: 0.24 },
  { name: "Edad", value: 0.14 },
  { name: "Pertinencia", value: 0.09 },
  { name: "Ingresos", value: 0.08 },
  { name: "Otros", value: 0.17 },
];

function Observatorio() {
  const [filters, setFilters] = useState({
    period: "2026-I",
    university: "TUNJA",
    program: "",
    type: "",
  });
  const [applied, setApplied] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [aiStatus, setAiStatus] = useState({
    trained: false,
    model: "Not available",
    dataset: "No dataset",
    features: [],
    metrics: { accuracy: 0 },
    last_run: "—",
  });

  useEffect(() => {
    api
      .get("/dashboard")
      .then((response) => {
        setDashboardData(response.data);
        setAiStatus((current) => ({
          ...current,
          trained: response.data.model === "trained",
          model: response.data.model || "No model",
          dataset: response.data.path || "Dataset cargado",
          features: response.data.columns || [],
        }));
      })
      .catch((error) => {
        console.error("No se pudo cargar el dashboard:", error);
      });
  }, []);

  const applyFilters = () => {
    setApplied(true);
  };
  const clearFilters = () => {
    setFilters({ period: "", university: "", program: "", type: "" });
    setApplied(false);
  };

  return (
    <main className="page observatory-page">
      <section className="observatory-header">
        <div>
          <h1 className="hero-title">
            Observatorio de Deserción Universitaria
          </h1>
          <p className="hero-description">
            KPIs, visualizaciones y hallazgos generados por IA.
          </p>
        </div>
        <div className="observatory-time">Hora: 14:30</div>
      </section>

      <section className="kpi-row">
        <KpiCard
          icon="👨‍🎓"
          value={dashboardData?.total_records != null ? dashboardData.total_records.toLocaleString() : "Cargando..."}
          label="Total registros analizados"
          delta=""
        />
        <KpiCard
          icon="📂"
          value={dashboardData ? 1 : "Cargando..."}
          label="Total de datasets"
          delta=""
        />
        <KpiCard
          icon="🏫"
          value={dashboardData ? dashboardData.total_programs?.toLocaleString() ?? "—" : "Cargando..."}
          label="Total programas/instituciones"
          delta=""
        />
        <KpiCard
          icon="🤖"
          value={dashboardData?.model ?? "Cargando..."}
          label="Modelo de IA utilizado"
          delta={aiStatus.trained ? "Activo" : "Inactivo"}
        />
        <KpiCard
          icon="📅"
          value={dashboardData ? dashboardData.last_update ?? "—" : "Cargando..."}
          label="Última actualización"
          delta=""
        />
      </section>

      <FilterBar
        filters={filters}
        setFilters={setFilters}
        onApply={applyFilters}
        onClear={clearFilters}
      />

      <DashboardGrid>
        <div className="col">
          <ChartCard title="Tendencia de la deserción">
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={trendData}>
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Comparación por programa">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={programData}>
                <XAxis dataKey="program" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <div className="col">
          <ChartCard title="Distribución por tipo de deserción">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                  fill="#8884d8"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 0 ? "#2563eb" : "#38bdf8"}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Variables con mayor influencia">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={variablesImportance} layout="vertical">
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Bar dataKey="value" fill="#2dd4bf" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </DashboardGrid>

      <section className="ai-area">
        <div className="left">
          <AiStatus status={aiStatus} />
        </div>
        <div className="right">
          <h3>Hallazgos Inteligentes</h3>
          <div className="insights">
            <InsightCard
              title="Concentración por periodo"
              text="La mayor concentración de deserción corresponde al periodo 2026-I."
            />
            <InsightCard
              title="Programas con mayor deserción"
              text="Los programas con mayor porcentaje son: Ing. Sistemas, Administración."
            />
            <InsightCard
              title="Variables con mayor impacto"
              text="Promedio académico y asistencia muestran el mayor impacto en la predicción."
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Observatorio;
