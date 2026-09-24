"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const HeroSection = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [slides, setSlides] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch slides + categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [slidesRes, categoriesRes] = await Promise.all([
          fetch(`${API_URL}/api/hero`),
          fetch(`${API_URL}/api/products/categories`),
        ]);

        if (slidesRes.ok) {
          const slidesData = await slidesRes.json();
          setSlides(Array.isArray(slidesData) ? slidesData : []);
        }

        if (categoriesRes.ok) {
          const categoriesData = await categoriesRes.json();
          setCategories(Array.isArray(categoriesData) ? categoriesData : []);
        }
      } catch (error) {
        console.error("Failed to fetch hero data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [slides]);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const getImageUrl = (image: string) => {
    if (!image) return "";
    if (image.startsWith("http")) return image;
    return `${API_URL}${image}`;
  };

  if (loading) {
    return (
      <section className="bg-[#F8FAFC] py-6 lg:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[440px] flex items-center justify-center">
          <div className="animate-pulse text-gray-400">Loading...</div>
        </div>
      </section>
    );
  }

  if (slides.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#F8FAFC] py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* ===== LEFT CATEGORIES (DYNAMIC) ===== */}
          <div className="lg:col-span-2 hidden lg:block">
            <div className="bg-white rounded-2xl p-5 h-full border border-gray-100 shadow-sm">
              <div className="inline-block bg-red-500 text-white text-[11px] font-bold px-3 py-1 rounded-full mb-5 tracking-wide">
                SALE 40% OFF
              </div>
              <ul className="space-y-0.5">
                {categories.length === 0 ? (
                  <li className="text-sm text-gray-400 py-2">No categories yet</li>
                ) : (
                  categories.map((cat) => (
                    <li key={cat}>
                      <Link
                        href={`/products?category=${encodeURIComponent(cat)}`}
                        className="block py-2 px-2 -mx-2 rounded-lg text-[13px] font-medium text-[#0B1D36] hover:bg-[#E8F7FC] hover:text-[#00A8E8] transition-all"
                      >
                        {cat}
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>

          {/* ===== MAIN CAROUSEL ===== */}
          <div className="lg:col-span-7 relative">
            <div className="relative h-[360px] md:h-[440px] rounded-2xl overflow-hidden shadow-md">
              {slides.map((slide, index) => (
                <div
                  key={slide._id}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    index === currentSlide
                      ? "opacity-100 scale-100 z-10"
                      : "opacity-0 scale-105 z-0"
                  }`}
                >
                  <div
                    className={`absolute inset-0 ${
                      slide.bg ||
                      "bg-gradient-to-br from-[#0B1D36] to-[#132B4A]"
                    }`}
                  >
                    <div className="absolute inset-0">
                      <Image
                        src={getImageUrl(slide.image)}
                        alt={slide.title}
                        fill
                        className="object-cover opacity-60"
                        priority={index === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                    </div>

                    <div className="relative h-full flex flex-col justify-center px-8 md:px-12 z-20 max-w-lg">
                      <span className="text-[#00A8E8] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                        {slide.subtitle}
                      </span>
                      <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
                        {slide.title}
                      </h2>
                      <p className="text-white/85 text-sm md:text-base leading-relaxed whitespace-pre-line mb-3">
                        {slide.description}
                      </p>
                      <p className="text-2xl font-bold text-white mb-6">
                        {slide.price}
                      </p>
                      <Link
                        href={slide.buttonLink}
                        className="inline-flex items-center gap-2 bg-[#00A8E8] hover:bg-white text-white hover:text-[#0B1D36] font-semibold text-sm px-7 py-3 rounded-full transition-all w-fit shadow-lg"
                      >
                        {slide.buttonText || "Shop Now"}
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}

              {/* Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/15 hover:bg-white backdrop-blur-sm text-white hover:text-[#0B1D36] flex items-center justify-center transition-all border border-white/20"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/15 hover:bg-white backdrop-blur-sm text-white hover:text-[#0B1D36] flex items-center justify-center transition-all border border-white/20"
              >
                <ChevronRight size={22} />
              </button>

              {/* Dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "w-8 bg-[#00A8E8]"
                        : "w-2 bg-white/50 hover:bg-white"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ===== RIGHT SIDE CARDS ===== */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <Link
              href="/products/smartwatches"
              className="relative h-[210px] rounded-2xl overflow-hidden group shadow-md"
            >
              <Image
                src="https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&q=80"
                alt="Smart Watch"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D36]/90 via-[#0B1D36]/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-[#00A8E8] text-xs font-semibold mb-1">
                  New Arrival
                </p>
                <h3 className="text-white font-bold text-lg leading-snug mb-3">
                  Sport Water
                  <br />
                  Resistance Watch
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold">Rs. 8,999</span>
                  <span className="bg-white text-[#0B1D36] text-xs font-bold px-3 py-1.5 rounded-full">
                    Shop
                  </span>
                </div>
              </div>
            </Link>

            <Link
              href="/products/keyboards"
              className="relative h-[210px] rounded-2xl overflow-hidden group shadow-md"
            >
              <Image
                src="https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80"
                alt="Keyboard"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-white font-bold text-base mb-1">
                  Logitech MX Keys
                </h3>
                <p className="text-gray-300 text-xs mb-3">
                  Wireless • Multi Device
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[#00A8E8] font-bold">Rs. 14,500</span>
                  <ArrowRight size={16} className="text-white" />
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* ===== BOTTOM PROMO ROW ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          <Link
            href="/products/gaming"
            className="relative h-[190px] rounded-2xl overflow-hidden group shadow-md bg-white border border-gray-100"
          >
            <div className="absolute inset-0 flex items-center">
              <div className="w-1/2 pl-8 z-10">
                <p className="text-[#00A8E8] text-xs font-semibold mb-1">
                  Limited Stock
                </p>
                <h3 className="text-2xl font-bold text-[#0B1D36] mb-1">
                  PlayStation 5
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  from{" "}
                  <span className="text-green-600 font-bold text-lg">
                    Rs. 89,999
                  </span>
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#0B1D36] group-hover:text-[#00A8E8] transition-colors">
                  Discover Now <ArrowRight size={14} />
                </span>
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-[55%]">
                <Image
                  src="https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=700&q=80"
                  alt="PlayStation 5"
                  fill
                  className="object-contain object-right transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </Link>

          <Link
            href="/products/cameras"
            className="relative h-[190px] rounded-2xl overflow-hidden group shadow-md"
          >
            <Image
              src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=900&q=80"
              alt="Action Camera"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1D36]/85 via-[#0B1D36]/50 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center px-8">
              <p className="text-[#00A8E8] text-xs font-semibold mb-1">
                Best Seller
              </p>
              <h3 className="text-white font-bold text-2xl leading-tight mb-2">
                GoPro Hero 12
                <br />
                Black
              </h3>
              <p className="text-white/90">
                From{" "}
                <span className="text-green-400 font-bold text-xl">
                  Rs. 54,999
                </span>
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;