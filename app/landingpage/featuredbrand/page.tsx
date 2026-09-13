"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";

const brands = [
  { name: "Goldstar", initial: "G", color: "text-yellow-600", bg: "bg-yellow-50" },
  { name: "CG", initial: "C", color: "text-red-600", bg: "bg-red-50" },
  { name: "Samsung", initial: "S", color: "text-blue-600", bg: "bg-blue-50" },
  { name: "LG", initial: "L", color: "text-red-500", bg: "bg-red-50" },
  { name: "Sony", initial: "S", color: "text-gray-800", bg: "bg-gray-100" },
  { name: "Dell", initial: "D", color: "text-blue-700", bg: "bg-blue-50" },
  { name: "HP", initial: "H", color: "text-blue-500", bg: "bg-sky-50" },
  { name: "Asus", initial: "A", color: "text-indigo-600", bg: "bg-indigo-50" },
  { name: "Lenovo", initial: "L", color: "text-red-600", bg: "bg-red-50" },
  { name: "Xiaomi", initial: "X", color: "text-orange-500", bg: "bg-orange-50" },
];

const topCategories = [
  {
    name: "Laptops",
    href: "/products?category=laptops",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&q=80",
    count: "128 Products",
    trending: true,
  },
  {
    name: "PC Gaming",
    href: "/products?category=gaming-vr",
    image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=300&q=80",
    count: "86 Products",
  },
  {
    name: "Headphones",
    href: "/products?category=sounds",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80",
    count: "64 Products",
  },
  {
    name: "Monitors",
    href: "/products?category=pc-computers",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&q=80",
    count: "52 Products",
  },
  {
    name: "Cameras",
    href: "/products?category=cameras",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&q=80",
    count: "39 Products",
  },
  {
    name: "Smartphones",
    href: "/products?category=cell-phones",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&q=80",
    count: "97 Products",
    trending: true,
  },
  {
    name: "Speakers",
    href: "/products?category=sounds",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&q=80",
    count: "31 Products",
  },
  {
    name: "Tablets",
    href: "/products?category=tablets",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&q=80",
    count: "45 Products",
  },
];

const FeatureBrand = () => {
  return (
    <section className="bg-white py-10 lg:py-14">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#EAF7FD] via-[#F3F7FB] to-[#EFF3FA] p-5 sm:p-6 lg:p-7">
          <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 bg-[#00A8E8]/10 rounded-full blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 w-72 h-72 bg-[#0B1D36]/5 rounded-full blur-3xl" />
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00A8E8]/5 rounded-full blur-3xl" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* ========== FEATURED BRANDS ========== */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 p-6 md:p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00A8E8] to-[#0B1D36] flex items-center justify-center shadow-sm">
                    <Sparkles size={16} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#0B1D36] tracking-wide leading-tight">
                      FEATURED BRANDS
                    </h2>
                    <p className="text-xs text-gray-400">
                      Trusted names, guaranteed quality
                    </p>
                  </div>
                </div>

                {/* View All Brands */}
                <Link
                  href="/brands"
                  className="group flex items-center gap-1.5 text-sm font-semibold text-[#00A8E8] hover:text-[#0B1D36] transition-colors"
                >
                  View All
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {brands.map((brand) => (
                  <Link
                    key={brand.name}
                    href={`/brands/${brand.name.toLowerCase()}`}
                    className="group relative flex flex-col items-center justify-center gap-2 h-24 rounded-xl border border-gray-100 hover:border-transparent hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white"
                  >
                    <div
                      className={`w-10 h-10 rounded-full ${brand.bg} flex items-center justify-center font-bold text-sm ${brand.color} group-hover:scale-110 transition-transform duration-300`}
                    >
                      {brand.initial}
                    </div>
                    <span className="text-[12px] font-semibold text-[#0B1D36] tracking-tight">
                      {brand.name}
                    </span>
                    <span className="absolute inset-x-4 bottom-1.5 h-[2px] bg-gradient-to-r from-[#00A8E8] to-[#0B1D36] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-center" />
                  </Link>
                ))}
              </div>
            </div>

            {/* ========== TOP CATEGORIES ========== */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 p-6 md:p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-lg font-bold text-[#0B1D36] tracking-wide leading-tight">
                    TOP CATEGORIES
                  </h2>
                  <p className="text-xs text-gray-400">
                    Shop the most popular picks
                  </p>
                </div>
                <Link
                  href="/products"
                  className="group flex items-center gap-1.5 text-sm font-semibold text-[#00A8E8] hover:text-[#0B1D36] transition-colors"
                >
                  View All
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>

              <div className="grid grid-cols-4 gap-y-7 gap-x-2">
                {topCategories.map((cat) => (
                  <Link
                    key={cat.name}
                    href={cat.href}
                    className="group flex flex-col items-center text-center"
                  >
                    <div className="relative">
                      {cat.trending && (
                        <span className="absolute -top-1.5 -right-1.5 z-10 w-5 h-5 rounded-full bg-[#00A8E8] flex items-center justify-center shadow-sm ring-2 ring-white">
                          <TrendingUp
                            size={10}
                            className="text-white"
                            strokeWidth={2.5}
                          />
                        </span>
                      )}
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[3px] bg-gradient-to-br from-[#00A8E8] to-[#0B1D36] opacity-90 group-hover:opacity-100 group-hover:shadow-lg group-hover:shadow-[#00A8E8]/30 group-hover:scale-105 transition-all duration-300">
                        <div className="relative w-full h-full rounded-full overflow-hidden ring-4 ring-white">
                          <Image
                            src={cat.image}
                            alt={cat.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-115"
                          />
                          <div className="absolute inset-0 bg-[#0B1D36]/0 group-hover:bg-[#0B1D36]/10 transition-colors" />
                        </div>
                      </div>
                    </div>

                    <h3 className="mt-3 text-[12px] sm:text-[13px] font-semibold text-[#0B1D36] group-hover:text-[#00A8E8] transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-[10px] sm:text-[11px] text-gray-400">
                      {cat.count}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureBrand;