"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/websitecommon/productcard";

const laptops = [
  {
    id: 101,
    title: "Apple MacBook Pro 14″ M3 Pro",
    price: 1999.0,
    oldPrice: 2199.0,
    rating: 4.9,
    reviews: 526,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=85",
    stock: "In Stock" as const,
    freeShipping: true,
    freeGift: true,
  },
  {
    id: 102,
    title: "Dell XPS 15 OLED 32GB RAM",
    price: 1749.0,
    oldPrice: 1999.0,
    rating: 4.7,
    reviews: 318,
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&q=85",
    stock: "In Stock" as const,
    freeShipping: true,
    freeGift: false,
  },
  {
    id: 103,
    title: "ASUS ROG Zephyrus G16 Gaming",
    price: 1899.0,
    oldPrice: 2199.0,
    rating: 4.8,
    reviews: 412,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&q=85",
    stock: "Low Stock" as const,
    freeShipping: true,
    freeGift: true,
  },
  {
    id: 104,
    title: "Lenovo ThinkPad X1 Carbon Gen 12",
    price: 1599.0,
    oldPrice: 1799.0,
    rating: 4.6,
    reviews: 287,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&q=85",
    stock: "In Stock" as const,
    freeShipping: true,
    freeGift: false,
  },
];

const Laptop = () => {
  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================= Header ================= */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-stretch gap-3">
            <span className="w-1.5 rounded-full bg-[#00A8E8]" />
            <div>
              <h2 className="text-2xl font-bold text-[#0B1D36] leading-tight">
                Laptops
              </h2>
              <p className="text-sm text-gray-400 mt-0.5">
                Best performing laptops this week
              </p>
            </div>
          </div>

          <Link
            href="/products/laptops"
            className="group flex items-center gap-1.5 text-sm font-semibold text-[#00A8E8] hover:text-[#0B1D36] transition-colors"
          >
            View All
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* ================= Product Grid (4 items) ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {laptops.map((laptop) => (
            <ProductCard
              key={laptop.id}
              id={laptop.id}
              title={laptop.title}
              price={laptop.price}
              oldPrice={laptop.oldPrice}
              rating={laptop.rating}
              reviews={laptop.reviews}
              image={laptop.image}
              stock={laptop.stock}
              freeShipping={laptop.freeShipping}
              freeGift={laptop.freeGift}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Laptop;