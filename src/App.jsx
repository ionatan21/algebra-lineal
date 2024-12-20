import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CalculadoraMatriz from "./components/Calculadora/CalculadoraMatriz";
import Ejemplos from "./components/Ejemplos/Ejemplos";
import Navbar from "./components/Navbar/Navbar";
import Propiedades from "./components/Propiedades/Propiedades";
import { Analytics } from "@vercel/analytics/react"


function App() {
  return (
    <Router>
      <Analytics/>
      <Navbar />
      <Routes>
        <Route path="/" element={<CalculadoraMatriz />} />
        <Route path="/propiedades" element={<Propiedades />} />
        <Route path="/ejemplos" element={<Ejemplos />} />
      </Routes>
    </Router>
  );
}

export default App;