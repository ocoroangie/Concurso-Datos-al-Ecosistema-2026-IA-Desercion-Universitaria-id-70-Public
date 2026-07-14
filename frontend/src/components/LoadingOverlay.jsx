import React from "react";
import { CircularProgress } from "@mui/material";
import { motion } from "framer-motion";

export default function LoadingOverlay({ message = "Cargando..." }) {
  return (
    <motion.div
      className="loading-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="loading-panel">
        <CircularProgress color="inherit" />
        <div>{message}</div>
      </div>
    </motion.div>
  );
}
