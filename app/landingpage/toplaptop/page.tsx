"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CategoryTile {
  name: string;
  count: number;
  href: string;
  image: string;
}

const categoryTiles: CategoryTile[] = [
  {
    name: "MacBook",
    count: 42,
    href: "/products/laptops?brand=apple",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=95",
  },
  {
    name: "Gaming Laptops",
    count: 38,
    href: "/products/laptops?feature=gaming",
    image:
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&q=95",
  },
  {
    name: "Ultrabooks",
    count: 29,
    href: "/products/laptops?type=ultrabook",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=95",
  },
  {
    name: "Windows",
    count: 67,
    href: "/products/laptops?os=windows",
    image:
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&q=95",
  },
  {
    name: "2-in-1 Convertible",
    count: 18,
    href: "/products/laptops?type=2-in-1",
    image:
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&q=95",
  },
  {
    name: "Accessories",
    count: 54,
    href: "/products/laptop-accessories",
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=95",
  },
];

const TopLaptop = () => {
  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* ================= Section Header (outside gradient) ================= */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-stretch gap-3">
            <span className="w-1.5 rounded-full bg-[#00A8E8]" />
            <div>
              <h2 className="text-2xl font-bold text-[#0B1D36] leading-tight">
                Top Laptops
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

        {/* ================= Content with gradient background ================= */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#EAF7FD] via-[#F3F7FB] to-[#EFF3FA] p-5 sm:p-6 lg:p-7">
          {/* Soft decorative glows */}
          <div className="pointer-events-none absolute -top-20 -left-20 w-64 h-64 bg-[#00A8E8]/10 rounded-full blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 w-64 h-64 bg-[#0B1D36]/5 rounded-full blur-3xl" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
            {/* ========== Promo Banner ========== */}
            <Link
              href="/products/laptops/macbook-pro-14-m3"
              className="lg:col-span-5 relative rounded-2xl overflow-hidden min-h-[280px] sm:min-h-[320px] flex group bg-white/70 backdrop-blur-sm border border-white/60 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#EAF7FD] via-[#F3F7FB] to-[#EFF3FA]" />

              <div className="absolute -left-16 top-1/2 -translate-y-1/2 w-52 h-52 rounded-full bg-[#00A8E8]/10 blur-3xl pointer-events-none" />
              <div className="absolute right-16 bottom-0 w-36 h-36 rounded-full bg-blue-200/30 blur-3xl pointer-events-none" />

              {/* Text */}
              <div className="relative z-10 flex flex-col justify-center pl-7 sm:pl-9 pr-4 py-8 w-[48%] sm:w-[45%]">
                <h3 className="text-[24px] sm:text-[28px] font-extrabold text-[#0B1D36] leading-[1.15] tracking-tight">
                  MacBook Pro
                  <br />
                  14″ M3 Pro
                </h3>
                <p className="text-[14px] sm:text-[15px] text-gray-500 mt-3 mb-6">
                  Supercharged by M3
                </p>
                <span className="inline-flex items-center self-start bg-[#0B1D36] text-white text-sm font-semibold px-5 py-2.5 rounded-full group-hover:bg-black transition-colors duration-300">
                  Shop Now
                </span>
              </div>

              {/* Image */}
              <div className="absolute right-0 top-0 bottom-0 w-[55%] sm:w-[58%]">
                <Image
                  src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900&q=90"
                  alt="MacBook Pro 14 M3"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 55vw, 40vw"
                  priority
                />
                <div className="absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-[#EAF7FD] to-transparent pointer-events-none" />
              </div>
            </Link>

            {/* ========== Category Grid ========== */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4">
              {categoryTiles.map((tile) => (
                <Link
                  key={tile.name}
                  href={tile.href}
                  className="group relative flex items-center justify-between gap-3 rounded-2xl border border-white/80 bg-white px-4 py-4 min-h-[108px] overflow-hidden shadow-sm hover:border-[#00A8E8]/40 hover:shadow-[0_10px_30px_-10px_rgba(0,168,232,0.15)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#00A8E8] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-[#00A8E8]/0 group-hover:bg-[#00A8E8]/[0.08] blur-xl transition-all duration-500 pointer-events-none" />

                  <div className="relative z-10 flex-1 min-w-0">
                    <p className="text-[14px] font-semibold text-[#0B1D36] group-hover:text-[#00A8E8] transition-colors duration-300 truncate">
                      {tile.name}
                    </p>
                    <p className="text-[12px] text-gray-400 mt-0.5">
                      {tile.count} items
                    </p>
                  </div>

                  <div className="relative z-10 shrink-0 w-[66px] h-[66px] sm:w-[72px] sm:h-[72px] rounded-xl bg-gray-50 group-hover:bg-[#EAF7FD] flex items-center justify-center overflow-hidden transition-colors duration-300">
                    <div className="relative w-[54px] h-[54px] sm:w-[60px] sm:h-[60px]">
                      <Image
                        src={tile.image}
                        alt={tile.name}
                        fill
                        className="object-contain group-hover:scale-110 transition-transform duration-400 ease-out"
                        sizes="60px"
                        quality={95}
                      />
                    </div>
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

export default TopLaptop;