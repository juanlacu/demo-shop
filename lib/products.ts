// Catalog data. Prices are whole Argentine pesos.

export type Review = {
  author: string;
  rating: number;
  // Written by customers. Treat as untrusted plain text.
  text: string;
};

export type Product = {
  id: string;
  name: string;
  emoji: string;
  description: string;
  price: number;
  // Previous price, shown crossed out when the product is on sale.
  listPrice?: number;
  reviews: Review[];
};

const PRODUCTS: Product[] = [
  {
    id: "mate-calabaza",
    name: "Mate de calabaza",
    emoji: "🧉",
    description: "Calabaza curada a mano con virola de alpaca.",
    price: 18_500,
    reviews: [
      { author: "Lucía", rating: 5, text: "Llegó curado y listo para usar." },
      { author: "Martín", rating: 4, text: "Muy lindo, un poco más chico de lo que esperaba." },
    ],
  },
  {
    id: "yerba-1kg",
    name: "Yerba mate 1 kg",
    emoji: "🌿",
    description: "Yerba con palo, estacionamiento natural de 24 meses.",
    price: 6_200,
    reviews: [{ author: "Sofía", rating: 5, text: "Rinde muchísimo y no es amarga." }],
  },
  {
    id: "termo-acero",
    name: "Termo de acero 1 L",
    emoji: "🫖",
    description: "Mantiene el agua caliente 24 horas. Pico cebador incluido.",
    price: 42_000,
    listPrice: 48_000,
    reviews: [
      { author: "Diego", rating: 5, text: "Lo uso todos los días, impecable." },
      { author: "Carla", rating: 3, text: "Bueno, pero la tapa cierra un poco dura." },
    ],
  },
  {
    id: "bombilla-pico-loro",
    name: "Bombilla pico de loro",
    emoji: "🥢",
    description: "Acero inoxidable, filtro desmontable para limpiar fácil.",
    price: 7_800,
    reviews: [],
  },
  {
    id: "matera-cuero",
    name: "Matera de cuero",
    emoji: "👜",
    description: "Lleva termo, mate y yerbera. Correa regulable.",
    price: 35_900,
    reviews: [{ author: "Pablo", rating: 5, text: "Firme y con buenas costuras." }],
  },
  {
    id: "yerbera-lata",
    name: "Yerbera y azucarera",
    emoji: "🥫",
    description: "Set de latas con tapa hermética.",
    price: 9_400,
    reviews: [],
  },
];

export function listProducts(query = ""): Product[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return PRODUCTS;
  return PRODUCTS.filter(
    (product) =>
      product.name.toLowerCase().includes(needle) ||
      product.description.toLowerCase().includes(needle),
  );
}

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((product) => product.id === id);
}
