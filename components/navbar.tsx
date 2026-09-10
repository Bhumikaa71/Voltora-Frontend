"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  ChevronDown,
  Menu,
  X,
  Phone,
  Laptop,
  Monitor,
  Smartphone,
  Tablet,
  Gamepad2,
  Wifi,
  Camera,
  Speaker,
  Briefcase,
  HardDrive,
  Headphones,
  Tag,
} from "lucide-react";

const categories = [
  { name: "Laptops", href: "/products/laptops", icon: Laptop },
  { name: "PC & Computers", href: "/products/pc-computers", icon: Monitor },
  { name: "Cell Phones", href: "/products/cell-phones", icon: Smartphone },
  { name: "Tablets", href: "/products/tablets", icon: Tablet },
  { name: "Gaming & VR", href: "/products/gaming-vr", icon: Gamepad2 },
  { name: "Networking", href: "/products/networking", icon: Wifi },
  { name: "Cameras", href: "/products/cameras", icon: Camera },
  { name: "Sounds", href: "/products/sounds", icon: Speaker },
  { name: "Office", href: "/products/office", icon: Briefcase },
  { name: "Storage & USB", href: "/products/storage-usb", icon: HardDrive },
  { name: "Accessories", href: "/products/accessories", icon: Headphones },
  { name: "Clearance", href: "/products/clearance", icon: Tag },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [allCategoriesOpen, setAllCategoriesOpen] = useState(false);
  const allCatRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (allCatRef.current && !allCatRef.current.contains(e.target)) {
        setAllCategoriesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-white sticky top-0 z-50 shadow-sm">
      {/* ========== TOP BAR ========== */}
      <div className="bg-[#0B1D36] text-white text-[13px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-9">
            <div className="flex items-center gap-2.5">
              <span className="bg-[#00A8E8] text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                Hotline 24/7
              </span>
              <a
                href="tel:+02538862516"
                className="flex items-center gap-1.5 hover:text-[#00A8E8] transition-colors"
              >
                <Phone size={13} />
                <span>(025) 3886 25 16</span>
              </a>
            </div>

            <div className="flex items-center gap-6">
              <Link
                href="/sell"
                className="hover:text-[#00A8E8] transition-colors hidden sm:inline-block"
              >
                Sell on Voltora
              </Link>
              <Link
                href="/order-tracking"
                className="hover:text-[#00A8E8] transition-colors"
              >
                Order Tracking
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ========== MAIN NAV ========== */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[88px]">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image
                src="/images/logo1.png"
                alt="Voltora Electronics Store"
                width={240}
                height={80}
                className="h-[68px] w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-0.5">
              <Link
                href="/"
                className="px-4 py-2 text-[13px] font-semibold text-[#0B1D36] hover:text-[#00A8E8] transition-colors uppercase tracking-wider"
              >
                Home
              </Link>

              {/* Products Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setProductsOpen(true)}
                onMouseLeave={() => setProductsOpen(false)}
              >
                <button className="flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold text-[#0B1D36] hover:text-[#00A8E8] transition-colors uppercase tracking-wider">
                  Products
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      productsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {productsOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50">
                    <div className="w-[700px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                      <div className="p-5">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                            Shop by Category
                          </h3>
                          <Link
                            href="/products"
                            className="text-sm font-medium text-[#00A8E8] hover:underline"
                          >
                            View all →
                          </Link>
                        </div>

                        <div className="grid grid-cols-3 gap-1">
                          {categories.map((cat) => {
                            const Icon = cat.icon;
                            return (
                              <Link
                                key={cat.name}
                                href={cat.href}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#F0F9FF] transition-all group"
                              >
                                <div className="w-9 h-9 rounded-lg bg-[#0B1D36]/[0.04] group-hover:bg-[#00A8E8]/10 flex items-center justify-center text-[#0B1D36] group-hover:text-[#00A8E8] transition-colors">
                                  <Icon size={17} strokeWidth={1.8} />
                                </div>
                                <span className="text-sm font-medium text-[#0B1D36] group-hover:text-[#00A8E8]">
                                  {cat.name}
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>

                      <div className="bg-[#0B1D36] px-5 py-3 flex items-center justify-between">
                        <p className="text-sm text-white/80">
                          Special deals on Gaming & Laptops
                        </p>
                        <Link
                          href="/deals"
                          className="text-sm font-semibold text-[#00A8E8] hover:text-white transition-colors"
                        >
                          View Deals →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/deals"
                className="px-4 py-2 text-[13px] font-semibold text-[#0B1D36] hover:text-[#00A8E8] transition-colors uppercase tracking-wider"
              >
                Deals
              </Link>
              <Link
                href="/brands"
                className="px-4 py-2 text-[13px] font-semibold text-[#0B1D36] hover:text-[#00A8E8] transition-colors uppercase tracking-wider"
              >
                Brands
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 text-[13px] font-semibold text-[#0B1D36] hover:text-[#00A8E8] transition-colors uppercase tracking-wider"
              >
                Contact
              </Link>
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-1">
              <Link
                href="/wishlist"
                className="p-2.5 rounded-full hover:bg-gray-50 text-[#0B1D36] transition-colors"
              >
                <Heart size={19} strokeWidth={1.7} />
              </Link>

              <Link
                href="/login"
                className="hidden sm:flex items-center gap-2.5 px-2 py-1.5 rounded-full hover:bg-gray-50 transition-colors"
              >
                <div className="text-right leading-tight">
                  <p className="text-[11px] text-gray-400">Welcome</p>
                  <p className="text-[13px] font-semibold text-[#0B1D36]">
                    Log in / Register
                  </p>
                </div>
                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                  <User size={17} strokeWidth={1.7} />
                </div>
              </Link>

              <Link
                href="/cart"
                className="relative flex items-center gap-2 bg-[#0B1D36] hover:bg-[#132B4A] text-white pl-3.5 pr-4 py-2.5 rounded-full transition-all ml-1"
              >
                <div className="relative">
                  <ShoppingCart size={17} strokeWidth={2} />
                  <span className="absolute -top-2 -right-2 bg-[#00A8E8] text-white text-[10px] font-bold min-w-[17px] h-[17px] flex items-center justify-center rounded-full border-2 border-[#0B1D36]">
                    3
                  </span>
                </div>
                <span className="text-sm font-semibold">Cart</span>
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-full hover:bg-gray-50 text-[#0B1D36] ml-1"
              >
                {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========== SEARCH BAR ========== */}
      <div className="bg-[#00A8E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-4 py-2.5">
            <div className="w-full lg:max-w-xl relative" ref={allCatRef}>
              <div className="flex items-center bg-white rounded-full overflow-hidden shadow-sm">
                <button
                  onClick={() => setAllCategoriesOpen(!allCategoriesOpen)}
                  className="flex items-center gap-1.5 px-4 py-2.5 text-[13px] font-medium text-[#0B1D36] border-r border-gray-100 whitespace-nowrap hover:bg-gray-50 transition-colors"
                >
                  All Categories
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      allCategoriesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <input
                  type="text"
                  placeholder="Search laptops, phones, gaming gear..."
                  className="flex-1 px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
                />
                <button className="bg-[#0B1D36] hover:bg-[#132B4A] text-white p-2.5 m-1 rounded-full transition-colors">
                  <Search size={17} />
                </button>
              </div>

              {/* All Categories Dropdown */}
              {allCategoriesOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                  <div className="py-1.5 max-h-80 overflow-y-auto">
                    {categories.map((cat) => {
                      const Icon = cat.icon;
                      return (
                        <Link
                          key={cat.name}
                          href={cat.href}
                          onClick={() => setAllCategoriesOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#F0F9FF] transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-gray-50 group-hover:bg-[#00A8E8]/10 flex items-center justify-center text-[#0B1D36] group-hover:text-[#00A8E8]">
                            <Icon size={15} strokeWidth={1.8} />
                          </div>
                          <span className="text-sm font-medium text-[#0B1D36] group-hover:text-[#00A8E8]">
                            {cat.name}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="hidden lg:flex items-center gap-6 text-white text-[13px] font-medium">
              <span>FREE SHIPPING OVER $199</span>
              <span className="w-px h-3.5 bg-white/30" />
              <span>30 DAYS MONEY BACK</span>
              <span className="w-px h-3.5 bg-white/30" />
              <span>100% SECURE PAYMENT</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========== MOBILE MENU ========== */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg max-h-[75vh] overflow-y-auto">
          <div className="px-4 py-3 space-y-0.5">
            <Link
              href="/"
              className="block px-4 py-3 text-sm font-semibold text-[#0B1D36] rounded-lg hover:bg-[#F0F9FF]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>

            <div className="px-4 py-2">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Products
              </p>
              <div className="grid grid-cols-2 gap-1">
                {categories.map((cat) => (
                  <Link
                    key={cat.name}
                    href={cat.href}
                    className="px-3 py-2 text-sm text-[#0B1D36] rounded-lg hover:bg-[#F0F9FF] hover:text-[#00A8E8]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/deals"
              className="block px-4 py-3 text-sm font-semibold text-[#0B1D36] rounded-lg hover:bg-[#F0F9FF]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Deals
            </Link>
            <Link
              href="/brands"
              className="block px-4 py-3 text-sm font-semibold text-[#0B1D36] rounded-lg hover:bg-[#F0F9FF]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Brands
            </Link>
            <Link
              href="/contact"
              className="block px-4 py-3 text-sm font-semibold text-[#0B1D36] rounded-lg hover:bg-[#F0F9FF]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;