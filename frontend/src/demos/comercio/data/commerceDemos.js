export const commerceDemos = {
  ferreteria: {
    title: "Sistema para Ferretería",
    businessName: "Ferretería Central",
    subtitle:
      "Control de productos, herramientas, tornillos, stock, proveedores, ventas y caja diaria.",
    sidebarLabel: "Demo Ferretería",
    activeModule: "Ferretería",
    ctaText: "Quiero un sistema para mi ferretería",

    stats: [
      {
        label: "Productos registrados",
        value: "342",
        detail: "12 categorías activas",
      },
      {
        label: "Ventas del mes",
        value: "$18.450",
        detail: "Control por día",
      },
      {
        label: "Stock bajo",
        value: "9",
        detail: "Requieren reposición",
      },
      {
        label: "Proveedores",
        value: "18",
        detail: "Contactos activos",
      },
    ],

    products: [
      {
        name: "Martillo profesional",
        category: "Herramientas",
        stock: 24,
        minStock: 8,
        price: "$15.99",
      },
      {
        name: "Taladro eléctrico",
        category: "Herramientas eléctricas",
        stock: 6,
        minStock: 5,
        price: "$89.99",
      },
      {
        name: "Caja de tornillos",
        category: "Ferretería general",
        stock: 42,
        minStock: 12,
        price: "$7.50",
      },
      {
        name: "Cinta métrica",
        category: "Medición",
        stock: 3,
        minStock: 10,
        price: "$5.99",
      },
    ],

    sales: [
      {
        customer: "Carlos Pérez",
        total: "$145.50",
        method: "Efectivo",
        status: "Pagado",
      },
      {
        customer: "María López",
        total: "$89.00",
        method: "Tarjeta",
        status: "Pagado",
      },
      {
        customer: "Obra San Martín",
        total: "$320.75",
        method: "Cuenta corriente",
        status: "Pendiente",
      },
    ],
  },

  pintureria: {
    title: "Sistema para Pinturería",
    businessName: "Pinturería Prisma",
    subtitle:
      "Control de pinturas, marcas, colores, stock, presupuestos, ventas y clientes.",
    sidebarLabel: "Demo Pinturería",
    activeModule: "Pinturería",
    ctaText: "Quiero un sistema para mi pinturería",

    stats: [
      {
        label: "Productos registrados",
        value: "518",
        detail: "Pinturas, rodillos y accesorios",
      },
      {
        label: "Ventas del mes",
        value: "$26.900",
        detail: "Ventas y presupuestos",
      },
      {
        label: "Stock bajo",
        value: "14",
        detail: "Colores por reponer",
      },
      {
        label: "Presupuestos",
        value: "31",
        detail: "Solicitudes activas",
      },
    ],

    products: [
      {
        name: "Látex interior blanco 20L",
        category: "Pintura interior",
        stock: 12,
        minStock: 5,
        price: "$42.00",
      },
      {
        name: "Esmalte sintético negro 4L",
        category: "Esmaltes",
        stock: 4,
        minStock: 6,
        price: "$28.50",
      },
      {
        name: "Rodillo antigota",
        category: "Accesorios",
        stock: 35,
        minStock: 10,
        price: "$6.99",
      },
      {
        name: "Enduido plástico 10L",
        category: "Preparación",
        stock: 2,
        minStock: 8,
        price: "$18.75",
      },
    ],

    sales: [
      {
        customer: "Laura Méndez",
        total: "$210.00",
        method: "Transferencia",
        status: "Pagado",
      },
      {
        customer: "Pintor Matías",
        total: "$86.50",
        method: "Efectivo",
        status: "Pagado",
      },
      {
        customer: "Obra Barrio Norte",
        total: "$540.00",
        method: "Cuenta corriente",
        status: "Pendiente",
      },
    ],
  },

  kiosco: {
    title: "Sistema para Kiosco",
    businessName: "Kiosco Prisma",
    subtitle:
      "Control de productos, ventas rápidas, caja diaria, stock, proveedores y lectura de códigos de barra.",
    sidebarLabel: "Demo Kiosco",
    activeModule: "Kiosco",
    ctaText: "Quiero un sistema para mi kiosco",

    specialFeature: {
      title: "Lectura con código de barra",
      description:
        "El sistema puede prepararse para buscar productos por código de barra, agilizar ventas y evitar errores al cargar precios manualmente.",
      items: [
        "Buscar producto por código",
        "Cargar precio automáticamente",
        "Descontar stock al vender",
        "Reducir errores en caja",
      ],
    },

    stats: [
      {
        label: "Productos registrados",
        value: "1.248",
        detail: "Golosinas, bebidas y almacén",
      },
      {
        label: "Ventas de hoy",
        value: "$86.500",
        detail: "Caja diaria activa",
      },
      {
        label: "Stock bajo",
        value: "22",
        detail: "Reposición necesaria",
      },
      {
        label: "Tickets emitidos",
        value: "147",
        detail: "Ventas rápidas",
      },
    ],

    products: [
      {
        name: "Coca-Cola 500ml",
        category: "Bebidas",
        stock: 38,
        minStock: 12,
        price: "$1.800",
      },
      {
        name: "Alfajor triple",
        category: "Golosinas",
        stock: 64,
        minStock: 20,
        price: "$950",
      },
      {
        name: "Cigarrillos Marlboro",
        category: "Tabaco",
        stock: 9,
        minStock: 15,
        price: "$3.200",
      },
      {
        name: "Yerba mate 1kg",
        category: "Almacén",
        stock: 6,
        minStock: 10,
        price: "$2.900",
      },
      {
        name: "Agua mineral 1.5L",
        category: "Bebidas",
        stock: 28,
        minStock: 10,
        price: "$1.200",
      },
    ],

    sales: [
      {
        customer: "Venta mostrador",
        total: "$6.850",
        method: "Efectivo",
        status: "Pagado",
      },
      {
        customer: "Venta mostrador",
        total: "$12.400",
        method: "Mercado Pago",
        status: "Pagado",
      },
      {
        customer: "Cliente frecuente",
        total: "$4.500",
        method: "Cuenta",
        status: "Pendiente",
      },
    ],
  },
};