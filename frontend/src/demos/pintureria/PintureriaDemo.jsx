import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import DemoNotice from "../components/DemoNotice";

const currency = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

const menuItems = [
  { id: "dashboard", label: "Dashboard", detail: "Resumen del negocio y ultimos movimientos" },
  { id: "productos", label: "Productos", detail: "Pinturas, colores, litros, accesorios y stock" },
  { id: "ventas", label: "Ventas", detail: "Control de caja y ventas del mostrador" },
  { id: "mezclas", label: "Mezclas", detail: "Pedidos de color preparados o pendientes" },
  { id: "faltantes", label: "Faltantes", detail: "Productos y colores que necesitan reposicion" },
  { id: "presupuestos", label: "Presupuestos", detail: "Calcular pintura por ambiente y aplicar descuentos" },
  { id: "pedidos", label: "Pedidos", detail: "Encargos, entregas y presupuestos aceptados" },
  { id: "proveedores", label: "Proveedores", detail: "Marcas, costos y cuentas pendientes" },
  { id: "reportes", label: "Reportes", detail: "Ventas, ganancias y productos mas vendidos" },
];

const initialProducts = [
  { id: 1, name: "Latex interior blanco", brand: "Alba", category: "Interior", color: "Blanco", finish: "Mate", liters: "20L", stock: 12, minStock: 5, price: 42900, cost: 28600 },
  { id: 2, name: "Latex interior gris perla", brand: "Sinteplast", category: "Interior", color: "Gris perla", finish: "Mate", liters: "10L", stock: 4, minStock: 6, price: 28500, cost: 19100 },
  { id: 3, name: "Esmalte sintetico negro", brand: "Sherwin", category: "Esmaltes", color: "Negro", finish: "Brillante", liters: "4L", stock: 7, minStock: 4, price: 31800, cost: 21300 },
  { id: 4, name: "Impermeabilizante rojo teja", brand: "Plavicon", category: "Exterior", color: "Rojo teja", finish: "Satinado", liters: "20L", stock: 3, minStock: 5, price: 61500, cost: 43200 },
  { id: 5, name: "Enduido plastico", brand: "Tersuave", category: "Preparacion", color: "Blanco", finish: "Base", liters: "10L", stock: 2, minStock: 8, price: 18700, cost: 11900 },
  { id: 6, name: "Rodillo antigota", brand: "Atlas", category: "Accesorios", color: "N/A", finish: "Accesorio", liters: "Unidad", stock: 35, minStock: 10, price: 6900, cost: 3900 },
  { id: 7, name: "Pincel profesional 2", brand: "El Galgo", category: "Accesorios", color: "N/A", finish: "Accesorio", liters: "Unidad", stock: 18, minStock: 8, price: 4200, cost: 2400 },
];

const initialClients = [
  { id: 1, name: "Laura Mendez", phone: "2604 330 982", type: "Particular", debt: 0 },
  { id: 2, name: "Pintor Matias", phone: "2604 661 205", type: "Profesional", debt: 86500 },
  { id: 3, name: "Obra Barrio Norte", phone: "2604 812 430", type: "Obra", debt: 540000 },
];

const initialSales = [
  { id: "PV-1101", customer: "Laura Mendez", total: 210000, cost: 141000, method: "Transferencia", status: "Pagado", day: "Lun", items: "Latex interior y rodillos" },
  { id: "PV-1102", customer: "Pintor Matias", total: 86500, cost: 57200, method: "Efectivo", status: "Pagado", day: "Mar", items: "Esmalte y pinceles" },
  { id: "PV-1103", customer: "Obra Barrio Norte", total: 540000, cost: 372000, method: "Cuenta corriente", status: "Pendiente", day: "Jue", items: "Impermeabilizante y latex" },
];

const initialMixes = [
  { id: "MX-31", customer: "Laura Mendez", color: "Arena suave", base: "Latex interior blanco", liters: "20L", status: "Preparado" },
  { id: "MX-32", customer: "Pintor Matias", color: "Verde olivo", base: "Latex interior blanco", liters: "10L", status: "Pendiente" },
];

