import { useEffect, useState } from "react";
import api from "../services/api";
import StatCard from "../components/StatCard";
import DatasetTable from "../components/DatasetTable";
import ChartCard from "../components/ChartCard";
import LoadingOverlay from "../components/LoadingOverlay";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  CartesianGrid,
  LabelList,
} from "recharts";

export default function Exploracion() {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [error, setError] = useState(null);

  useEffect(() => {
    api.get("/exploration")
      .then((response) => setData(response.data))
      .catch((error) => {
        console.error(error);
        setError("No se pudo cargar la exploración. Verifique la conexión al backend.");
      });
  }, []);

  if (error)
    return (
      <main className="page observatory-page">
        <section className="page-header">
          <h1 className="hero-title">Exploración de Datos</h1>
          <p className="hero-description">{error}</p>
        </section>
      </main>
    );
  if (!data) return <LoadingOverlay message="Cargando exploración de datos..." />;

  const columns = data.columns.slice(0, 8);
  const rows = data.sample_rows.map((row) => Object.fromEntries(columns.map((col) => [col, row[col]])));
  const displayedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const totalRows = rows.length;

  return (
    <main className="page observatory-page">
      <section className="page-header">
        <div>
          <h1 className="hero-title">Exploración de Datos</h1>
          <p className="hero-description">Análisis detallado y visualizaciones interactivas del dataset.</p>
        </div>
      </section>

      <div className="stats-row">
        <StatCard title="Registros" value={data.summary.total_records.toLocaleString()} />
        <StatCard title="Columnas" value={data.summary.total_columns} />
        <StatCard title="Categorías" value={data.summary.categorical_variables} />
        <StatCard title="Numéricos" value={data.summary.numeric_variables} />
        <StatCard title="Faltantes" value={data.summary.missing_values} />
        <StatCard title="Duplicados" value={data.summary.duplicates} />
      </div>

      <div className="dashboard-grid">
        <ChartCard
          title="Distribución de registros por facultad"
          subtitle="Muestra la cantidad de registros asociados a cada facultad del dataset"
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.faculty_distribution} margin={{ top: 10, right: 0, left: 0, bottom: 10 }}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip formatter={(value) => [value, "Registros"]} />
              <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard
          title="Distribución de registros por programa"
          subtitle="Cuenta de registros para los programas con más estudiantes en el dataset"
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.program_distribution} margin={{ top: 10, right: 0, left: 0, bottom: 10 }}>
              <XAxis dataKey="name" tick={{ fontSize: 12, angle: -25, textAnchor: 'end' }} />
              <YAxis />
              <Tooltip formatter={(value) => [value, "Registros"]} />
              <Bar dataKey="value" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="dashboard-grid">
        <ChartCard
          title="Distribución por género"
          subtitle="Cantidad de registros por género en el dataset"
        >
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.gender_distribution}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                innerRadius={52}
                paddingAngle={6}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.gender_distribution.map((entry, index) => (
                  <Cell key={index} fill={index === 0 ? "#22c55e" : index === 1 ? "#38bdf8" : "#f97316"} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} formatter={(value) => `Género: ${value}`} />
              <Tooltip formatter={(value) => [value, "Registros"]} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard
          title="Distribución por estrato socioeconómico"
          subtitle="Número de registros clasificados por estrato en el dataset"
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.estrato_distribution} margin={{ top: 10, right: 0, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="name" tick={{ fontSize: 12, angle: -20, textAnchor: 'end' }} />
              <YAxis />
              <Tooltip formatter={(value) => [value, "Registros"]} />
              <Bar dataKey="value" fill="#f59e0b" radius={[10, 10, 0, 0]}>
                <LabelList dataKey="value" position="top" formatter={(value) => value.toLocaleString()} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <section className="table-section">
        <div className="section-header">
          <h2>Vista preliminar del dataset</h2>
          <p>Usa esta tabla para revisar las primeras filas del conjunto de datos cargado.</p>
        </div>
        <DatasetTable
          columns={columns}
          rows={displayedRows}
          page={page}
          rowsPerPage={rowsPerPage}
          count={totalRows}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
        />
      </section>
    </main>
  );
}
