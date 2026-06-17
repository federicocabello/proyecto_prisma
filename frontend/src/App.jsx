import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./landing/pages/Home";
import FerreteriaDemo from "./demos/ferreteria/FerreteriaDemo";
import PintureriaDemo from "./demos/pintureria/PintureriaDemo";
import KioscoDemo from "./demos/kiosco/KioscoDemo";
import BarberiaDemo from "./demos/barberia/BarberiaDemo";
import ClinicaDemo from "./demos/clinica/ClinicaDemo";
import RentasDemo from "./demos/rentas/RentasDemo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/demo/ferreteria" element={<FerreteriaDemo />} />
        <Route path="/demo/pintureria" element={<PintureriaDemo />} />
        <Route path="/demo/kiosco" element={<KioscoDemo />} />
        <Route path="/demo/barberia" element={<BarberiaDemo />} />
        <Route path="/demo/clinica" element={<ClinicaDemo />} />
        <Route path="/demo/rentas" element={<RentasDemo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
