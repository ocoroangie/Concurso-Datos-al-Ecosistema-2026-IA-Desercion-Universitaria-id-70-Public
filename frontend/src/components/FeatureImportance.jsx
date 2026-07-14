import React from "react";
import { motion } from "framer-motion";

export default function FeatureImportance({ items = [] }) {
  return (
    <motion.section
      className="feature-importance"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3>Importancia de variables</h3>
      <div className="feature-list">
        {items.map((item, index) => (
          <div key={index} className="feature-item">
            <span>{item.feature}</span>
            <strong>{item.importance.toFixed(3)}</strong>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
