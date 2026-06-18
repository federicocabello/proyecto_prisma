import { useState } from "react";
import { Link } from "react-router-dom";

import FerreteriaHeader from "./components/FerreteriaHeader";
import FerreteriaStats from "./components/FerreteriaStats";
import FerreteriaProducts from "./components/FerreteriaProducts";
import FerreteriaSales from "./components/FerreteriaSales";
import FerreteriaClients from "./components/FerreteriaClients";
import FerreteriaSuppliers from "./components/FerreteriaSuppliers";
import FerreteriaQuotes from "./components/FerreteriaQuotes";
import FerreteriaOrders from "./components/FerreteriaOrders";
import FerreteriaMissing from "./components/FerreteriaMissing";
import DemoNotice from "../components/DemoNotice";

const menuItems = [
  { id: "dashboard", label: "Dashboard", detail: "Resumen general del negocio" },
  { id: "productos", label: "Productos", detail: "Lista completa, busqueda y control de stock" },
  { id: "ventas", label: "Ventas", detail: "Control de caja y movimientos diarios" },
  { id: "faltantes", label: "Faltantes", detail: "Productos con stock bajo o sin unidades" },
  { id: "proveedores", label: "Proveedores", detail: "Productos, precios y cuentas pendientes" },
  { id: "presupuestos", label: "Presupuestos", detail: "Armar presupuestos desde la lista de productos" },
  { id: "pedidos", label: "Pedidos", detail: "Seguimiento de encargues y presupuestos aceptados" },
  { id: "clientes", label: "Clientes", detail: "Contactos, cuentas y estado de pago" },
  { id: "cobranzas", label: "Cobranzas", detail: "Ver clientes con pagos pendientes" },
  { id: "reportes", label: "Reportes", detail: "Ventas, ganancias y graficos por periodo" },
];

const initialProducts = [
  { id: 1, name: "Martillo profesional", category: "Herramientas", stock: 24, minStock: 8, price: 15500 },
  { id: 2, name: "Taladro electrico", category: "Herramientas electricas", stock: 6, minStock: 5, price: 89900 },
  { id: 3, name: "Caja de tornillos", category: "Ferreteria general", stock: 42, minStock: 12, price: 7500 },
  { id: 4, name: "Cinta metrica", category: "Medicion", stock: 3, minStock: 10, price: 5900 },
  { id: 5, name: "Disco de corte 115mm", category: "Herramientas electricas", stock: 18, minStock: 10, price: 3400 },
  { id: 6, name: "Llave francesa 10", category: "Herramientas", stock: 7, minStock: 6, price: 12800 },
  { id: 7, name: "Tarugo plastico N8", category: "Ferreteria general", stock: 120, minStock: 50, price: 80 },
  { id: 8, name: "Pintura antioxido 1L", category: "Pinturas", stock: 5, minStock: 8, price: 14900 },
];

const initialClients = [
  { id: 1, name: "Carlos Perez", phone: "2604 521 118", type: "Particular", debt: 0 },
  { id: 2, name: "Obra San Martin", phone: "2604 889 302", type: "Cuenta corriente", debt: 320750 },
  { id: 3, name: "Metalurgica Norte", phone: "2604 667 901", type: "Empresa", debt: 188200 },
];

const initialSales = [
  { id: "V-2041", customer: "Carlos Perez", total: 145500, cost: 97000, method: "Efectivo", status: "Pagado", date: "Hoy", day: "Lun", items: "Herramientas y tornillos" },
  { id: "V-2042", customer: "Maria Lopez", total: 89000, cost: 61000, method: "Tarjeta", status: "Pagado", date: "Hoy", day: "Mar", items: "Pintura y rodillos" },
  { id: "V-2043", customer: "Obra San Martin", total: 320750, cost: 221000, method: "Cuenta corriente", status: "Pendiente", date: "Ayer", day: "Mie", items: "Materiales electricos" },
  { id: "V-2044", customer: "Metalurgica Norte", total: 188200, cost: 126000, method: "Cuenta corriente", status: "Vence pronto", date: "Lunes", day: "Jue", items: "Discos, mechas y llaves" },
];

const initialSuppliers = [
  {
    id: 1,
    name: "Distribuidora Andes",
    phone: "2604 440 210",
    balance: 248000,
    products: [
      { name: "Taladro electrico", cost: 64200 },
      { name: "Disco de corte 115mm", cost: 2100 },
    ],
  },
  {
    id: 2,
    name: "Mayorista San Rafael",
    phone: "2604 778 124",
    balance: 87500,
    products: [
      { name: "Caja de tornillos", cost: 4800 },
      { name: "Tarugo plastico N8", cost: 45 },
    ],
  },
  {
    id: 3,
    name: "Pintureria Base",
    phone: "2604 902 531",
    balance: 0,
    products: [
      { name: "Pintura antioxido 1L", cost: 9800 },
      { name: "Cinta metrica", cost: 3600 },
    ],
  },
];

