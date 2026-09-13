"use client";

import Link from "next/link";
import { ChevronRight, Search } from "lucide-react";
import { useState } from "react";

const brands = [
  {
    name: "Apple",
    initial: "A",
    color: "text-gray-800",
    bg: "bg-gray-100",
    products: 86,
    description: "Premium smartphones, laptops & accessories",
  },
  {
    name: "Samsung",
    initial: "S",
    color: "text-blue-600",
    bg: "bg-blue-50",
    products: 124,
    description: "Galaxy phones, TVs, monitors & more",
  },
  {
    name: "Sony",
    initial: "S",
    color: "text-gray-800",
    bg: "bg-gray-100",
    products: 67,
    description: "Audio, cameras, PlayStation & electronics",
  },
  {
    name: "Dell",
    initial: "D",
    color: "text-blue-700",
    bg: "bg-blue-50",
    products: 52,
    description: "Laptops, desktops & business solutions",
  },
  {
    name: "HP",
    initial: "H",
    color: "text-blue-500",
    bg: "bg-sky-50",
    products: 48,
    description: "PCs, printers & computing devices",
  },
  {
    name: "Asus",
    initial: "A",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    products: 41,
    description: "Gaming laptops, motherboards & peripherals",
  },
  {
    name: "Lenovo",
    initial: "L",
    color: "text-red-600",
    bg: "bg-red-50",
    products: 58,
    description: "ThinkPad, Yoga & IdeaPad series",
  },
  {
    name: "Xiaomi",
    initial: "X",
    color: "text-orange-500",
    bg: "bg-orange-50",
    products: 73,
    description: "Smartphones, wearables & smart home",
  },
  {
    name: "LG",
    initial: "L",
    color: "text-red-500",
    bg: "bg-red-50",
    products: 39,
    description: "TVs, monitors & home appliances",
  },
  {
    name: "CG",
    initial: "C",
    color: "text-red-600",
    bg: "bg-red-50",
    products: 28,
    description: "Electronics & home appliances",
  },
  {
    name: "Goldstar",
    initial: "G",
    color: "text-yellow-600",
    bg: "bg-yellow-50",
    products: 22,
    description: "TVs, refrigerators & electronics",
  },
  {
    name: "Logitech",
    initial: "L",
    color: "text-sky-600",
    bg: "bg-sky-50",
    products: 35,
    description: "Mice, keyboards & gaming gear",
  },
  {
    name: "Anker",
    initial: "A",
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    products: 31,
    description: "Power banks, chargers & cables",
  },
  {
    name: "JBL",
    initial: "J",
    color: "text-orange-600",
    bg: "bg-orange-50",
    products: 27,
    description: "Speakers, headphones & audio systems",
  },
  {
    name: "Canon",
    initial: "C",
    color: "text-red-600",
    bg: "bg-red-50",
    products: 19,
    description: "Cameras, printers & imaging",
  },
  {
    name: "Microsoft",
    initial: "M",
    color: "text-blue-600",
    bg: "bg-blue-50",
    products: 24,
    description: "Surface devices & accessories",
  },
];

export default function BrandsPage() {
  const [search, setSearch] = useState("");

  const filtered = brands.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  // Group by first letter
  const grouped = filtered.reduce((acc, brand) => {
    const letter = brand.name[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(brand);
    return acc;
  }, {} as Record<string, typeof brands>);

  const letters = Object.keys(grouped).sort();

  return (
    <div className="bg-[#F4F6F9] min-h-screen pb-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B1D36] via-[#0E2544] to-[#132B4A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight size={14} />
            <span className="text-white/80">Brands</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl font-bold mb-2">All Brands</h1>
          <p className="text-white/60 text-sm sm:text-base">
            Explore {brands.length}+ trusted brands available at Voltora
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        {/* Search */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-6">
          <div className="relative max-w-md">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search brands..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A8E8]/30 text-[#0B1D36] placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Brands Grid */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl py-20 text-center border border-gray-100">
            <p className="text-[#0B1D36] font-semibold text-lg">No brands found</p>
            <p className="text-gray-400 text-sm mt-1">Try a different search term</p>
          </div>
        ) : (
          <div className="space-y-8">
            {letters.map((letter) => (
              <div key={letter}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-[#0B1D36] text-white text-sm font-bold flex items-center justify-center">
                    {letter}
                  </span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {grouped[letter].map((brand) => (
                    <Link
                      key={brand.name}
                      href={`/products?brand=${brand.name.toLowerCase()}`}
                      className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:border-gray-200 transition-all duration-300 flex flex-col items-center text-center"
                    >
                      <div
                        className={`w-14 h-14 rounded-2xl ${brand.bg} flex items-center justify-center font-bold text-xl ${brand.color} group-hover:scale-110 transition-transform duration-300 mb-3`}
                      >
                        {brand.initial}
                      </div>
                      <h3 className="text-[14px] font-semibold text-[#0B1D36] group-hover:text-[#00A8E8] transition-colors">
                        {brand.name}
                      </h3>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        {brand.products} products
                      </p>
                      <p className="text-[11px] text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                        {brand.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}