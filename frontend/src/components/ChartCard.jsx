import React from "react";
import { motion } from "framer-motion";

export default function ChartCard({ title, subtitle, children }) {
  return (
    <motion.section
      className="chart-card"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="chart-card-header">
        <div>
          <h3>{title}</h3>
          {subtitle && <p className="chart-card-subtitle">{subtitle}</p>}
        </div>
      </div>
      <div className="chart-card-body">{children}</div>
    </motion.section>
  );
}
