"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const brands = [
  { name: "JAMX", color: "text-blue-500" },
  { name: "Digitek", color: "text-green-500" },
  { name: "Tek React", color: "text-red-500" },
  { name: "Grafbase", color: "text-orange-500" },
  { name: "MSI", color: "text-red-600" },
  { name: "Ohbear", color: "text-red-400" },
  { name: "OAK", color: "text-green-600" },
  { name: "Snyk", color: "text-green-700" },
  { name: "Sonex", color: "text-gray-800" },
  { name: "Stropi", color: "text-blue-600" },
];

const topCategories = [
  {
    name: "Laptops",
    href: "/products/laptops",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80",
    count: "128 Products",
  },
  {
    name: "PC Gaming",
    href: "/products/pc-gaming",
    image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=500&q=80",
    count: "86 Products",
  },
  {
    name: "Headphones",
    href: "/products/headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    count: "64 Products",
  },
  {
    name: "Monitors",
    href: "/products/monitors",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80",
    count: "52 Products",
  },
];

const FeatureBrand = () => {
  return (
    <section className="py-10 lg:py-14 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* ========== FEATURED BRANDS ========== */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-bold text-[#0B1D36] tracking-wide">
                FEATURED BRANDS
              </h2>
              <Link
                href="/brands"
                className="text-sm font-medium text-gray-400 hover:text-[#00A8E8] transition-colors flex items-center gap-1"
              >
                View All
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {brands.map((brand) => (
                <Link
                  key={brand.name}
                  href={`/brands/${brand.name.toLowerCase()}`}
                  className="group flex items-center justify-center h-16 rounded-xl border border-gray-100 hover:border-[#00A8E8]/40 hover:bg-[#F0F9FF] transition-all duration-300"
                >
                  <span
                    className={`text-sm font-bold tracking-tight ${brand.color} group-hover:scale-105 transition-transform`}
                  >
                    {brand.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* ========== TOP CATEGORIES (Different & Better Design) ========== */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-bold text-[#0B1D36] tracking-wide">
                TOP CATEGORIES
              </h2>
              <Link
                href="/products"
                className="text-sm font-medium text-gray-400 hover:text-[#00A8E8] transition-colors flex items-center gap-1"
              >
                View All
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {topCategories.map((cat) => (
                <Link
                  key={cat.name}
                  href={cat.href}
                  className="group relative h-36 rounded-xl overflow-hidden bg-gray-100"
                >
                  {/* Background Image */}
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D36]/80 via-[#0B1D36]/20 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-semibold text-sm mb-0.5">
                      {cat.name}
                    </h3>
                    <p className="text-white/70 text-xs">{cat.count}</p>
                  </div>

                  {/* Hover Arrow */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight size={14} className="text-white" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureBrand;