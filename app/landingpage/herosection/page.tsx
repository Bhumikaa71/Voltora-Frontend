"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
  "Laptops",
  "PC & Computers",
  "Cell Phones",
  "Tablets",
  "Gaming & VR",
  "Networking",
  "Cameras",
  "Sounds",
  "Office",
  "Storage, USB",
  "Accessories",
  "Clearance",
];

const slides = [
  {
    id: 1,
    title: "Noise Cancelling",
    subtitle: "HEADPHONE",
    description: "Boso Over-Ear Headphone\nWifi, Voice Assistant,\nLow Latency Game Mode",
    buttonText: "Buy Now",
    buttonLink: "/products/headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    bg: "bg-gradient-to-r from-gray-200 to-gray-100",
  },
  {
    id: 2,
    title: "Ultimate Gaming",
    subtitle: "LAPTOP",
    description: "High Performance Gaming Laptop\nRTX 4070 • 16GB RAM\n144Hz Display",
    buttonText: "Shop Now",
    buttonLink: "/products/laptops",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80",
    bg: "bg-gradient-to-r from-slate-800 to-slate-700",
  },
  {
    id: 3,
    title: "Pro Capture",
    subtitle: "CAMERA",
    description: "OKODO HERO 11+ Black\n5.3K Video • Waterproof\nHyperSmooth Stabilization",
    buttonText: "Discover",
    buttonLink: "/products/cameras",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
    bg: "bg-gradient-to-r from-zinc-900 to-zinc-800",
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="bg-white py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* ========== LEFT CATEGORIES ========== */}
          <div className="lg:col-span-2 hidden lg:block">
            <div className="bg-white border border-gray-100 rounded-2xl p-5 h-full shadow-sm">
              <h3 className="text-[#FF3B30] font-bold text-sm tracking-wide mb-4">
                SALE 40% OFF
              </h3>
              <ul className="space-y-1">
                {categories.map((cat) => (
                  <li key={cat}>
                    <Link
                      href={`/products/${cat.toLowerCase().replace(/ & /g, "-").replace(/, /g, "-").replace(/ /g, "-")}`}
                      className="block py-2 text-[13px] font-medium text-[#0B1D36] hover:text-[#00A8E8] transition-colors"
                    >
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ========== MAIN CAROUSEL ========== */}
          <div className="lg:col-span-7 relative">
            <div className="relative h-[340px] md:h-[420px] rounded-2xl overflow-hidden shadow-sm">
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                >
                  <div className={`absolute inset-0 ${slide.bg}`}>
                    <div className="absolute inset-0 flex">
                      {/* Text Content */}
                      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-12 z-20">
                        <p className="text-white/80 text-xs font-semibold tracking-[0.2em] uppercase mb-2">
                          {slide.subtitle}
                        </p>
                        <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3">
                          {slide.title}
                        </h2>
                        <p className="text-white/90 text-sm leading-relaxed whitespace-pre-line mb-6 max-w-xs">
                          {slide.description}
                        </p>
                        <Link
                          href={slide.buttonLink}
                          className="inline-flex items-center justify-center bg-white text-[#0B1D36] font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-[#00A8E8] hover:text-white transition-all w-fit"
                        >
                          {slide.buttonText}
                        </Link>
                      </div>

                      {/* Image */}
                      <div className="hidden md:block absolute right-0 top-0 bottom-0 w-1/2">
                        <Image
                          src={slide.image}
                          alt={slide.title}
                          fill
                          className="object-cover object-center"
                          priority={index === 0}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#0B1D36] flex items-center justify-center shadow-md transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#0B1D36] flex items-center justify-center shadow-md transition-all"
              >
                <ChevronRight size={20} />
              </button>

              {/* Dots */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentSlide
                        ? "w-6 bg-white"
                        : "w-2 bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ========== RIGHT PROMO CARDS ========== */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            {/* Card 1 - Smartwatch */}
            <Link
              href="/products/smartwatches"
              className="relative h-[200px] rounded-2xl overflow-hidden group shadow-sm"
            >
              <Image
                src="https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&q=80"
                alt="Sport Watch"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-white/80 text-xs font-medium mb-1">xomia</p>
                <h3 className="text-white font-bold text-lg leading-tight mb-3">
                  Sport Water<br />Resistance Watch
                </h3>
                <span className="inline-block bg-white text-[#0B1D36] text-xs font-semibold px-4 py-1.5 rounded-full">
                  Shop Now
                </span>
              </div>
            </Link>

            {/* Card 2 - Keyboard */}
            <Link
              href="/products/keyboards"
              className="relative h-[200px] rounded-2xl overflow-hidden group shadow-sm bg-gray-800"
            >
              <Image
                src="https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80"
                alt="Logitech Keyboard"
                fill
                className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-white font-bold text-base leading-tight mb-1">
                  Logitech Bluetooth
                </h3>
                <p className="text-[#00A8E8] font-semibold text-sm mb-1">Keyboard</p>
                <p className="text-white/70 text-xs">Best for all devices</p>
              </div>
            </Link>
          </div>
        </div>

        {/* ========== BOTTOM PROMO ROW ========== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          {/* Sony PlayStation */}
          <Link
            href="/products/gaming"
            className="relative h-[180px] rounded-2xl overflow-hidden group shadow-sm bg-gray-100"
          >
            <div className="absolute inset-0 flex">
              <div className="w-1/2 flex flex-col justify-center px-8 z-10">
                <h3 className="text-xl font-bold text-[#0B1D36] mb-1">
                  Sono Playgo 5
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  from <span className="text-green-600 font-bold text-lg">$569</span>
                </p>
                <span className="text-sm font-semibold text-[#0B1D36] underline underline-offset-4 mt-2">
                  DISCOVER NOW
                </span>
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-1/2">
                <Image
                  src="https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600&q=80"
                  alt="PlayStation"
                  fill
                  className="object-contain object-right transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </Link>

          {/* Action Camera */}
          <Link
            href="/products/cameras"
            className="relative h-[180px] rounded-2xl overflow-hidden group shadow-sm"
          >
            <Image
              src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80"
              alt="Action Camera"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center px-8">
              <h3 className="text-white font-bold text-2xl leading-tight mb-1">
                OKODO<br />HERO 11+ BLACK
              </h3>
              <p className="text-white/80 text-sm mb-2">
                FROM <span className="text-green-400 font-bold text-lg">$169</span>
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;