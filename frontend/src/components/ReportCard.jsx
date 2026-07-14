import React from "react";
import { motion } from "framer-motion";

export default function ReportCard({ title, value, description }) {
  return (
    <motion.article
      className="report-card"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <h4>{title}</h4>
      <div className="report-card-value">{value}</div>
      <p>{description}</p>
    </motion.article>
  );
}