const initialSuppliers = [
  { id: 1, name: "Alba Mayorista", brand: "Alba", phone: "2604 402 110", balance: 230000, products: ["Latex interior blanco", "Entonadores"] },
  { id: 2, name: "Sinteplast Cuyo", brand: "Sinteplast", phone: "2604 778 882", balance: 148000, products: ["Latex interior gris perla", "Membranas"] },
  { id: 3, name: "Accesorios Pintor", brand: "Atlas", phone: "2604 902 118", balance: 0, products: ["Rodillos", "Pinceles", "Bandejas"] },
];

function PintureriaDemo() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [products, setProducts] = useState(initialProducts);
  const [clients] = useState(initialClients);
  const [sales, setSales] = useState(initialSales);
  const [mixes, setMixes] = useState(initialMixes);
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [quotes, setQuotes] = useState([]);
  const [orders, setOrders] = useState([
    { id: "PP-210", customer: "Obra Barrio Norte", detail: "Pintura exterior completa", status: "Preparando", total: 540000 },
    { id: "PP-211", customer: "Pintor Matias", detail: "Color verde olivo 10L", status: "Pendiente", total: 86500 },
  ]);
  return (
    <main className="min-h-screen bg-slate-100">
      <aside className="fixed left-0 top-0 hidden h-screen w-72 overflow-y-auto border-r border-slate-200 bg-[#07111F] p-6 pb-36 text-white lg:block">
        <Link to="/" className="cursor-pointer block">
          <h1 className="text-2xl font-black">Proyecto Prisma</h1>
          <p className="mt-1 text-sm text-slate-400">Demo Pintureria</p>
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
            Ejemplo visual de un sistema para pintureria, con datos temporales.
          </p>
        </div>
      </aside>

      <section className="lg:ml-72">
        <div className="mx-auto max-w-7xl px-5 py-6 md:px-8">
          <div className="mb-6 flex items-center justify-between gap-3 lg:hidden">
            <div className="min-w-0">
              <h1 className="break-words text-xl font-black text-slate-950">
                Demo Pintureria
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

          <PintureriaHeader />
          <DemoNotice />

          <div className="mt-6 flex gap-2 overflow-x-auto pb-2 lg:hidden">
            {menuItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveSection(item.id)}
                className={`cursor-pointer shrink-0 rounded-full px-4 py-2 text-sm font-bold ${
                  activeSection === item.id ? "bg-slate-950 text-white" : "bg-white text-slate-600"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <PintureriaStats products={products} sales={sales} quotes={quotes} mixes={mixes} />

          {activeSection === "dashboard" && (
            <div className="mt-8 grid gap-6 xl:grid-cols-3">
              <div className="xl:col-span-2">
                <PaintProducts products={products} setProducts={setProducts} compact />
              </div>
              <PaintSales sales={sales} setSales={setSales} products={products} setProducts={setProducts} clients={clients} compact />
            </div>
          )}

          {activeSection === "productos" && (
            <div className="mt-8">
              <PaintProducts products={products} setProducts={setProducts} />
            </div>
          )}

          {activeSection === "ventas" && (
            <div className="mt-8">
              <PaintSales sales={sales} setSales={setSales} products={products} setProducts={setProducts} clients={clients} />
            </div>
          )}

          {activeSection === "mezclas" && (
            <div className="mt-8">
              <PaintMixes mixes={mixes} setMixes={setMixes} products={products} clients={clients} />
            </div>
          )}

          {activeSection === "faltantes" && (
            <div className="mt-8">
              <PaintMissing products={products} setProducts={setProducts} />
            </div>
          )}

          {activeSection === "presupuestos" && (
            <div className="mt-8">
              <PaintQuotes products={products} clients={clients} quotes={quotes} setQuotes={setQuotes} setOrders={setOrders} />
            </div>
          )}

          {activeSection === "pedidos" && (
            <div className="mt-8">
              <PaintOrders orders={orders} setOrders={setOrders} />
            </div>
          )}

          {activeSection === "proveedores" && (
            <div className="mt-8">
              <PaintSuppliers suppliers={suppliers} setSuppliers={setSuppliers} />
            </div>
          )}

          {activeSection === "reportes" && (
            <div className="mt-8">
              <PaintReports sales={sales} products={products} quotes={quotes} mixes={mixes} />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function PintureriaHeader() {
  const whatsappMessage = encodeURIComponent(
    "Hola Federico, vi el demo de pintureria y quiero un sistema asi para mi negocio."
  );

  return (
    <header className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-bold text-[#00D38E]">Sistema demo</p>
          <h2 className="mt-2 text-3xl font-black text-slate-950 md:text-4xl">
            Pintureria Prisma
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            Control de pinturas, colores, litros, stock, mezclas, ventas, presupuestos y pedidos.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/"
            className="cursor-pointer rounded-2xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
          >
            Volver a inicio
          </Link>
          <a
            href={`https://wa.me/5492604659499?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="cursor-pointer rounded-2xl bg-[#00D38E] px-5 py-3 text-sm font-bold text-[#07111F] shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-emerald-300"
          >
            Quiero este sistema
          </a>
        </div>
      </div>
    </header>
  );
}

function PintureriaStats({ products, sales, quotes, mixes }) {
  const salesTotal = sales.reduce((sum, sale) => sum + sale.total, 0);
  const lowStock = products.filter((product) => product.stock <= product.minStock).length;

  const stats = [
    { label: "Productos", value: products.length, detail: "Pinturas y accesorios" },
    { label: "Ventas cargadas", value: currency.format(salesTotal), detail: `${sales.length} operaciones` },
    { label: "Stock bajo", value: lowStock, detail: "Colores por reponer" },
    { label: "Presupuestos", value: quotes.length, detail: `${mixes.length} mezclas activas` },
  ];

  return (
    <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <article key={stat.label} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">{stat.label}</p>
          <p className="mt-3 break-words text-3xl font-black text-slate-950">{stat.value}</p>
          <p className="mt-2 text-sm text-[#00D38E]">{stat.detail}</p>
        </article>
      ))}
    </section>
  );
}

function PaintProducts({ products, setProducts, compact = false }) {
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    name: "",
    brand: "",
    category: "Interior",
    color: "",
    finish: "",
    liters: "",
    stock: "",
    minStock: "",
    price: "",
    cost: "",
  });

  const filteredProducts = products.filter((product) =>
    `${product.name} ${product.brand} ${product.color} ${product.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const updateForm = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const addProduct = (event) => {
    event.preventDefault();
    if (!form.name.trim()) return;

    setProducts((current) => [
      {
        id: Date.now(),
        name: form.name.trim(),
        brand: form.brand.trim() || "Sin marca",
        category: form.category,
        color: form.color.trim() || "N/A",
        finish: form.finish.trim() || "Base",
        liters: form.liters.trim() || "Unidad",
        stock: Number(form.stock || 0),
        minStock: Number(form.minStock || 0),
        price: Number(form.price || 0),
        cost: Number(form.cost || 0),
      },
      ...current,
    ]);

    setForm({ name: "", brand: "", category: "Interior", color: "", finish: "", liters: "", stock: "", minStock: "", price: "", cost: "" });
  };

  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-black text-slate-950">Productos e inventario</h3>
        <p className="mt-1 text-sm text-slate-500">
          Busca por producto, marca, color o categoria.
        </p>
      </div>

      {!compact && (
        <form onSubmit={addProduct} className="mb-6 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 lg:grid-cols-5">
          <input value={form.name} onChange={(event) => updateForm("name", event.target.value)} placeholder="Producto" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E] lg:col-span-2" />
          <input value={form.brand} onChange={(event) => updateForm("brand", event.target.value)} placeholder="Marca" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]" />
          <input value={form.color} onChange={(event) => updateForm("color", event.target.value)} placeholder="Color" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]" />
          <input value={form.finish} onChange={(event) => updateForm("finish", event.target.value)} placeholder="Terminacion" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]" />
          <select value={form.category} onChange={(event) => updateForm("category", event.target.value)} className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]">
            <option>Interior</option>
            <option>Exterior</option>
            <option>Esmaltes</option>
            <option>Preparacion</option>
            <option>Accesorios</option>
          </select>
          <input value={form.liters} onChange={(event) => updateForm("liters", event.target.value)} placeholder="Litros / unidad" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]" />
          <input type="number" value={form.stock} onChange={(event) => updateForm("stock", event.target.value)} placeholder="Stock" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]" />
          <input type="number" value={form.minStock} onChange={(event) => updateForm("minStock", event.target.value)} placeholder="Minimo" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]" />
          <input type="number" value={form.price} onChange={(event) => updateForm("price", event.target.value)} placeholder="Precio venta" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]" />
          <input type="number" value={form.cost} onChange={(event) => updateForm("cost", event.target.value)} placeholder="Costo" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]" />
          <button className="cursor-pointer rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-[#00D38E] hover:text-[#07111F] lg:col-span-5 lg:w-fit">
            Agregar producto
          </button>
        </form>
      )}

      <input
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Buscar pintura, color, marca o categoria"
        className="mb-5 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#00D38E] focus:bg-white"
      />

      <div className="grid gap-3 md:hidden">
        {filteredProducts.map((product) => (
          <PaintProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="hidden overflow-hidden rounded-2xl border border-slate-200 md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-5 py-4 font-bold">Producto</th>
                <th className="px-5 py-4 font-bold">Marca</th>
                <th className="px-5 py-4 font-bold">Color</th>
                <th className="px-5 py-4 font-bold">Litros</th>
                <th className="px-5 py-4 font-bold">Stock</th>
                <th className="px-5 py-4 font-bold">Precio</th>
                <th className="px-5 py-4 font-bold">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((product) => {
                const isLow = product.stock <= product.minStock;
                return (
                  <tr key={product.id} className="hover:bg-slate-50">
                    <td className="px-5 py-4 font-bold text-slate-900">{product.name}</td>
                    <td className="px-5 py-4 text-slate-600">{product.brand}</td>
                    <td className="px-5 py-4 text-slate-600">{product.color}</td>
                    <td className="px-5 py-4 text-slate-600">{product.liters}</td>
                    <td className="px-5 py-4 text-slate-600">{product.stock}</td>
                    <td className="px-5 py-4 font-bold text-slate-900">{currency.format(product.price)}</td>
                    <td className="px-5 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ${isLow ? "bg-red-100 text-red-700" : "bg-[#00D38E]/10 text-emerald-700"}`}>
                        {isLow ? "Stock bajo" : "Disponible"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function PaintProductCard({ product }) {
  const isLow = product.stock <= product.minStock;
  return (
    <article className="rounded-2xl border border-slate-200 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="break-words font-black text-slate-950">{product.name}</p>
          <p className="mt-1 text-sm text-slate-500">{product.brand} · {product.color}</p>
        </div>
        <span className={`w-fit shrink-0 rounded-full px-3 py-1 text-xs font-bold ${isLow ? "bg-red-100 text-red-700" : "bg-[#00D38E]/10 text-emerald-700"}`}>
          {isLow ? "Bajo" : "OK"}
        </span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-xs text-slate-500">Litros</p>
          <p className="font-black text-slate-950">{product.liters}</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-xs text-slate-500">Stock</p>
          <p className="font-black text-slate-950">{product.stock}</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-xs text-slate-500">Precio</p>
          <p className="font-black text-slate-950">{currency.format(product.price)}</p>
        </div>
      </div>
    </article>
  );
}

function PaintSales({ sales, setSales, products, setProducts, clients, compact = false }) {
  const [form, setForm] = useState({
    customer: clients[0]?.name ?? "",
    productId: products[0]?.id ?? "",
    quantity: 1,
    method: "Efectivo",
    status: "Pagado",
  });

  const product = products.find((item) => item.id === Number(form.productId));
  const total = (product?.price ?? 0) * Number(form.quantity || 0);

  const updateForm = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const registerSale = (event) => {
    event.preventDefault();
    if (!product) return;

    const quantity = Math.max(1, Number(form.quantity));
    setSales((current) => [
      {
        id: `PV-${1110 + current.length}`,
        customer: form.customer,
        total: product.price * quantity,
        cost: product.cost * quantity,
        method: form.method,
        status: form.status,
        day: "Vie",
        items: `${quantity} x ${product.name}`,
      },
      ...current,
    ]);

    setProducts((current) =>
      current.map((item) =>
        item.id === product.id ? { ...item, stock: Math.max(0, item.stock - quantity) } : item
      )
    );

    setForm((current) => ({ ...current, quantity: 1 }));
  };

  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-black text-slate-950">
          {compact ? "Ventas recientes" : "Ventas"}
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Registra ventas y descuenta stock de forma temporal.
        </p>
      </div>

      {!compact && (
        <form onSubmit={registerSale} className="mb-6 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 lg:grid-cols-6">
          <select value={form.customer} onChange={(event) => updateForm("customer", event.target.value)} className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E] lg:col-span-2">
            {clients.map((client) => <option key={client.id}>{client.name}</option>)}
          </select>
          <select value={form.productId} onChange={(event) => updateForm("productId", event.target.value)} className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E] lg:col-span-2">
            {products.map((item) => <option key={item.id} value={item.id}>{item.name} · {item.color}</option>)}
          </select>
          <input type="number" min="1" value={form.quantity} onChange={(event) => updateForm("quantity", event.target.value)} className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]" />
          <select value={form.status} onChange={(event) => updateForm("status", event.target.value)} className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]">
            <option>Pagado</option>
            <option>Pendiente</option>
          </select>
          <select value={form.method} onChange={(event) => updateForm("method", event.target.value)} className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E] lg:col-span-2">
            <option>Efectivo</option>
            <option>Transferencia</option>
            <option>Tarjeta</option>
            <option>Cuenta corriente</option>
          </select>
          <div className="rounded-xl bg-white px-3 py-3 text-sm font-black text-slate-950 lg:col-span-2">
            Total: {currency.format(total)}
          </div>
          <button className="cursor-pointer rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-[#00D38E] hover:text-[#07111F] lg:col-span-2">
            Registrar venta
          </button>
        </form>
      )}

      <div className={compact ? "space-y-4" : "grid gap-4 md:grid-cols-2"}>
        {sales.map((sale) => (
          <article key={sale.id} className="rounded-2xl border border-slate-200 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <p className="text-xs font-black text-slate-400">{sale.id}</p>
                <p className="mt-1 break-words font-black text-slate-950">{sale.customer}</p>
                <p className="mt-1 break-words text-sm text-slate-500">{sale.items}</p>
              </div>
              <p className="shrink-0 text-xl font-black text-slate-950 sm:text-right">{currency.format(sale.total)}</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{sale.method}</span>
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${sale.status === "Pagado" ? "bg-[#00D38E]/10 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{sale.status}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function PaintMixes({ mixes, setMixes, products, clients }) {
  const [form, setForm] = useState({
    customer: clients[0]?.name ?? "",
    base: products[0]?.name ?? "",
    color: "",
    liters: "10L",
  });

  const updateForm = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const addMix = (event) => {
    event.preventDefault();
    if (!form.color.trim()) return;

    setMixes((current) => [
      { id: `MX-${40 + current.length}`, customer: form.customer, color: form.color.trim(), base: form.base, liters: form.liters, status: "Pendiente" },
      ...current,
    ]);
    setForm((current) => ({ ...current, color: "" }));
  };

  const updateStatus = (mixId, status) => {
    setMixes((current) => current.map((mix) => mix.id === mixId ? { ...mix, status } : mix));
  };

  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-black text-slate-950">Mezclas de color</h3>
        <p className="mt-1 text-sm text-slate-500">Registra colores pedidos y marca cuando estan preparados.</p>
      </div>
      <form onSubmit={addMix} className="mb-6 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 lg:grid-cols-5">
        <select value={form.customer} onChange={(event) => updateForm("customer", event.target.value)} className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]">
          {clients.map((client) => <option key={client.id}>{client.name}</option>)}
        </select>
        <select value={form.base} onChange={(event) => updateForm("base", event.target.value)} className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]">
          {products.filter((product) => product.category !== "Accesorios").map((product) => <option key={product.id}>{product.name}</option>)}
        </select>
        <input value={form.color} onChange={(event) => updateForm("color", event.target.value)} placeholder="Color solicitado" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]" />
        <select value={form.liters} onChange={(event) => updateForm("liters", event.target.value)} className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]">
          <option>4L</option>
          <option>10L</option>
          <option>20L</option>
        </select>
        <button className="cursor-pointer rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-[#00D38E] hover:text-[#07111F]">Agregar mezcla</button>
      </form>
      <div className="grid gap-4 md:grid-cols-2">
        {mixes.map((mix) => (
          <article key={mix.id} className="rounded-2xl border border-slate-200 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <p className="text-xs font-black text-slate-400">{mix.id}</p>
                <p className="mt-1 break-words font-black text-slate-950">{mix.color}</p>
                <p className="mt-1 text-sm text-slate-500">{mix.customer} · {mix.base} · {mix.liters}</p>
              </div>
              <span className={`w-fit shrink-0 rounded-full px-3 py-1 text-xs font-bold ${mix.status === "Preparado" ? "bg-[#00D38E]/10 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{mix.status}</span>
            </div>
            <button type="button" onClick={() => updateStatus(mix.id, mix.status === "Preparado" ? "Pendiente" : "Preparado")} className="cursor-pointer mt-4 rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">
              Cambiar estado
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function PaintMissing({ products, setProducts }) {
  const missing = products.filter((product) => product.stock <= product.minStock);
  const restock = (productId) => {
    setProducts((current) => current.map((product) => product.id === productId ? { ...product, stock: product.stock + Math.max(5, product.minStock) } : product));
  };

  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-black text-slate-950">Faltantes</h3>
        <p className="mt-1 text-sm text-slate-500">Colores, bases o accesorios que necesitan reposicion.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {missing.map((product) => (
          <article key={product.id} className="rounded-2xl border border-red-100 bg-red-50/50 p-4">
            <p className="font-black text-slate-950">{product.name}</p>
            <p className="mt-1 text-sm text-slate-500">{product.brand} · {product.color} · {product.liters}</p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <div className="rounded-xl bg-white p-3">
                <p className="text-xs text-slate-500">Actual</p>
                <p className="font-black text-slate-950">{product.stock}</p>
              </div>
              <div className="rounded-xl bg-white p-3">
                <p className="text-xs text-slate-500">Minimo</p>
                <p className="font-black text-slate-950">{product.minStock}</p>
              </div>
            </div>
            <button type="button" onClick={() => restock(product.id)} className="cursor-pointer mt-4 w-full rounded-xl bg-slate-950 px-4 py-2 text-sm font-bold text-white hover:bg-[#00D38E] hover:text-[#07111F]">
              Simular reposicion
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function PaintQuotes({ products, clients, quotes, setQuotes, setOrders }) {
  const [form, setForm] = useState({
    customer: clients[0]?.name ?? "",
    productId: products[0]?.id ?? "",
    squareMeters: 40,
    coats: 2,
    discount: 0,
  });

  const product = products.find((item) => item.id === Number(form.productId));
  const litersNeeded = Math.ceil((Number(form.squareMeters || 0) * Number(form.coats || 1)) / 10);
  const units = product?.liters === "20L" ? Math.ceil(litersNeeded / 20) : product?.liters === "10L" ? Math.ceil(litersNeeded / 10) : 1;
  const subtotal = (product?.price ?? 0) * units;
  const total = Math.max(0, subtotal - subtotal * (Number(form.discount || 0) / 100));

  const updateForm = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const createQuote = (event) => {
    event.preventDefault();
    if (!product) return;

    const quote = {
      id: `PT-${300 + quotes.length + 1}`,
      customer: form.customer,
      detail: `${units} x ${product.name} para ${form.squareMeters} m2`,
      litersNeeded,
      discount: Number(form.discount || 0),
      total,
    };

    setQuotes((current) => [quote, ...current]);
  };

  const createOrder = (quote) => {
    setOrders((current) => [
      { id: `PP-${220 + current.length}`, customer: quote.customer, detail: quote.detail, status: "Pendiente", total: quote.total },
      ...current,
    ]);
  };

  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-black text-slate-950">Presupuestos</h3>
        <p className="mt-1 text-sm text-slate-500">Calcula litros aproximados, productos necesarios y descuento.</p>
      </div>
      <form onSubmit={createQuote} className="mb-6 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 lg:grid-cols-6">
        <select value={form.customer} onChange={(event) => updateForm("customer", event.target.value)} className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E] lg:col-span-2">
          {clients.map((client) => <option key={client.id}>{client.name}</option>)}
        </select>
        <select value={form.productId} onChange={(event) => updateForm("productId", event.target.value)} className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E] lg:col-span-2">
          {products.filter((item) => item.category !== "Accesorios").map((item) => <option key={item.id} value={item.id}>{item.name} · {item.color}</option>)}
        </select>
        <input type="number" min="1" value={form.squareMeters} onChange={(event) => updateForm("squareMeters", event.target.value)} placeholder="m2" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]" />
        <input type="number" min="1" value={form.coats} onChange={(event) => updateForm("coats", event.target.value)} placeholder="Manos" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]" />
        <input type="number" min="0" max="100" value={form.discount} onChange={(event) => updateForm("discount", event.target.value)} placeholder="Descuento %" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]" />
        <div className="rounded-xl bg-white px-3 py-3 text-sm font-black text-slate-950 lg:col-span-3">
          Necesita aprox. {litersNeeded}L · Total {currency.format(total)}
        </div>
        <button className="cursor-pointer rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-[#00D38E] hover:text-[#07111F] lg:col-span-2">Crear presupuesto</button>
      </form>
      <div className="grid gap-4 md:grid-cols-2">
        {quotes.map((quote) => (
          <article key={quote.id} className="rounded-2xl border border-slate-200 p-4">
            <p className="text-xs font-black text-slate-400">{quote.id}</p>
            <p className="mt-1 font-black text-slate-950">{quote.customer}</p>
            <p className="mt-1 text-sm text-slate-500">{quote.detail}</p>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xl font-black text-slate-950">{currency.format(quote.total)}</p>
              <button type="button" onClick={() => createOrder(quote)} className="cursor-pointer rounded-full bg-[#00D38E]/10 px-3 py-1 text-xs font-bold text-emerald-700">Pasar a pedido</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function PaintOrders({ orders, setOrders }) {
  const updateStatus = (orderId, status) => {
    setOrders((current) => current.map((order) => order.id === orderId ? { ...order, status } : order));
  };

  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-black text-slate-950">Pedidos</h3>
        <p className="mt-1 text-sm text-slate-500">Encargos de pintura, mezclas y presupuestos aceptados.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {orders.map((order) => (
          <article key={order.id} className="rounded-2xl border border-slate-200 p-4">
            <p className="text-xs font-black text-slate-400">{order.id}</p>
            <p className="mt-1 font-black text-slate-950">{order.customer}</p>
            <p className="mt-1 text-sm text-slate-500">{order.detail}</p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xl font-black text-slate-950">{currency.format(order.total)}</p>
              <select value={order.status} onChange={(event) => updateStatus(order.id, event.target.value)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold outline-none focus:border-[#00D38E]">
                <option>Pendiente</option>
                <option>Preparando</option>
                <option>Entregado</option>
              </select>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function PaintSuppliers({ suppliers, setSuppliers }) {
  const clearBalance = (supplierId) => {
    setSuppliers((current) => current.map((supplier) => supplier.id === supplierId ? { ...supplier, balance: 0 } : supplier));
  };

  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-black text-slate-950">Proveedores</h3>
        <p className="mt-1 text-sm text-slate-500">Marcas, productos que proveen y cuentas pendientes.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {suppliers.map((supplier) => (
          <article key={supplier.id} className="rounded-2xl border border-slate-200 p-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="font-black text-slate-950">{supplier.name}</p>
                <p className="text-sm text-slate-500">{supplier.brand} · {supplier.phone}</p>
              </div>
              <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{supplier.products.length} productos</span>
            </div>
            <div className="mt-4 rounded-xl bg-slate-50 p-3">
              <p className="text-xs font-bold text-slate-500">Cuenta pendiente</p>
              <p className={supplier.balance > 0 ? "mt-1 text-xl font-black text-amber-700" : "mt-1 text-xl font-black text-emerald-700"}>
                {supplier.balance > 0 ? currency.format(supplier.balance) : "Al dia"}
              </p>
              {supplier.balance > 0 && (
                <button type="button" onClick={() => clearBalance(supplier.id)} className="cursor-pointer mt-3 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100">
                  Marcar pagado
                </button>
              )}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {supplier.products.map((product) => (
                <span key={product} className="rounded-full bg-[#00D38E]/10 px-3 py-1 text-xs font-bold text-emerald-700">{product}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function PaintReports({ sales, products, quotes, mixes }) {
  const days = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
  const daily = days.map((day) => {
    const daySales = sales.filter((sale) => sale.day === day);
    const total = daySales.reduce((sum, sale) => sum + sale.total, 0);
    const cost = daySales.reduce((sum, sale) => sum + sale.cost, 0);
    return { label: day, sales: total, profit: Math.max(0, total - cost) };
  });
  const totalSales = sales.reduce((sum, sale) => sum + sale.total, 0);
  const totalProfit = sales.reduce((sum, sale) => sum + Math.max(0, sale.total - sale.cost), 0);
  const lowStock = products.filter((product) => product.stock <= product.minStock).length;

  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-black text-slate-950">Reportes</h3>
        <p className="mt-1 text-sm text-slate-500">Ventas, ganancias, faltantes, presupuestos y mezclas.</p>
      </div>
      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <ReportCard label="Ventas" value={currency.format(totalSales)} />
        <ReportCard label="Ganancia" value={currency.format(totalProfit)} accent />
        <ReportCard label="Faltantes" value={lowStock} />
        <ReportCard label="Presupuestos" value={quotes.length + mixes.length} />
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        <ChartBox title="Ventas por dia" data={daily} valueKey="sales" />
        <ChartBox title="Ganancias por dia" data={daily} valueKey="profit" dark />
      </div>
    </section>
  );
}

function ReportCard({ label, value, accent = false }) {
  return (
    <article className="rounded-2xl border border-slate-200 p-5">
      <p className="text-sm font-bold text-slate-500">{label}</p>
      <p className={`mt-2 break-words text-2xl font-black ${accent ? "text-emerald-700" : "text-slate-950"}`}>{value}</p>
    </article>
  );
}

function ChartBox({ title, data, valueKey, dark = false }) {
  const maxValue = Math.max(...data.map((item) => item[valueKey]), 1);
  return (
    <article className="rounded-2xl border border-slate-200 p-5">
      <p className="mb-4 font-black text-slate-950">{title}</p>
      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.label} className="grid grid-cols-[36px_1fr] items-center gap-x-3 gap-y-1 text-sm sm:grid-cols-[44px_1fr_92px]">
            <span className="font-bold text-slate-500">{item.label}</span>
            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full ${dark ? "bg-slate-950" : "bg-[#00D38E]"}`}
                style={{ width: `${Math.max(8, (item[valueKey] / maxValue) * 100)}%` }}
              />
            </div>
            <span className="col-start-2 text-left font-black text-slate-950 sm:col-start-auto sm:text-right">{currency.format(item[valueKey])}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

export default PintureriaDemo;
