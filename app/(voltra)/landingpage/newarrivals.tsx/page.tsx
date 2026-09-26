"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/websitecommon/productcard";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const NewArrivals = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const res = await fetch(`${API_URL}/api/products?newArrival=true`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setProducts(Array.isArray(data) ? data.slice(0, 8) : []);
      } catch (err) {
        console.error(err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNewArrivals();
  }, []);

  if (loading) {
    return (
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center h-48">
          <div className="w-8 h-8 border-4 border-[#00A8E8] border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="w-2 h-8 rounded-full bg-[#00A8E8]" />
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-[#0B1D36]">
                New Arrivals
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Fresh products just landed
              </p>
            </div>
          </div>
          <Link
            href="/products?newArrival=true"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-[#00A8E8] hover:text-[#0B1D36] transition-colors group"
          >
            View All
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              title={product.title}
              price={product.price}
              oldPrice={product.oldPrice}
              rating={product.rating || 4.5}
              reviews={product.reviews || 0}
              image={product.images?.[0] || ""}
              badge="New"
              stock={product.stock || "In Stock"}
              freeShipping={product.freeShipping}
              freeGift={product.freeGift}
            />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/products?newArrival=true"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#00A8E8]"
          >
            View All New Arrivals
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;