import React from "react";
import { motion } from "framer-motion";

export default function ModelMetrics({ metrics = {} }) {
  return (
    <motion.section
      className="model-metrics"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <h3>Métricas del modelo</h3>
      <div className="metric-grid">
        {Object.entries(metrics).map(([key, value]) => (
          <div key={key} className="metric-card">
            <div className="metric-key">{key}</div>
            <div className="metric-value">{typeof value === "number" ? value.toFixed(2) : JSON.stringify(value)}</div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
