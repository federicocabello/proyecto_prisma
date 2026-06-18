import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import DemoNotice from "../components/DemoNotice";

const currency = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

const menuItems = [
  { id: "dashboard", label: "Dashboard", detail: "Resumen de caja, ventas y stock" },
  { id: "venta", label: "Venta rapida", detail: "Buscar por codigo, cargar carrito y cobrar" },
  { id: "productos", label: "Productos", detail: "Lista de productos, precios, codigos y stock" },
  { id: "faltantes", label: "Faltantes", detail: "Productos con poco stock o sin unidades" },
  { id: "fiados", label: "Fiados", detail: "Clientes con cuenta pendiente" },
  { id: "proveedores", label: "Proveedores", detail: "Repartidores, productos y pagos pendientes" },
  { id: "reportes", label: "Reportes", detail: "Ventas por dia, ganancia y productos mas vendidos" },
];

const initialProducts = [
  { id: 1, code: "7790895000997", name: "Coca-Cola 500ml", category: "Bebidas", stock: 38, minStock: 12, price: 1800, cost: 1150 },
  { id: 2, code: "7790040111118", name: "Alfajor triple", category: "Golosinas", stock: 64, minStock: 20, price: 950, cost: 540 },
  { id: 3, code: "7791234567001", name: "Cigarrillos Marlboro", category: "Tabaco", stock: 9, minStock: 15, price: 3200, cost: 2650 },
  { id: 4, code: "7795550000124", name: "Yerba mate 1kg", category: "Almacen", stock: 6, minStock: 10, price: 2900, cost: 1980 },
  { id: 5, code: "7790080043210", name: "Agua mineral 1.5L", category: "Bebidas", stock: 28, minStock: 10, price: 1200, cost: 720 },
  { id: 6, code: "7797006000012", name: "Papas fritas 80g", category: "Snacks", stock: 22, minStock: 12, price: 1600, cost: 980 },
  { id: 7, code: "7798181000441", name: "Chocolate con leche", category: "Golosinas", stock: 14, minStock: 10, price: 1350, cost: 820 },
  { id: 8, code: "7791293000845", name: "Leche larga vida 1L", category: "Almacen", stock: 5, minStock: 12, price: 1500, cost: 1040 },
];

const initialSales = [
  { id: "K-501", items: "Coca-Cola 500ml, Alfajor triple", total: 2750, cost: 1690, method: "Efectivo", status: "Pagado", day: "Lun" },
  { id: "K-502", items: "Yerba mate 1kg", total: 2900, cost: 1980, method: "Mercado Pago", status: "Pagado", day: "Mar" },
  { id: "K-503", items: "Cigarrillos Marlboro", total: 3200, cost: 2650, method: "Cuenta", status: "Pendiente", day: "Mie", customer: "Cliente frecuente" },
];

const initialCustomers = [
  { id: 1, name: "Cliente frecuente", phone: "2604 112 410", debt: 4500 },
  { id: 2, name: "Vecino del barrio", phone: "2604 220 990", debt: 1800 },
  { id: 3, name: "Venta mostrador", phone: "-", debt: 0 },
];

const initialSuppliers = [
  { id: 1, name: "Distribuidora Bebidas Sur", phone: "2604 408 221", balance: 126000, products: ["Coca-Cola", "Agua mineral", "Energizantes"] },
  { id: 2, name: "Mayorista Golosinas", phone: "2604 771 290", balance: 84000, products: ["Alfajores", "Chocolates", "Snacks"] },
  { id: 3, name: "Reparto Almacen", phone: "2604 930 115", balance: 0, products: ["Yerba", "Leche", "Azucar"] },
];

