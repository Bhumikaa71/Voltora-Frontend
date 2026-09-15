"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/websitecommon/productcard";

const cellphones = [
  {
    id: 1,
    title: "Apple iPhone 15 Pro Max 256GB",
    price: 1199.0,
    oldPrice: 1299.0,
    rating: 4.9,
    reviews: 842,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&q=85",
    stock: "In Stock" as const,
    freeShipping: true,
    freeGift: true,
  },
  {
    id: 2,
    title: "Samsung Galaxy S24 Ultra 512GB",
    price: 1099.0,
    oldPrice: 1299.0,
    rating: 4.8,
    reviews: 631,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&q=85",
    stock: "In Stock" as const,
    freeShipping: true,
    freeGift: false,
  },
  {
    id: 3,
    title: "Xiaomi Redmi Note 13 Pro+ 5G",
    price: 349.0,
    oldPrice: 399.0,
    rating: 4.6,
    reviews: 412,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=85",
    stock: "In Stock" as const,
    freeShipping: true,
    freeGift: true,
  },
  {
    id: 4,
    title: "Google Pixel 8 Pro 128GB",
    price: 899.0,
    oldPrice: 999.0,
    rating: 4.7,
    reviews: 289,
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&q=85",
    stock: "Low Stock" as const,
    freeShipping: true,
    freeGift: false,
  },
];

const CellPhone = () => {
  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================= Header ================= */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-stretch gap-3">
            <span className="w-1.5 rounded-full bg-[#00A8E8]" />
            <div>
              <h2 className="text-2xl font-bold text-[#0B1D36] leading-tight">
                Cell Phones
              </h2>
              <p className="text-sm text-gray-400 mt-0.5">
                Latest smartphones just for you
              </p>
            </div>
          </div>

          <Link
            href="/products/cell-phones"
            className="group flex items-center gap-1.5 text-sm font-semibold text-[#00A8E8] hover:text-[#0B1D36] transition-colors"
          >
            View All
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* ================= Product Grid (only 4) ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {cellphones.map((phone) => (
            <ProductCard
              key={phone.id}
              id={phone.id}
              title={phone.title}
              price={phone.price}
              oldPrice={phone.oldPrice}
              rating={phone.rating}
              reviews={phone.reviews}
              image={phone.image}
              stock={phone.stock}
              freeShipping={phone.freeShipping}
              freeGift={phone.freeGift}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CellPhone;