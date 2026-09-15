"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Search, ArrowUpRight } from "lucide-react";

const brands = [
  {
    name: "Apple",
    initial: "A",
    gradient: "from-gray-700 to-gray-900",
    products: 86,
    description: "Premium smartphones, MacBooks & accessories",
    tag: "Premium",
  },
  {
    name: "Samsung",
    initial: "S",
    gradient: "from-blue-600 to-blue-800",
    products: 124,
    description: "Galaxy phones, TVs, monitors & more",
    tag: "Popular",
  },
  {
    name: "Sony",
    initial: "S",
    gradient: "from-neutral-700 to-neutral-900",
    products: 67,
    description: "Audio, cameras, PlayStation & electronics",
  },
  {
    name: "Dell",
    initial: "D",
    gradient: "from-blue-500 to-blue-700",
    products: 52,
    description: "Laptops, desktops & business solutions",
  },
  {
    name: "HP",
    initial: "H",
    gradient: "from-sky-500 to-sky-700",
    products: 48,
    description: "PCs, printers & computing devices",
  },
  {
    name: "Asus",
    initial: "A",
    gradient: "from-indigo-500 to-indigo-700",
    products: 41,
    description: "Gaming laptops, motherboards & peripherals",
    tag: "Gaming",
  },
  {
    name: "Lenovo",
    initial: "L",
    gradient: "from-red-500 to-red-700",
    products: 58,
    description: "ThinkPad, Yoga & IdeaPad series",
  },
  {
    name: "Xiaomi",
    initial: "X",
    gradient: "from-orange-400 to-orange-600",
    products: 73,
    description: "Smartphones, wearables & smart home",
    tag: "Value",
  },
  {
    name: "LG",
    initial: "L",
    gradient: "from-rose-500 to-rose-700",
    products: 39,
    description: "TVs, monitors & home appliances",
  },
  {
    name: "CG",
    initial: "C",
    gradient: "from-red-600 to-red-800",
    products: 28,
    description: "Electronics & home appliances",
  },
  {
    name: "Goldstar",
    initial: "G",
    gradient: "from-amber-400 to-amber-600",
    products: 22,
    description: "TVs, refrigerators & electronics",
  },
  {
    name: "Logitech",
    initial: "L",
    gradient: "from-cyan-500 to-cyan-700",
    products: 35,
    description: "Mice, keyboards & gaming gear",
  },
  {
    name: "Anker",
    initial: "A",
    gradient: "from-teal-500 to-teal-700",
    products: 31,
    description: "Power banks, chargers & cables",
  },
  {
    name: "JBL",
    initial: "J",
    gradient: "from-orange-500 to-orange-700",
    products: 27,
    description: "Speakers, headphones & audio systems",
  },
  {
    name: "Canon",
    initial: "C",
    gradient: "from-red-500 to-red-700",
    products: 19,
    description: "Cameras, printers & imaging",
  },
  {
    name: "Microsoft",
    initial: "M",
    gradient: "from-blue-400 to-blue-600",
    products: 24,
    description: "Surface devices & accessories",
  },
];

export default function BrandsPage() {
  const [search, setSearch] = useState("");

  const filtered = brands.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#F4F6F9] min-h-screen pb-20">
      {/* ========== HERO ========== */}
      <div className="relative bg-gradient-to-br from-[#0B1D36] via-[#0E2544] to-[#132B4A] overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00A8E8]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#00A8E8]/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 sm:pb-20">
          <nav className="flex items-center gap-2 text-sm text-white/40 mb-10">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight size={14} />
            <span className="text-white/70">Brands</span>
          </nav>

          <div className="max-w-xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3">
              Shop by{" "}
              <span className="text-[#00A8E8]">Brand</span>
            </h1>
            <p className="text-white/50 text-base sm:text-lg">
              Discover {brands.length}+ trusted brands with premium quality
              products at Voltora.
            </p>
          </div>
        </div>
      </div>

      {/* ========== CONTENT ========== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        {/* Search bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/80 p-4 sm:p-5 mb-8 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="relative flex-1 max-w-lg">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search brands..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 text-sm bg-[#F8FAFC] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A8E8]/25 focus:border-[#00A8E8] focus:bg-white transition-all text-[#0B1D36] placeholder:text-gray-400"
            />
          </div>
          <p className="text-sm text-gray-400 shrink-0">
            <span className="font-semibold text-[#0B1D36]">{filtered.length}</span>{" "}
            brands found
          </p>
        </div>

        {/* Brands Grid */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl py-24 text-center border border-gray-100">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-50 flex items-center justify-center">
              <Search size={24} className="text-gray-300" />
            </div>
            <p className="text-[#0B1D36] font-semibold text-lg">No brands found</p>
            <p className="text-gray-400 text-sm mt-1">
              Try a different search term
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((brand) => (
              <Link
                key={brand.name}
                href={`/products?brand=${brand.name.toLowerCase()}`}
                className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-200/80 transition-all duration-300"
              >
                {/* Top gradient bar */}
                <div
                  className={`h-1.5 w-full bg-gradient-to-r ${brand.gradient}`}
                />

                <div className="p-6">
                  {/* Logo + Tag */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${brand.gradient} text-white flex items-center justify-center text-xl font-bold shadow-md group-hover:scale-105 transition-transform duration-300`}
                    >
                      {brand.initial}
                    </div>

                    {brand.tag && (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-[#F0F9FF] text-[#00A8E8] px-2.5 py-1 rounded-full">
                        {brand.tag}
                      </span>
                    )}
                  </div>

                  {/* Name */}
                  <h3 className="text-[16px] font-bold text-[#0B1D36] group-hover:text-[#00A8E8] transition-colors mb-1">
                    {brand.name}
                  </h3>

                  {/* Description */}
                  <p className="text-[12px] text-gray-400 leading-relaxed mb-4 line-clamp-2">
                    {brand.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                    <span className="text-[12px] font-medium text-gray-500">
                      {brand.products} products
                    </span>
                    <span className="w-8 h-8 rounded-full bg-gray-50 group-hover:bg-[#00A8E8] flex items-center justify-center transition-colors">
                      <ArrowUpRight
                        size={14}
                        className="text-gray-400 group-hover:text-white transition-colors"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}