function KioscoDemo() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [products, setProducts] = useState(initialProducts);
  const [sales, setSales] = useState(initialSales);
  const [customers, setCustomers] = useState(initialCustomers);
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [cart, setCart] = useState([]);
  return (
    <main className="min-h-screen bg-slate-100">
      <aside className="fixed left-0 top-0 hidden h-screen w-72 overflow-y-auto border-r border-slate-200 bg-[#07111F] p-6 pb-36 text-white lg:block">
        <Link to="/" className="cursor-pointer block">
          <h1 className="text-2xl font-black">Proyecto Prisma</h1>
          <p className="mt-1 text-sm text-slate-400">Demo Kiosco</p>
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
          <p className="text-sm font-bold text-[#00D38E]">Caja activa</p>
          <p className="mt-1 text-xs leading-5 text-slate-400">
            Demo temporal para mostrar ventas rapidas, stock y fiados.
          </p>
        </div>
      </aside>

      <section className="lg:ml-72">
        <div className="mx-auto max-w-7xl px-5 py-6 md:px-8">
          <div className="mb-6 flex items-center justify-between gap-3 lg:hidden">
            <div className="min-w-0">
              <h1 className="break-words text-xl font-black text-slate-950">
                Demo Kiosco
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

          <KioscoHeader />
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

          <KioscoStats products={products} sales={sales} customers={customers} />

          {activeSection === "dashboard" && (
            <div className="mt-8 grid gap-6 xl:grid-cols-3">
              <div className="xl:col-span-2">
                <QuickSale
                  products={products}
                  setProducts={setProducts}
                  sales={sales}
                  setSales={setSales}
                  customers={customers}
                  cart={cart}
                  setCart={setCart}
                />
              </div>
              <RecentSales sales={sales} />
            </div>
          )}

          {activeSection === "venta" && (
            <div className="mt-8">
              <QuickSale
                products={products}
                setProducts={setProducts}
                sales={sales}
                setSales={setSales}
                customers={customers}
                cart={cart}
                setCart={setCart}
              />
            </div>
          )}

          {activeSection === "productos" && (
            <div className="mt-8">
              <KioscoProducts products={products} setProducts={setProducts} />
            </div>
          )}

          {activeSection === "faltantes" && (
            <div className="mt-8">
              <KioscoMissing products={products} setProducts={setProducts} />
            </div>
          )}

          {activeSection === "fiados" && (
            <div className="mt-8">
              <KioscoDebts customers={customers} setCustomers={setCustomers} sales={sales} setSales={setSales} />
            </div>
          )}

          {activeSection === "proveedores" && (
            <div className="mt-8">
              <KioscoSuppliers suppliers={suppliers} setSuppliers={setSuppliers} />
            </div>
          )}

          {activeSection === "reportes" && (
            <div className="mt-8">
              <KioscoReports products={products} sales={sales} customers={customers} />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function KioscoHeader() {
  const whatsappMessage = encodeURIComponent(
    "Hola Federico, vi el demo de kiosco y quiero un sistema asi para mi negocio."
  );

  return (
    <header className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-bold text-[#00D38E]">Sistema demo</p>
          <h2 className="mt-2 text-3xl font-black text-slate-950 md:text-4xl">
            Kiosco Prisma
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            Venta rapida, caja diaria, stock, codigos de barra, fiados y proveedores.
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

function KioscoStats({ products, sales, customers }) {
  const total = sales.reduce((sum, sale) => sum + sale.total, 0);
  const lowStock = products.filter((product) => product.stock <= product.minStock).length;
  const pending = customers.reduce((sum, customer) => sum + customer.debt, 0);
  const stats = [
    { label: "Caja cargada", value: currency.format(total), detail: `${sales.length} tickets` },
    { label: "Productos", value: products.length, detail: "Con codigo y stock" },
    { label: "Stock bajo", value: lowStock, detail: "Reposicion necesaria" },
    { label: "Fiados", value: currency.format(pending), detail: "Pendiente de cobro" },
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

function QuickSale({ products, setProducts, sales, setSales, customers, cart, setCart }) {
  const [query, setQuery] = useState("");
  const [method, setMethod] = useState("Efectivo");
  const [customer, setCustomer] = useState(customers[0]?.name ?? "Venta mostrador");

  const filteredProducts = products.filter((product) =>
    `${product.code} ${product.name} ${product.category}`.toLowerCase().includes(query.toLowerCase())
  );
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cost = cart.reduce((sum, item) => sum + item.cost * item.quantity, 0);

  const addToCart = (product) => {
    setCart((current) => {
      const exists = current.find((item) => item.id === product.id);
      if (exists) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
    setQuery("");
  };

  const removeFromCart = (productId) => {
    setCart((current) => current.filter((item) => item.id !== productId));
  };

  const chargeSale = () => {
    if (!cart.length) return;

    setSales((current) => [
      {
        id: `K-${510 + current.length}`,
        items: cart.map((item) => `${item.quantity} x ${item.name}`).join(", "),
        total,
        cost,
        method,
        status: method === "Cuenta" ? "Pendiente" : "Pagado",
        day: "Vie",
        customer: method === "Cuenta" ? customer : "Venta mostrador",
      },
      ...current,
    ]);
    setProducts((current) =>
      current.map((product) => {
        const sold = cart.find((item) => item.id === product.id);
        return sold ? { ...product, stock: Math.max(0, product.stock - sold.quantity) } : product;
      })
    );
    setCart([]);
  };

  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-black text-slate-950">Venta rapida</h3>
        <p className="mt-1 text-sm text-slate-500">
          Busca por codigo de barra, nombre o categoria y arma el ticket.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Escanear o escribir codigo de barra"
            className="mb-4 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#00D38E] focus:bg-white"
          />
          <div className="grid gap-3 md:grid-cols-2">
            {filteredProducts.slice(0, 6).map((product) => (
              <button
                key={product.id}
                type="button"
                onClick={() => addToCart(product)}
                className="cursor-pointer rounded-2xl border border-slate-200 p-4 text-left hover:border-[#00D38E] hover:bg-[#00D38E]/5"
              >
                <p className="text-xs font-black text-slate-400">{product.code}</p>
                <p className="mt-1 font-black text-slate-950">{product.name}</p>
                <div className="mt-3 flex items-center justify-between gap-3 text-sm">
                  <span className="text-slate-500">Stock {product.stock}</span>
                  <span className="font-black text-slate-950">{currency.format(product.price)}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="mb-4 font-black text-slate-950">Ticket actual</p>
          <div className="space-y-3">
            {cart.map((item) => (
              <div key={item.id} className="flex flex-col gap-3 rounded-xl bg-white p-3 text-sm sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="break-words font-black text-slate-950">{item.quantity} x {item.name}</p>
                  <p className="text-slate-500">{currency.format(item.price)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                  className="cursor-pointer rounded-lg border border-slate-200 px-2 py-1 text-xs font-bold text-slate-500"
                >
                  Quitar
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl bg-white p-4">
            <p className="text-sm text-slate-500">Total</p>
            <p className="text-3xl font-black text-slate-950">{currency.format(total)}</p>
          </div>

          <div className="mt-4 grid gap-3">
            <select
              value={method}
              onChange={(event) => setMethod(event.target.value)}
              className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]"
            >
              <option>Efectivo</option>
              <option>Mercado Pago</option>
              <option>Tarjeta</option>
              <option>Cuenta</option>
            </select>
            {method === "Cuenta" && (
              <select
                value={customer}
                onChange={(event) => setCustomer(event.target.value)}
                className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]"
              >
                {customers.map((item) => (
                  <option key={item.id}>{item.name}</option>
                ))}
              </select>
            )}
            <button
              type="button"
              onClick={chargeSale}
              className="cursor-pointer rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-[#00D38E] hover:text-[#07111F]"
            >
              Cobrar venta
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function RecentSales({ sales }) {
  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
      <h3 className="mb-6 text-2xl font-black text-slate-950">Ventas recientes</h3>
      <div className="space-y-4">
        {sales.slice(0, 5).map((sale) => (
          <article key={sale.id} className="rounded-2xl border border-slate-200 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <p className="text-xs font-black text-slate-400">{sale.id}</p>
                <p className="mt-1 break-words text-sm font-bold text-slate-950">{sale.items}</p>
                <p className="mt-1 text-xs text-slate-500">{sale.method}</p>
              </div>
              <p className="shrink-0 font-black text-slate-950 sm:text-right">{currency.format(sale.total)}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function KioscoProducts({ products, setProducts }) {
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    code: "",
    name: "",
    category: "Bebidas",
    stock: "",
    minStock: "",
    price: "",
    cost: "",
  });

  const filtered = products.filter((product) =>
    `${product.code} ${product.name} ${product.category}`.toLowerCase().includes(search.toLowerCase())
  );

  const updateForm = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const addProduct = (event) => {
    event.preventDefault();
    if (!form.name.trim()) return;
    setProducts((current) => [
      {
        id: Date.now(),
        code: form.code.trim() || String(Date.now()).slice(-8),
        name: form.name.trim(),
        category: form.category,
        stock: Number(form.stock || 0),
        minStock: Number(form.minStock || 0),
        price: Number(form.price || 0),
        cost: Number(form.cost || 0),
      },
      ...current,
    ]);
    setForm({ code: "", name: "", category: "Bebidas", stock: "", minStock: "", price: "", cost: "" });
  };

  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-black text-slate-950">Productos</h3>
        <p className="mt-1 text-sm text-slate-500">
          Carga productos con codigo, precio, costo y stock.
        </p>
      </div>
      <form onSubmit={addProduct} className="mb-6 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 lg:grid-cols-7">
        <input value={form.code} onChange={(event) => updateForm("code", event.target.value)} placeholder="Codigo" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]" />
        <input value={form.name} onChange={(event) => updateForm("name", event.target.value)} placeholder="Producto" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E] lg:col-span-2" />
        <select value={form.category} onChange={(event) => updateForm("category", event.target.value)} className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]">
          <option>Bebidas</option>
          <option>Golosinas</option>
          <option>Almacen</option>
          <option>Snacks</option>
          <option>Tabaco</option>
        </select>
        <input type="number" value={form.stock} onChange={(event) => updateForm("stock", event.target.value)} placeholder="Stock" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]" />
        <input type="number" value={form.price} onChange={(event) => updateForm("price", event.target.value)} placeholder="Precio" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]" />
        <input type="number" value={form.cost} onChange={(event) => updateForm("cost", event.target.value)} placeholder="Costo" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]" />
        <input type="number" value={form.minStock} onChange={(event) => updateForm("minStock", event.target.value)} placeholder="Minimo" className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]" />
        <button className="cursor-pointer rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-[#00D38E] hover:text-[#07111F] lg:col-span-6 lg:w-fit">
          Agregar producto
        </button>
      </form>

      <input
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Buscar por codigo, producto o categoria"
        className="mb-5 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#00D38E] focus:bg-white"
      />

      <div className="grid gap-3 md:hidden">
        {filtered.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
      <div className="hidden overflow-hidden rounded-2xl border border-slate-200 md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-5 py-4 font-bold">Codigo</th>
                <th className="px-5 py-4 font-bold">Producto</th>
                <th className="px-5 py-4 font-bold">Categoria</th>
                <th className="px-5 py-4 font-bold">Stock</th>
                <th className="px-5 py-4 font-bold">Precio</th>
                <th className="px-5 py-4 font-bold">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((product) => {
                const isLow = product.stock <= product.minStock;
                return (
                  <tr key={product.id} className="hover:bg-slate-50">
                    <td className="px-5 py-4 font-bold text-slate-500">{product.code}</td>
                    <td className="px-5 py-4 font-bold text-slate-950">{product.name}</td>
                    <td className="px-5 py-4 text-slate-600">{product.category}</td>
                    <td className="px-5 py-4 text-slate-600">{product.stock}</td>
                    <td className="px-5 py-4 font-bold text-slate-950">{currency.format(product.price)}</td>
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

function ProductCard({ product }) {
  const isLow = product.stock <= product.minStock;
  return (
    <article className="rounded-2xl border border-slate-200 p-4">
      <p className="text-xs font-black text-slate-400">{product.code}</p>
      <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="break-words font-black text-slate-950">{product.name}</p>
          <p className="text-sm text-slate-500">{product.category}</p>
        </div>
        <span className={`w-fit shrink-0 rounded-full px-3 py-1 text-xs font-bold ${isLow ? "bg-red-100 text-red-700" : "bg-[#00D38E]/10 text-emerald-700"}`}>
          {isLow ? "Bajo" : "OK"}
        </span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
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

function KioscoMissing({ products, setProducts }) {
  const missing = products.filter((product) => product.stock <= product.minStock);
  const restock = (productId) => {
    setProducts((current) =>
      current.map((product) =>
        product.id === productId ? { ...product, stock: product.stock + Math.max(10, product.minStock) } : product
      )
    );
  };

  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
      <h3 className="mb-6 text-2xl font-black text-slate-950">Faltantes</h3>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {missing.map((product) => (
          <article key={product.id} className="rounded-2xl border border-red-100 bg-red-50/50 p-4">
            <p className="font-black text-slate-950">{product.name}</p>
            <p className="mt-1 text-sm text-slate-500">{product.category} · Codigo {product.code}</p>
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
            <button
              type="button"
              onClick={() => restock(product.id)}
              className="cursor-pointer mt-4 w-full rounded-xl bg-slate-950 px-4 py-2 text-sm font-bold text-white hover:bg-[#00D38E] hover:text-[#07111F]"
            >
              Simular reposicion
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function KioscoDebts({ customers, setCustomers, sales, setSales }) {
  const pendingSales = sales.filter((sale) => sale.status === "Pendiente");
  const clearDebt = (customerId, name) => {
    setCustomers((current) => current.map((customer) => customer.id === customerId ? { ...customer, debt: 0 } : customer));
    setSales((current) => current.map((sale) => sale.customer === name ? { ...sale, status: "Pagado", method: "Cobrado" } : sale));
  };

  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-black text-slate-950">Fiados y cuentas</h3>
        <p className="mt-1 text-sm text-slate-500">Clientes con saldo pendiente y tickets a cuenta.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {customers.map((customer) => (
          <article key={customer.id} className="rounded-2xl border border-slate-200 p-4">
            <p className="font-black text-slate-950">{customer.name}</p>
            <p className="mt-1 text-sm text-slate-500">{customer.phone}</p>
            <div className="mt-4 rounded-xl bg-slate-50 p-3">
              <p className="text-xs font-bold text-slate-500">Saldo pendiente</p>
              <p className={customer.debt > 0 ? "mt-1 text-xl font-black text-amber-700" : "mt-1 text-xl font-black text-emerald-700"}>
                {customer.debt > 0 ? currency.format(customer.debt) : "Al dia"}
              </p>
            </div>
            {customer.debt > 0 && (
              <button
                type="button"
                onClick={() => clearDebt(customer.id, customer.name)}
                className="cursor-pointer mt-4 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                Marcar cobrado
              </button>
            )}
          </article>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {pendingSales.map((sale) => (
          <article key={sale.id} className="rounded-2xl border border-amber-100 bg-amber-50/50 p-4">
            <p className="text-xs font-black text-slate-400">{sale.id}</p>
            <p className="mt-1 font-black text-slate-950">{sale.customer}</p>
            <p className="mt-1 text-sm text-slate-500">{sale.items}</p>
            <p className="mt-3 text-xl font-black text-amber-700">{currency.format(sale.total)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function KioscoSuppliers({ suppliers, setSuppliers }) {
  const clearBalance = (supplierId) => {
    setSuppliers((current) => current.map((supplier) => supplier.id === supplierId ? { ...supplier, balance: 0 } : supplier));
  };

  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
      <h3 className="mb-6 text-2xl font-black text-slate-950">Proveedores</h3>
      <div className="grid gap-4 lg:grid-cols-2">
        {suppliers.map((supplier) => (
          <article key={supplier.id} className="rounded-2xl border border-slate-200 p-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="font-black text-slate-950">{supplier.name}</p>
                <p className="text-sm text-slate-500">{supplier.phone}</p>
              </div>
              <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{supplier.products.length} rubros</span>
            </div>
            <div className="mt-4 rounded-xl bg-slate-50 p-3">
              <p className="text-xs font-bold text-slate-500">Cuenta pendiente</p>
              <p className={supplier.balance > 0 ? "mt-1 text-xl font-black text-amber-700" : "mt-1 text-xl font-black text-emerald-700"}>
                {supplier.balance > 0 ? currency.format(supplier.balance) : "Al dia"}
              </p>
              {supplier.balance > 0 && (
                <button
                  type="button"
                  onClick={() => clearBalance(supplier.id)}
                  className="cursor-pointer mt-3 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100"
                >
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

function KioscoReports({ products, sales, customers }) {
  const days = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
  const daily = days.map((day) => {
    const daySales = sales.filter((sale) => sale.day === day);
    const total = daySales.reduce((sum, sale) => sum + sale.total, 0);
    const cost = daySales.reduce((sum, sale) => sum + sale.cost, 0);
    return { label: day, sales: total, profit: Math.max(0, total - cost) };
  });
  const totalSales = sales.reduce((sum, sale) => sum + sale.total, 0);
  const totalProfit = sales.reduce((sum, sale) => sum + Math.max(0, sale.total - sale.cost), 0);
  const debt = customers.reduce((sum, customer) => sum + customer.debt, 0);
  const lowStock = products.filter((product) => product.stock <= product.minStock).length;
  const topProducts = products
    .map((product) => ({
      name: product.name,
      sold: sales.filter((sale) => sale.items.includes(product.name)).length,
    }))
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 5);

  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-black text-slate-950">Reportes</h3>
        <p className="mt-1 text-sm text-slate-500">
          Caja, ganancia, fiados, faltantes y productos mas vendidos.
        </p>
      </div>
      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <ReportCard label="Ventas" value={currency.format(totalSales)} />
        <ReportCard label="Ganancia" value={currency.format(totalProfit)} accent />
        <ReportCard label="Fiados" value={currency.format(debt)} />
        <ReportCard label="Faltantes" value={lowStock} />
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        <ChartBox title="Ventas por dia" data={daily} valueKey="sales" />
        <ChartBox title="Ganancias por dia" data={daily} valueKey="profit" dark />
        <article className="rounded-2xl border border-slate-200 p-5 xl:col-span-2">
          <p className="mb-4 font-black text-slate-950">Productos mas vendidos</p>
          <div className="grid gap-3 md:grid-cols-5">
            {topProducts.map((product) => (
              <div key={product.name} className="rounded-xl bg-slate-50 p-3">
                <p className="text-sm font-black text-slate-950">{product.name}</p>
                <p className="mt-1 text-xs text-slate-500">{product.sold} ventas registradas</p>
              </div>
            ))}
          </div>
        </article>
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

export default KioscoDemo;
