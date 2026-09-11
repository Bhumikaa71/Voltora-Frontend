"use client";

import React from "react";
import Link from "next/link";
import { Star } from "lucide-react";

const Banner = () => {
  return (
    <div className="w-full bg-[#00A8E8] overflow-hidden">
      <div className="relative">
        {/* Subtle shine animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-[shine_3s_ease-in-out_infinite] pointer-events-none" />

        <div className="relative flex items-center justify-center gap-3 sm:gap-4 px-4 sm:px-6 py-3.5">
          {/* Star with pulse */}
          <div className="flex-shrink-0 animate-[pulse_2s_ease-in-out_infinite]">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Star
                size={16}
                className="fill-amber-300 text-amber-300"
              />
            </div>
          </div>

          {/* Text with gentle fade-in */}
          <p className="text-center text-sm sm:text-[15px] font-medium text-white tracking-wide animate-[fadeIn_0.6s_ease-out]">
            Members get{" "}
            <span className="font-bold text-amber-200 uppercase tracking-wider">
              Free Shipping*
            </span>{" "}
            with no order restriction.{" "}
            <Link
              href="/membership"
              className="font-semibold underline underline-offset-4 decoration-white/70 hover:decoration-white hover:text-amber-100 transition-all duration-300"
            >
              Free 30 days trial!
            </Link>
          </p>
        </div>
      </div>

      {/* Custom keyframes (add this in your global CSS or Tailwind config) */}
      <style jsx>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Banner;