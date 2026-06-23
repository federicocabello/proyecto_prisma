import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import FerreteriaHeader from "./components/FerreteriaHeader";
import FerreteriaProducts from "./components/FerreteriaProducts";
import FerreteriaSales from "./components/FerreteriaSales";
import FerreteriaClients from "./components/FerreteriaClients";
import FerreteriaSuppliers from "./components/FerreteriaSuppliers";
import FerreteriaQuotes from "./components/FerreteriaQuotes";
import FerreteriaOrders from "./components/FerreteriaOrders";
import FerreteriaMissing from "./components/FerreteriaMissing";
import DemoNotice from "../components/DemoNotice";

const menuItems = [
  { id: "dashboard", label: "Mostrador", detail: "Venta rapida y movimientos del dia" },
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
  { id: 1, name: "Martillo profesional", category: "Herramientas", stock: 24, minStock: 8, costPrice: 9800, profitPercent: 58, price: 15500 },
  { id: 2, name: "Taladro electrico", category: "Herramientas electricas", stock: 6, minStock: 5, costPrice: 64200, profitPercent: 40, price: 89900 },
  { id: 3, name: "Caja de tornillos", category: "Ferreteria general", stock: 42, minStock: 12, costPrice: 4800, profitPercent: 56, price: 7500 },
  { id: 4, name: "Cinta metrica", category: "Medicion", stock: 3, minStock: 10, costPrice: 3600, profitPercent: 64, price: 5900 },
  { id: 5, name: "Disco de corte 115mm", category: "Herramientas electricas", stock: 18, minStock: 10, costPrice: 2100, profitPercent: 62, price: 3400 },
  { id: 6, name: "Llave francesa 10", category: "Herramientas", stock: 7, minStock: 6, costPrice: 8200, profitPercent: 56, price: 12800 },
  { id: 7, name: "Tarugo plastico N8", category: "Ferreteria general", stock: 120, minStock: 50, costPrice: 45, profitPercent: 78, price: 80 },
  { id: 8, name: "Pintura antioxido 1L", category: "Pinturas", stock: 5, minStock: 8, costPrice: 9800, profitPercent: 52, price: 14900 },
];

const initialClients = [
  {
    id: 1,
    name: "Carlos Perez",
    phone: "2604 521 118",
    address: "Av. Mitre 1240",
    company: "",
    type: "Particular",
    debt: 0,
    notes: "Compra frecuente de herramientas manuales.",
    files: ["dni-carlos.jpg"],
  },
  {
    id: 2,
    name: "Obra San Martin",
    phone: "2604 889 302",
    address: "San Martin 820",
    company: "Constructora San Martin",
    type: "Cuenta corriente",
    debt: 320750,
    notes: "Autoriza compras hasta $500.000 mensuales.",
    files: ["constancia-afip.pdf", "autorizacion-compras.pdf"],
  },
  {
    id: 3,
    name: "Metalurgica Norte",
    phone: "2604 667 901",
    address: "Parque Industrial, nave 4",
    company: "Metalurgica Norte SRL",
    type: "Empresa",
    debt: 188200,
    notes: "Retira discos, mechas y llaves semanalmente.",
    files: ["contrato-cuenta-corriente.pdf"],
  },
];

const getInputDate = (daysOffset = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 10);
};

const getSaleTime = (date = new Date()) =>
  date.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });

