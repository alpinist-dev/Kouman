import ProductDetail from "./ProductDetail";

interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  images: string[];
  sizes: string[];
}

const products: Product[] = [
  {
    id: 1,
    name: "King Kourosh T-Shirt",
    price: "$35.00",
    description:
      "Experience the ultimate vibe with the King Kourosh T-Shirt. High-quality fabric, perfect fit, and bold style that rules the streets.",
    images: ["https://i.ibb.co/rfmc4Vg5/T9.png"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "Dogm Nabash T-Shirt",
    price: "$35.00",
    description:
      "Stay bold and confident with the Dogm Nabash T-Shirt. Perfect for everyday wear with a sleek, stylish design.",
    images: ["https://i.ibb.co/GzjdRjW/T-1.png"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 3,
    name: "Dogm Nabash T-Shirt",
    price: "$35.00",
    description:
      "Comfort meets style in the Dogm Nabash T-Shirt. High-quality material for ultimate softness and durability.",
    images: ["https://i.ibb.co/Z6xGNZfS/T2.png"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 4,
    name: "Zolaldel T-Shirt",
    price: "$35.00",
    description:
      "Express yourself with the Zolaldel T-Shirt. Bold graphics and premium fabric for a standout look.",
    images: ["https://i.ibb.co/WN0V7TFq/T3.png"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 5,
    name: "JooJoo T-Shirt",
    price: "$35.00",
    description:
      "The JooJoo T-Shirt combines comfort and style effortlessly. Perfect fit for a casual yet trendy outfit.",
    images: ["https://i.ibb.co/XfR48rnF/T4.png"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 6,
    name: "Mia Vs Kourosh T-Shirt",
    price: "$35.00",
    description:
      "Make a statement with the Mia Vs Kourosh T-Shirt. Unique design and soft fabric for everyday wear.",
    images: ["https://i.ibb.co/HTTFYN6P/T5.png"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 7,
    name: "Iman Desktop",
    price: "$35.00",
    description:
      "The Iman Desktop T-Shirt features a sleek design with ultimate comfort. Perfect for casual outings or work-from-home days.",
    images: ["https://i.ibb.co/ccscStpw/T6.png"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 8,
    name: "Kouman Cart Grey",
    price: "$35.00",
    description:
      "Kouman Cart Grey T-Shirt, a modern classic. Soft fabric with a stylish grey design that pairs well with any outfit.",
    images: ["https://i.ibb.co/JWwT3pqy/T7.png"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 9,
    name: "Kouman Cart Grey",
    price: "$35.00",
    description:
      "Classic Kouman Cart Grey T-Shirt. Perfect for layering or wearing solo, combines comfort and style seamlessly.",
    images: ["https://i.ibb.co/Rkb5mzZh/T8.png"],
    sizes: ["S", "M", "L", "XL"],
  },
];

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const productId = parseInt(id);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white bg-black">
        <p>Product not found.</p>
      </main>
    );
  }

  return <ProductDetail product={product} />;
}
