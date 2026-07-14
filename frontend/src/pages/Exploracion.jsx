import { useEffect, useState } from "react";
import api from "../services/api";
import StatCard from "../components/StatCard";
import DatasetTable from "../components/DatasetTable";
import ChartCard from "../components/ChartCard";
import LoadingOverlay from "../components/LoadingOverlay";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export default function Exploracion() {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    api.get("/exploration")
      .then((response) => setData(response.data))
      .catch((error) => console.error(error));
  }, []);

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
          <p className="hero-description">Análisis de calidad, distribución y estructura del dataset oficial.</p>
        </div>
      </section>

      <div className="stats-row">
        <StatCard title="Registros" value={data.summary.total_records.toLocaleString()} />
        <StatCard title="Columnas" value={data.summary.total_columns} />
        <StatCard title="Variables categóricas" value={data.summary.categorical_variables} />
        <StatCard title="Variables numéricas" value={data.summary.numeric_variables} />
        <StatCard title="Valores faltantes" value={data.summary.missing_values} />
      </div>

      <section className="table-section">
        <div className="section-header">
          <h2>Vista del dataset</h2>
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

      <div className="dashboard-grid">
        <ChartCard title="Distribución por género">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={data.gender_distribution} dataKey="value" nameKey="name" outerRadius={90}>
                {data.gender_distribution.map((entry, index) => (
                  <Cell key={index} fill={index === 0 ? "#22c55e" : "#38bdf8"} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Distribución por facultad">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={data.faculty_distribution}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="dashboard-grid">
        <ChartCard title="Distribución por programa">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={data.program_distribution}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#22d3ee" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Distribución por modalidad">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={data.modalidad_distribution} dataKey="value" nameKey="name" outerRadius={90}>
                {data.modalidad_distribution.map((entry, index) => (
                  <Cell key={index} fill={index % 2 ? "#2563eb" : "#0ea5e9"} />
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
