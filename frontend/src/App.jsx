import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./landing/pages/Home";
import CommerceDemo from "./demos/comercio/CommerceDemo";
import BarberiaDemo from "./demos/barberia/BarberiaDemo";
import ServiciosDemo from "./demos/servicios/ServiciosDemo";
import ClinicaDemo from "./demos/clinica/ClinicaDemo";
import RentasDemo from "./demos/rentas/RentasDemo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/demo/comercio/:type" element={<CommerceDemo />} />
        <Route path="/demo/barberia" element={<BarberiaDemo />} />
        <Route path="/demo/servicios-tecnicos" element={<ServiciosDemo />} />
        <Route path="/demo/clinica" element={<ClinicaDemo />} />
        <Route path="/demo/rentas" element={<RentasDemo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;