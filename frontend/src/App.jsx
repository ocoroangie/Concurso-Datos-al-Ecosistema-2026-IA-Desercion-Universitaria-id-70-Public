import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Observatorio from "./pages/Observatorio";
import Exploracion from "./pages/Exploracion";
import Eda from "./pages/Eda";
import MachineLearning from "./pages/MachineLearning";
import Insights from "./pages/Insights";
import Reportes from "./pages/Reportes";
import Acerca from "./pages/Acerca";
import NavBar from "./components/NavBar";
import SideNav from "./components/SideNav";

function App() {
  return (
    <div className="app-shell">
      <NavBar />
      <div className="page-layout">
        <SideNav />
        <main className="page-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/observatorio" element={<Observatorio />} />
            <Route path="/dashboard" element={<Observatorio />} />
            <Route path="/exploracion" element={<Exploracion />} />
            <Route path="/eda" element={<Eda />} />
            <Route path="/ml" element={<MachineLearning />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/reportes" element={<Reportes />} />
            <Route path="/acerca" element={<Acerca />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
