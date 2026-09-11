"use client";

import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
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
  const [scrolled, setScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);

  const allCatRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        allCatRef.current &&
        e.target instanceof Node &&
        !allCatRef.current.contains(e.target)
      ) {
        setAllCategoriesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useLayoutEffect(() => {
    const node = headerRef.current;
    if (!node) return;

    const updateHeight = () => setHeaderHeight(node.offsetHeight);
    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(node);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md"
            : "bg-white shadow-sm"
        }`}
      >
        {/* ========== TOP BAR ========== */}
        <div
          className={`bg-gradient-to-r from-[#0B1D36] via-[#0E2544] to-[#0B1D36] text-white text-[13px] transition-all duration-300 overflow-hidden ${
            scrolled ? "max-h-0 opacity-0" : "max-h-10 opacity-100"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-9">
              <div className="flex items-center gap-2.5">
                <span className="bg-gradient-to-r from-[#00A8E8] to-[#00C2F0] text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-[0_0_10px_rgba(0,168,232,0.5)]">
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
        <div className="border-b border-gray-100 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={`flex items-center justify-between transition-all duration-300 ${
                scrolled ? "h-[68px]" : "h-[88px]"
              }`}
            >
              {/* Logo */}
              <Link href="/" className="flex-shrink-0 flex items-center">
                <Image
                  src="/images/logo1.png"
                  alt="Voltora Electronics Store"
                  width={240}
                  height={80}
                  className={`w-auto object-contain transition-all duration-300 ${
                    scrolled ? "h-[52px]" : "h-[68px]"
                  }`}
                  priority
                />
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-0.5">
                <Link
                  href="/"
                  className="relative px-4 py-2 text-[13px] font-semibold text-[#0B1D36] hover:text-[#00A8E8] transition-colors uppercase tracking-wider group"
                >
                  Home
                  <span className="absolute left-4 right-4 -bottom-0.5 h-[2px] bg-[#00A8E8] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
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

                  {/* Floating Mega Menu */}
                  {productsOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-[80]">
                      <div className="w-[720px] bg-white rounded-2xl shadow-2xl ring-1 ring-black/5 border border-gray-100 overflow-hidden">
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

                        <div className="bg-gradient-to-r from-[#0B1D36] to-[#132B4A] px-5 py-3 flex items-center justify-between">
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
                  className="relative px-4 py-2 text-[13px] font-semibold text-[#0B1D36] hover:text-[#00A8E8] transition-colors uppercase tracking-wider group"
                >
                  Deals
                  <span className="absolute left-4 right-4 -bottom-0.5 h-[2px] bg-[#00A8E8] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </Link>
                <Link
                  href="/brands"
                  className="relative px-4 py-2 text-[13px] font-semibold text-[#0B1D36] hover:text-[#00A8E8] transition-colors uppercase tracking-wider group"
                >
                  Brands
                  <span className="absolute left-4 right-4 -bottom-0.5 h-[2px] bg-[#00A8E8] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </Link>
                <Link
                  href="/contact"
                  className="relative px-4 py-2 text-[13px] font-semibold text-[#0B1D36] hover:text-[#00A8E8] transition-colors uppercase tracking-wider group"
                >
                  Contact
                  <span className="absolute left-4 right-4 -bottom-0.5 h-[2px] bg-[#00A8E8] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </Link>
              </nav>

              {/* Right Side Icons */}
              <div className="flex items-center gap-2">
                <Link
                  href="/wishlist"
                  className="relative group p-2.5 rounded-full bg-gray-50 hover:bg-[#00A8E8]/10 text-[#0B1D36] hover:text-[#00A8E8] transition-all duration-200"
                >
                  <Heart
                    size={20}
                    strokeWidth={1.8}
                    className="group-hover:scale-110 transition-transform"
                  />
                  <span className="absolute -top-1 -right-1 bg-[#E5484D] text-white text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                    2
                  </span>
                </Link>

                <Link
                  href="/login"
                  className="hidden sm:flex items-center gap-2.5 pl-1 pr-3 py-1.5 rounded-full hover:bg-gray-50 transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0B1D36] to-[#132B4A] flex items-center justify-center text-white shadow-sm group-hover:shadow-md transition-shadow">
                    <User size={18} strokeWidth={1.8} />
                  </div>
                  <div className="text-left leading-tight">
                    <p className="text-[11px] text-gray-400">Welcome</p>
                    <p className="text-[13px] font-semibold text-[#0B1D36] group-hover:text-[#00A8E8] transition-colors">
                      Log in / Register
                    </p>
                  </div>
                </Link>

                <Link
                  href="/cart"
                  className="relative flex items-center gap-2.5 bg-[#0B1D36] hover:bg-[#132B4A] text-white pl-3.5 pr-5 py-2.5 rounded-full transition-all duration-200 shadow-sm hover:shadow-lg group"
                >
                  <div className="relative">
                    <ShoppingCart
                      size={18}
                      strokeWidth={2}
                      className="group-hover:scale-110 transition-transform"
                    />
                    <span className="absolute -top-2.5 -right-2.5 bg-[#00A8E8] text-white text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full border-2 border-[#0B1D36] shadow-sm">
                      3
                    </span>
                  </div>
                  <span className="text-sm font-semibold">Cart</span>
                </Link>

                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-2.5 rounded-full bg-gray-50 hover:bg-gray-100 text-[#0B1D36] ml-1 transition-colors"
                >
                  {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ========== SEARCH BAR ========== */}
        <div
          className={`bg-gradient-to-r from-[#00A8E8] to-[#00bfff] transition-all duration-300 ${
            scrolled
              ? "max-h-0 opacity-0 overflow-hidden"
              : "max-h-24 opacity-100"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-4 py-2.5">
              <div
                className="w-full lg:max-w-xl relative z-[60]"
                ref={allCatRef}
              >
                <div className="flex items-center bg-white rounded-full overflow-hidden shadow-md">
                  <button
                    type="button"
                    onClick={() => setAllCategoriesOpen((prev) => !prev)}
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

                {allCategoriesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-[70]">
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
                            <div className="w-8 h-8 rounded-lg bg-gray-50 group-hover:bg-[#00A8E8]/10 flex items-center justify-center text-[#0B1D36] group-hover:text-[#00A8E8] transition-colors">
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

      {/* Spacer to offset the fixed header's height and stop content jumping */}
      <div style={{ height: headerHeight }} aria-hidden="true" />
    </>
  );
};

export default Navbar;