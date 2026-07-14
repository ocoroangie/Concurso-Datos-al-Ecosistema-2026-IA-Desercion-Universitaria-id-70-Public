import React from "react";
import { TextField, MenuItem, Button } from "@mui/material";

export default function FilterBar({ filters, setFilters, onApply, onClear }) {
  return (
    <div className="filter-bar">
      <div className="filter-row">
        <TextField
          select
          label="Periodo"
          value={filters.period}
          onChange={(e) => setFilters({ ...filters, period: e.target.value })}
          size="small"
        >
          <MenuItem value="2026-I">2026-I</MenuItem>
          <MenuItem value="2025-II">2025-II</MenuItem>
        </TextField>
        <TextField
          select
          label="Universidad"
          value={filters.university}
          onChange={(e) =>
            setFilters({ ...filters, university: e.target.value })
          }
          size="small"
          InputLabelProps={{ style: { color: '#fff' } }}
          sx={{
            '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.25)' },
            '.MuiInputBase-input': { color: '#fff' },
            '.MuiSvgIcon-root': { color: '#fff' },
          }}
        >
          <MenuItem value="TUNJA">TUNJA</MenuItem>
          <MenuItem value="Otra">Otra</MenuItem>
        </TextField>
        <TextField
          select
          label="Programa"
          value={filters.program}
          onChange={(e) => setFilters({ ...filters, program: e.target.value })}
          size="small"
        >
          <MenuItem value="Ing Sistemas">Ing Sistemas</MenuItem>
          <MenuItem value="Matematicas">Matematicas</MenuItem>
        </TextField>
        <TextField
          select
          label="Tipo de deserción"
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          size="small"
        >
          <MenuItem value="academica">Académica</MenuItem>
          <MenuItem value="no-academica">No académica</MenuItem>
        </TextField>
      </div>
      <div className="filter-actions">
        <Button variant="outlined" onClick={onClear}>
          Limpiar
        </Button>
        <Button variant="contained" onClick={onApply}>
          Aplicar
        </Button>
      </div>
    </div>
  );
}
