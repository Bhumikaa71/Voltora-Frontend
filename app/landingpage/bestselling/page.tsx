"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/productcard";

const bestSellers = [
  {
    id: 1,
    title: "Apple MagSafe Battery Pack",
    price: 99.99,
    oldPrice: 129.99,
    rating: 4.6,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600&q=80",
    badge: "Best Seller",
    stock: "Low Stock" as const,
    freeShipping: true,
    freeGift: true,
  },
  {
    id: 2,
    title: "Sony WH-1000XM5 Wireless Headphones",
    price: 348.0,
    oldPrice: 399.99,
    rating: 4.8,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&q=80",
    badge: "Top Rated",
    stock: "In Stock" as const,
    freeShipping: true,
    freeGift: false,
  },
  {
    id: 3,
    title: "Samsung Galaxy Buds3 Pro",
    price: 199.99,
    oldPrice: 249.99,
    rating: 4.5,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80",
    badge: "New",
    stock: "In Stock" as const,
    freeShipping: true,
    freeGift: true,
  },
  {
    id: 4,
    title: "Anker 737 Power Bank 24000mAh",
    price: 119.99,
    oldPrice: 149.99,
    rating: 4.7,
    reviews: 205,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&q=80",
    badge: "Hot",
    stock: "Low Stock" as const,
    freeShipping: true,
    freeGift: false,
  },
];

const BestSellers = () => {
  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="w-2 h-8 rounded-full bg-[#00A8E8]" />
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-[#0B1D36]">
                Best Sellers
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Most popular products this week
              </p>
            </div>
          </div>

          <Link
            href="/products?sort=best-selling"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-[#00A8E8] hover:text-[#0B1D36] transition-colors group"
          >
            View All
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {bestSellers.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              oldPrice={product.oldPrice}
              rating={product.rating}
              reviews={product.reviews}
              image={product.image}
              badge={product.badge}
              stock={product.stock}
              freeShipping={product.freeShipping}
              freeGift={product.freeGift}
            />
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/products?sort=best-selling"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#00A8E8]"
          >
            View All Best Sellers
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;