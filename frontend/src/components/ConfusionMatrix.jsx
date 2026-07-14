import React from "react";
import { motion } from "framer-motion";

export default function ConfusionMatrix({ matrix = [] }) {
  return (
    <motion.section
      className="confusion-matrix"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <h3>Matriz de Confusión</h3>
      <div className="confusion-grid">
        {matrix.map((row, rowIndex) => (
          <div key={rowIndex} className="confusion-row">
            {row.map((value, index) => (
              <div key={index} className="confusion-cell">
                {value}
              </div>
            ))}
          </div>
        ))}
      </div>
    </motion.section>
  );
}
