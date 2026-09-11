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
    name: "Speaker",
    count: 12,
    href: "/products/speakers",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=90",
  },
  {
    name: "DSLR Camera",
    count: 9,
    href: "/products/cameras",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=90",
  },
  {
    name: "Monitor",
    count: 28,
    href: "/products/monitors",
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=90",
  },
  {
    name: "Chair",
    count: 12,
    href: "/products/chairs",
    image:
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&q=90",
  },
  {
    name: "Printer",
    count: 9,
    href: "/products/printers",
    image:
      "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400&q=90",
  },
  {
    name: "Network",
    count: 90,
    href: "/products/network",
    image:
      "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=400&q=90",
  },
  {
    name: "Earbuds",
    count: 51,
    href: "/products/earbuds",
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=90",
  },
  {
    name: "Microphone",
    count: 13,
    href: "/products/microphones",
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&q=90",
  },
  {
    name: "Controller",
    count: 21,
    href: "/products/controllers",
    image:
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&q=90",
  },
  {
    name: "Keyboard",
    count: 32,
    href: "/products/keyboards",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=90",
  },
  {
    name: "Security",
    count: 13,
    href: "/products/security",
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?w=400&q=90",
  },
  {
    name: "Projectors",
    count: 12,
    href: "/products/projectors",
    image:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&q=90",
  },
];

const Accessories = () => {
  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* ================= Section Header ================= */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-stretch gap-3">
            <span className="w-1.5 rounded-full bg-[#00A8E8]" />
            <div>
              <h2 className="text-2xl font-bold text-[#0B1D36] leading-tight">
                Accessories
              </h2>
              <p className="text-sm text-gray-400 mt-0.5">
                Essential gadgets &amp; peripherals
              </p>
            </div>
          </div>
          <Link
            href="/products/accessories"
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
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#EAF7FD] via-[#F3F7FB] to-[#EFF3FA] p-6 sm:p-8 lg:p-10">
          {/* Soft decorative glows */}
          <div className="pointer-events-none absolute -top-20 -left-20 w-64 h-64 bg-[#00A8E8]/10 rounded-full blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 w-64 h-64 bg-[#0B1D36]/5 rounded-full blur-3xl" />

          <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-8">
            {categoryTiles.map((tile) => (
              <Link
                key={tile.name}
                href={tile.href}
                className="group flex flex-col items-center text-center"
              >
                {/* Circle that fills with image */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-gray-100 shadow-sm mb-3 group-hover:shadow-md group-hover:scale-105 transition-all duration-300">
                  <Image
                    src={tile.image}
                    alt={tile.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                    sizes="112px"
                    quality={95}
                  />
                </div>

                <h3 className="text-[14px] font-semibold text-[#0B1D36] group-hover:text-[#00A8E8] transition-colors">
                  {tile.name}
                </h3>
                <p className="text-[12px] text-gray-400 mt-0.5">
                  {tile.count} items
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Accessories;