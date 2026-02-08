"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { useCartStore } from "@/store/productStore";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  images: string[];
  sizes: string[];
}

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "M");

  const addToCart = useCartStore((state) => state.addToCart);

  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setSelectedImage((prev) => (prev + 1) % product.images.length),
    onSwipedRight: () =>
      setSelectedImage(
        (prev) => (prev - 1 + product.images.length) % product.images.length
      ),
    trackMouse: true,
  });

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: 35,
      quantity,
      size: selectedSize,
      image: product.images[selectedImage],
    });
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12 flex flex-col lg:flex-row gap-10">
      <div className="lg:w-1/2 lg:mt-[200px] mt-20 flex flex-col items-center gap-4">
        <div
          {...handlers}
          className="relative w-full h-96 rounded-2xl overflow-hidden bg-white/5 shadow-lg cursor-grab"
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-contain"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex gap-3 mt-2">
          {product.images.map((img, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.1 }}
              onClick={() => setSelectedImage(idx)}
              className={`w-20 h-20 rounded-xl overflow-hidden border-2 cursor-pointer transition ${
                selectedImage === idx ? "border-pink-500" : "border-white/10"
              }`}
            >
              <Image
                src={img}
                alt={`${product.name} ${idx + 1}`}
                width={80}
                height={80}
                className="object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="lg:w-1/2 flex flex-col justify-center gap-6">
        <h1 className="text-4xl font-extrabold text-pink-400">
          {product.name}
        </h1>
        <p className="text-gray-300 text-xl">{product.price}</p>
        <p className="text-gray-400 leading-relaxed">{product.description}</p>

        <div className="flex items-center gap-4 mt-2">
          <span className="font-semibold">Size:</span>
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-3 py-1 rounded-lg border transition ${
                selectedSize === size
                  ? "bg-pink-600 text-white"
                  : "border-white/20 text-gray-300"
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 mt-2">
          <span className="font-semibold">Qty:</span>
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-1 rounded-lg border border-white/20"
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="px-3 py-1 rounded-lg border border-white/20"
          >
            +
          </button>
        </div>

        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 0px 20px rgba(236,72,153,0.7)",
          }}
          onClick={handleAddToCart}
          className="px-6 py-3 bg-pink-600 rounded-xl hover:bg-pink-700 transition text-white font-semibold w-max mt-4"
        >
          Add to Cart
        </motion.button>

        <Link
          href="/shop"
          className="text-pink-400 hover:underline mt-2 inline-block"
        >
          Back to Shop
        </Link>
      </div>
    </main>
  );
}