function FerreteriaDemo() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [products, setProducts] = useState(initialProducts);
  const [clients, setClients] = useState(initialClients);
  const [sales, setSales] = useState(initialSales);
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [quotes, setQuotes] = useState([]);
  const [orders, setOrders] = useState([
    { id: "P-104", customer: "Obra San Martin", detail: "Entrega de materiales electricos", status: "Preparando", total: 320750 },
    { id: "P-105", customer: "Metalurgica Norte", detail: "Reposicion de discos y mechas", status: "Pendiente", total: 188200 },
  ]);
  return (
    <main className="min-h-screen bg-slate-100">
      <aside className="fixed left-0 top-0 hidden h-screen w-72 overflow-y-auto border-r border-slate-200 bg-[#07111F] p-6 pb-36 text-white lg:block">
        <Link to="/" className="cursor-pointer block">
          <h1 className="text-2xl font-black">Proyecto Prisma</h1>
          <p className="mt-1 text-sm text-slate-400">Demo Ferretería</p>
        </Link>

        <nav className="mt-8 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveSection(item.id)}
              className={`cursor-pointer block w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                activeSection === item.id
                  ? "bg-[#00D38E] text-[#07111F]"
                  : "text-slate-300 hover:bg-white/10 hover:text-[#00D38E]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/10 p-4">
          <p className="text-sm font-bold text-[#00D38E]">Demo activa</p>
          <p className="mt-1 text-xs leading-5 text-slate-400">
            Esta pantalla muestra un ejemplo visual de cómo podría funcionar un
            sistema para una ferretería.
          </p>
        </div>
      </aside>

      <section className="lg:ml-72">
        <div className="mx-auto max-w-7xl px-5 py-6 md:px-8">
          <div className="mb-6 flex items-center justify-between gap-3 lg:hidden">
            <div className="min-w-0">
              <h1 className="break-words text-xl font-black text-slate-950">
                Demo Ferretería
              </h1>
              <p className="text-sm text-slate-500">Proyecto Prisma</p>
            </div>

            <Link
              to="/"
              className="cursor-pointer shrink-0 rounded-xl bg-slate-950 px-4 py-2 text-sm font-bold text-white"
            >
              Volver
            </Link>
          </div>

          <FerreteriaHeader />
          <DemoNotice />

          <div className="mt-6 flex gap-2 overflow-x-auto pb-2 lg:hidden">
            {menuItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveSection(item.id)}
                className={`cursor-pointer shrink-0 rounded-full px-4 py-2 text-sm font-bold ${
                  activeSection === item.id
                    ? "bg-slate-950 text-white"
                    : "bg-white text-slate-600"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <FerreteriaStats products={products} sales={sales} clients={clients} />

          {activeSection === "dashboard" && (
            <>
              <div className="mt-8">
                <FerreteriaSales
                  view="ventas"
                  quickOnly
                  sales={sales}
                  setSales={setSales}
                  products={products}
                  setProducts={setProducts}
                  clients={clients}
                />
              </div>

              <div className="mt-8">
                <FerreteriaProducts
                  products={products}
                  setProducts={setProducts}
                  compact
                />
              </div>

              <div className="mt-8">
                <FerreteriaSales
                  view="resumen"
                  sales={sales}
                  setSales={setSales}
                  products={products}
                  setProducts={setProducts}
                  clients={clients}
                />
              </div>
            </>
          )}

          {activeSection === "productos" && (
            <div className="mt-8">
              <FerreteriaProducts products={products} setProducts={setProducts} />
            </div>
          )}

          {activeSection === "clientes" && (
            <div className="mt-8">
              <FerreteriaClients clients={clients} setClients={setClients} />
            </div>
          )}

          {activeSection === "ventas" && (
            <div className="mt-8">
              <FerreteriaSales
                view="ventas"
                sales={sales}
                setSales={setSales}
                products={products}
                setProducts={setProducts}
                clients={clients}
              />
            </div>
          )}

          {activeSection === "faltantes" && (
            <div className="mt-8">
              <FerreteriaMissing products={products} setProducts={setProducts} />
            </div>
          )}

          {activeSection === "proveedores" && (
            <div className="mt-8">
              <FerreteriaSuppliers suppliers={suppliers} setSuppliers={setSuppliers} />
            </div>
          )}

          {activeSection === "presupuestos" && (
            <div className="mt-8">
              <FerreteriaQuotes
                products={products}
                clients={clients}
                quotes={quotes}
                setQuotes={setQuotes}
                setOrders={setOrders}
              />
            </div>
          )}

          {activeSection === "pedidos" && (
            <div className="mt-8">
              <FerreteriaOrders orders={orders} setOrders={setOrders} />
            </div>
          )}

          {activeSection === "cobranzas" && (
            <div className="mt-8">
              <FerreteriaSales
                view="cobranzas"
                sales={sales}
                setSales={setSales}
                products={products}
                setProducts={setProducts}
                clients={clients}
              />
            </div>
          )}

          {activeSection === "reportes" && (
            <div className="mt-8">
              <FerreteriaSales
                view="reportes"
                sales={sales}
                setSales={setSales}
                products={products}
                setProducts={setProducts}
                clients={clients}
              />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default FerreteriaDemo;