const initialSales = [
  { id: "V-2041", customer: "Carlos Perez", total: 145500, cost: 97000, method: "Efectivo", status: "Pagado", date: "Hoy", dateISO: getInputDate(), time: "11:40", createdAt: `${getInputDate()}T11:40:00`, day: "Lun", items: "Herramientas y tornillos" },
  { id: "V-2042", customer: "Maria Lopez", total: 89000, cost: 61000, method: "Tarjeta", status: "Pagado", date: "Hoy", dateISO: getInputDate(), time: "09:15", createdAt: `${getInputDate()}T09:15:00`, day: "Mar", items: "Pintura y rodillos" },
  { id: "V-2043", customer: "Obra San Martin", total: 320750, cost: 221000, method: "Cuenta corriente", status: "Pendiente", date: "Ayer", dateISO: getInputDate(-1), time: "18:05", createdAt: `${getInputDate(-1)}T18:05:00`, day: "Mie", items: "Materiales electricos" },
  { id: "V-2044", customer: "Metalurgica Norte", total: 188200, cost: 126000, method: "Cuenta corriente", status: "Vence pronto", date: "Lunes", dateISO: getInputDate(-3), time: "16:20", createdAt: `${getInputDate(-3)}T16:20:00`, day: "Jue", items: "Discos, mechas y llaves" },
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

          {activeSection === "dashboard" && (
            <>
              <DashboardSummary products={products} sales={sales} />

              <div className="mt-8">
                <DashboardQuickSale
                  sales={sales}
                  setSales={setSales}
                  products={products}
                  setProducts={setProducts}
                  clients={clients}
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

const currency = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

const dayLabels = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];

function DashboardSummary({ products, sales }) {
  const today = getInputDate();
  const todaySaleItems = sales.filter(
    (sale) => sale.dateISO === today || sale.date === "Hoy" || sale.date === "Ahora"
  );
  const todaySales = todaySaleItems.reduce((sum, sale) => sum + sale.total, 0);
  const todayProfit = todaySaleItems.reduce(
    (sum, sale) => sum + (sale.total - (sale.cost ?? sale.total * 0.68)),
    0
  );
  const lowStock = products.filter((product) => product.stock <= product.minStock);
  const pendingCollections = sales.filter((sale) => sale.status !== "Pagado");
  const pendingTotal = pendingCollections.reduce((sum, sale) => sum + sale.total, 0);

  const cards = [
    {
      label: "Venta de hoy",
      value: currency.format(todaySales),
      detail: `Ganancia: ${currency.format(todayProfit)}`,
      tone: "text-emerald-700",
    },
    {
      label: "Productos bajos en stock",
      value: lowStock.length,
      detail: lowStock.length ? "Reponer para no perder ventas" : "Stock controlado",
      tone: lowStock.length ? "text-amber-700" : "text-emerald-700",
    },
    {
      label: "Cobranzas por realizar",
      value: currency.format(pendingTotal),
      detail: pendingCollections.length
        ? `${pendingCollections.length} ventas pendientes`
        : "Sin cobranzas pendientes",
      tone: pendingCollections.length ? "text-amber-700" : "text-emerald-700",
    },
  ];

  return (
    <section className="mt-6 grid gap-4 md:grid-cols-3">
      {cards.map((card) => (
        <article
          key={card.label}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <p className="text-sm font-semibold text-slate-500">{card.label}</p>
          <p className={`mt-3 break-words text-3xl font-black ${card.tone}`}>
            {card.value}
          </p>
          <p className="mt-2 text-sm text-slate-500">{card.detail}</p>
        </article>
      ))}
    </section>
  );
}

function DashboardQuickSale({ products, setProducts, sales, setSales, clients }) {
  const [search, setSearch] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id ?? "");
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState(products[0]?.price ?? 0);
  const [items, setItems] = useState([]);
  const [customer, setCustomer] = useState("Venta mostrador");
  const [method, setMethod] = useState("Efectivo");

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return products.slice(0, 6);

    return products
      .filter((product) =>
        `${product.name} ${product.category}`.toLowerCase().includes(term)
      )
      .slice(0, 8);
  }, [products, search]);

  const selectedProduct = products.find(
    (product) => product.id === Number(selectedProductId)
  );

  const total = items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );
  const totalCost = items.reduce(
    (sum, item) => sum + item.quantity * (item.costPrice ?? item.unitPrice * 0.68),
    0
  );

  const selectProduct = (product) => {
    setSelectedProductId(product.id);
    setUnitPrice(product.price);
    setSearch(product.name);
  };

  const handleSearchChange = (value) => {
    setSearch(value);

    const term = value.trim().toLowerCase();
    if (!term) return;

    const firstMatch = products.find((product) =>
      `${product.name} ${product.category}`.toLowerCase().includes(term)
    );

    if (firstMatch) {
      setSelectedProductId(firstMatch.id);
      setUnitPrice(firstMatch.price);
    }
  };

  const handleAddItemKeyDown = (event) => {
    if (event.key !== "Enter") return;

    event.preventDefault();
    addItem(event);
  };

  const addItem = (event) => {
    event.preventDefault();
    const searchedProduct = search.trim() ? filteredProducts[0] : null;
    const productToAdd = searchedProduct || selectedProduct;
    if (!productToAdd) return;

    const safeQuantity = Math.max(1, Number(quantity || 1));
    const safePrice = Math.max(0, Number(unitPrice || 0));

    setItems((current) => {
      const existing = current.find(
        (item) => item.productId === productToAdd.id && item.unitPrice === safePrice
      );

      if (existing) {
        return current.map((item) =>
          item.productId === productToAdd.id && item.unitPrice === safePrice
            ? { ...item, quantity: item.quantity + safeQuantity }
            : item
        );
      }

      return [
        ...current,
        {
          productId: productToAdd.id,
          name: productToAdd.name,
          category: productToAdd.category,
          quantity: safeQuantity,
          unitPrice: safePrice,
          costPrice: productToAdd.costPrice ?? Math.round(productToAdd.price * 0.68),
        },
      ];
    });

    setSelectedProductId(productToAdd.id);
    setUnitPrice(productToAdd.price);
    setQuantity(1);
    setSearch("");
  };

  const removeItem = (productId, price) => {
    setItems((current) =>
      current.filter((item) => !(item.productId === productId && item.unitPrice === price))
    );
  };

  const registerSale = () => {
    if (!items.length) return;

    const now = new Date();
    const estimatedCost = Math.round(totalCost);

    setSales((current) => [
      {
        id: `V-${2050 + current.length}`,
        customer,
        total,
        cost: estimatedCost,
        method,
        status: "Pagado",
        date: "Ahora",
        dateISO: getInputDate(),
        time: getSaleTime(now),
        createdAt: now.toISOString(),
        day: dayLabels[new Date().getDay() % dayLabels.length],
        items: items.map((item) => `${item.quantity} x ${item.name}`).join(", "),
      },
      ...current,
    ]);

    setProducts((current) =>
      current.map((product) => {
        const sold = items
          .filter((item) => item.productId === product.id)
          .reduce((sum, item) => sum + item.quantity, 0);

        return sold
          ? { ...product, stock: Math.max(0, product.stock - sold) }
          : product;
      })
    );

    setItems([]);
    setCustomer("Venta mostrador");
    setMethod("Efectivo");
  };

  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-black text-slate-950">
          Buscar producto y cargar venta
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Busca por nombre, selecciona el producto, ajusta cantidad y precio, y armá la lista de venta.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div>
          <form
            onSubmit={addItem}
            className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 lg:grid-cols-6"
          >
            <div className="lg:col-span-6">
              <label className="grid gap-1">
                <span className="px-1 text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                  Buscar producto
                </span>
                <input
                  type="search"
                  value={search}
                  onChange={(event) => handleSearchChange(event.target.value)}
                  onFocus={() => setSearch("")}
                  onKeyDown={handleAddItemKeyDown}
                  placeholder="Ej: martillo, taladro, tornillos..."
                  className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]"
                />
              </label>
            </div>

            <div className="grid max-h-96 gap-2 overflow-y-auto pr-1 lg:col-span-6">
              {filteredProducts.map((product) => {
                const isSelected = product.id === Number(selectedProductId);
                const isLow = product.stock <= product.minStock;

                return (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => selectProduct(product)}
                    className={`cursor-pointer rounded-2xl border p-3 text-left transition ${
                      isSelected
                        ? "border-[#00D38E] bg-[#00D38E]/10"
                        : "border-slate-200 bg-white hover:border-[#00D38E]"
                    }`}
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0">
                        <p className="break-words font-black text-slate-950">
                          {product.name}
                        </p>
                        <p className="text-sm text-slate-500">
                          {product.category} · Stock {product.stock}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        {isLow && (
                          <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700">
                            Bajo
                          </span>
                        )}
                        <span className="font-black text-slate-950">
                          {currency.format(product.price)}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <label className="grid gap-1 lg:col-span-2">
              <span className="px-1 text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                Cantidad
              </span>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
                onKeyDown={handleAddItemKeyDown}
                className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]"
              />
            </label>

            <label className="grid gap-1 lg:col-span-2">
              <span className="px-1 text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                Precio unitario
              </span>
              <input
                type="number"
                min="0"
                value={unitPrice}
                onChange={(event) => setUnitPrice(event.target.value)}
                onKeyDown={handleAddItemKeyDown}
                className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]"
              />
            </label>

            <div className="rounded-xl bg-white px-3 py-3 text-sm font-black text-slate-950 lg:col-span-2">
              Subtotal: {currency.format(Number(quantity || 0) * Number(unitPrice || 0))}
            </div>

            <button
              type="submit"
              className="cursor-pointer rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-[#00D38E] hover:text-[#07111F] lg:col-span-6"
            >
              Cargar producto a la venta
            </button>
          </form>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-black text-slate-950">Lista de venta</p>
              <p className="text-sm text-slate-500">
                Productos cargados para registrar.
              </p>
            </div>
            <p className="text-2xl font-black text-slate-950">
              {currency.format(total)}
            </p>
          </div>

          <div className="max-h-96 space-y-3 overflow-y-auto pr-1">
            {items.map((item) => (
              <article key={`${item.productId}-${item.unitPrice}`} className="rounded-xl bg-white p-3">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <p className="break-words font-black text-slate-950">
                      {item.quantity} x {item.name}
                    </p>
                    <p className="text-sm text-slate-500">
                      {currency.format(item.unitPrice)} c/u
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <p className="font-black text-slate-950">
                      {currency.format(item.quantity * item.unitPrice)}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId, item.unitPrice)}
                      className="cursor-pointer rounded-lg border border-slate-200 px-2 py-1 text-xs font-bold text-slate-500"
                    >
                      Quitar
                    </button>
                  </div>
                </div>
              </article>
            ))}

            {!items.length && (
              <p className="rounded-xl bg-white p-4 text-sm font-bold text-slate-400">
                Todavía no cargaste productos a la venta.
              </p>
            )}
          </div>

          <div className="mt-4 grid gap-3">
            <select
              value={customer}
              onChange={(event) => setCustomer(event.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]"
            >
              <option value="Venta mostrador">Venta mostrador</option>
              {clients.map((client) => (
                <option key={client.id} value={client.name}>
                  {client.name}
                </option>
              ))}
            </select>

            <select
              value={method}
              onChange={(event) => setMethod(event.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold outline-none focus:border-[#00D38E]"
            >
              <option>Efectivo</option>
              <option>Mercado Pago</option>
              <option>Transferencia</option>
              <option>Tarjeta</option>
              <option>Cuenta corriente</option>
            </select>

            <button
              type="button"
              onClick={registerSale}
              className="cursor-pointer rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-[#00D38E] hover:text-[#07111F]"
            >
              Registrar venta
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FerreteriaDemo;
