import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Observatorio from "./pages/Observatorio";

function App() {
  return (
    <div className="app-shell">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/observatorio" element={<Observatorio />} />
      </Routes>
    </div>
  );
}

export default App;
