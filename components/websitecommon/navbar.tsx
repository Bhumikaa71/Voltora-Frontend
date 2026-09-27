"use client";

import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  Package,
  LogOut,
  UserCircle,
  Grid,
} from "lucide-react";
import { useStore } from "@/lib/store";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Icon mapping (optional – falls back to Grid)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const categoryIcons: Record<string, any> = {
  Laptops: Laptop,
  "PC & Computers": Monitor,
  "Cell Phones": Smartphone,
  Tablets: Tablet,
  "Gaming & VR": Gamepad2,
  Networking: Wifi,
  Cameras: Camera,
  Sounds: Speaker,
  Office: Briefcase,
  "Storage & USB": HardDrive,
  Accessories: Headphones,
  Clearance: Tag,
};

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount, wishlistCount, user, isLoggedIn, logout } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [allCategoriesOpen, setAllCategoriesOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [categories, setCategories] = useState<string[]>([]);

  const allCatRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Fetch only existing categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_URL}/api/products/categories`);
        if (!res.ok) return;
        const data = await res.json();
        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
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
      if (
        userMenuRef.current &&
        e.target instanceof Node &&
        !userMenuRef.current.contains(e.target)
      ) {
        setUserMenuOpen(false);
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

  const navLinkClass = (href: string) =>
    `relative px-4 py-2 text-[13px] font-semibold uppercase tracking-wider transition-colors group ${
      isActive(href)
        ? "text-[#00A8E8]"
        : "text-[#0B1D36] hover:text-[#00A8E8]"
    }`;

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    router.push("/");
  };

  const getCategoryHref = (cat: string) =>
    `/products?category=${encodeURIComponent(cat)}`;

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
        {/* TOP BAR */}
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

        {/* MAIN NAV */}
        <div className="border-b border-gray-100 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={`flex items-center justify-between transition-all duration-300 ${
                scrolled ? "h-[68px]" : "h-[88px]"
              }`}
            >
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

              <nav className="hidden lg:flex items-center gap-0.5">
                <Link href="/" className={navLinkClass("/")}>
                  Home
                  <span
                    className={`absolute left-4 right-4 -bottom-0.5 h-[2px] bg-[#00A8E8] transition-transform origin-left ${
                      isActive("/")
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>

                {/* PRODUCTS DROPDOWN */}
                <div
                  className="relative"
                  onMouseEnter={() => setProductsOpen(true)}
                  onMouseLeave={() => setProductsOpen(false)}
                >
                  <Link
                    href="/products"
                    className={`flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold uppercase tracking-wider transition-colors ${
                      isActive("/products")
                        ? "text-[#00A8E8]"
                        : "text-[#0B1D36] hover:text-[#00A8E8]"
                    }`}
                  >
                    Products
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${
                        productsOpen ? "rotate-180" : ""
                      }`}
                    />
                  </Link>
                  {isActive("/products") && (
                    <span className="absolute left-4 right-4 -bottom-0.5 h-[2px] bg-[#00A8E8]" />
                  )}

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

                          {categories.length === 0 ? (
                            <p className="text-sm text-gray-400 text-center py-6">
                              No categories yet
                            </p>
                          ) : (
                            <div className="grid grid-cols-3 gap-1">
                              {categories.map((cat) => {
                                const Icon = categoryIcons[cat] || Grid;
                                return (
                                  <Link
                                    key={cat}
                                    href={getCategoryHref(cat)}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#F0F9FF] transition-all group"
                                  >
                                    <div className="w-9 h-9 rounded-lg bg-[#0B1D36]/[0.04] group-hover:bg-[#00A8E8]/10 flex items-center justify-center text-[#0B1D36] group-hover:text-[#00A8E8] transition-colors">
                                      <Icon size={17} strokeWidth={1.8} />
                                    </div>
                                    <span className="text-sm font-medium text-[#0B1D36] group-hover:text-[#00A8E8]">
                                      {cat}
                                    </span>
                                  </Link>
                                );
                              })}
                            </div>
                          )}
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

                <Link href="/deals" className={navLinkClass("/deals")}>
                  Deals
                  <span
                    className={`absolute left-4 right-4 -bottom-0.5 h-[2px] bg-[#00A8E8] transition-transform origin-left ${
                      isActive("/deals")
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>

                <Link href="/brands" className={navLinkClass("/brands")}>
                  Brands
                  <span
                    className={`absolute left-4 right-4 -bottom-0.5 h-[2px] bg-[#00A8E8] transition-transform origin-left ${
                      isActive("/brands")
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>

                <Link href="/contact" className={navLinkClass("/contact")}>
                  Contact
                  <span
                    className={`absolute left-4 right-4 -bottom-0.5 h-[2px] bg-[#00A8E8] transition-transform origin-left ${
                      isActive("/contact")
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              </nav>

              {/* Right icons */}
              <div className="flex items-center gap-2">
                {/* Wishlist */}
                <Link
                  href="/wishlist"
                  className={`relative group p-2.5 rounded-full transition-all duration-200 ${
                    isActive("/wishlist")
                      ? "bg-[#00A8E8]/15 text-[#00A8E8]"
                      : "bg-gray-50 hover:bg-[#00A8E8]/10 text-[#0B1D36] hover:text-[#00A8E8]"
                  }`}
                >
                  <Heart
                    size={20}
                    strokeWidth={1.8}
                    className={`group-hover:scale-110 transition-transform ${
                      isActive("/wishlist") ? "fill-[#00A8E8]" : ""
                    }`}
                  />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#E5484D] text-white text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                      {wishlistCount > 99 ? "99+" : wishlistCount}
                    </span>
                  )}
                </Link>

                {/* User / Login */}
                {isLoggedIn && user ? (
                  <div className="relative hidden sm:block" ref={userMenuRef}>
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center gap-2.5 pl-1 pr-3 py-1.5 rounded-full hover:bg-gray-50 transition-all"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00A8E8] to-[#0B1D36] flex items-center justify-center text-white text-sm font-bold shadow-sm">
                        {user.name.charAt(0)}
                      </div>
                      <div className="text-left leading-tight">
                        <p className="text-[11px] text-gray-400">Hello,</p>
                        <p className="text-[13px] font-semibold text-[#0B1D36] flex items-center gap-1">
                          {user.name.split(" ")[0]}
                          <ChevronDown
                            size={12}
                            className={`transition-transform ${
                              userMenuOpen ? "rotate-180" : ""
                            }`}
                          />
                        </p>
                      </div>
                    </button>

                    {userMenuOpen && (
                      <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-[90]">
                        <div className="px-4 py-3 border-b border-gray-50">
                          <p className="text-sm font-semibold text-[#0B1D36]">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-400 truncate">
                            {user.email}
                          </p>
                        </div>
                        <div className="py-1.5">
                          <Link
                            href="/account"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#0B1D36] hover:bg-[#F0F9FF]"
                          >
                            <UserCircle size={16} />
                            My Account
                          </Link>
                          <Link
                            href="/account"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#0B1D36] hover:bg-[#F0F9FF]"
                          >
                            <Package size={16} />
                            My Orders
                          </Link>
                          <Link
                            href="/wishlist"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#0B1D36] hover:bg-[#F0F9FF]"
                          >
                            <Heart size={16} />
                            Wishlist
                          </Link>
                        </div>
                        <div className="border-t border-gray-50 py-1.5">
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 w-full text-left"
                          >
                            <LogOut size={16} />
                            Log out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
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
                )}

                {/* Cart */}
                <Link
                  href="/cart"
                  className={`relative flex items-center gap-2.5 pl-3.5 pr-5 py-2.5 rounded-full transition-all duration-200 shadow-sm hover:shadow-lg group ${
                    isActive("/cart")
                      ? "bg-[#00A8E8] text-white"
                      : "bg-[#0B1D36] hover:bg-[#132B4A] text-white"
                  }`}
                >
                  <div className="relative">
                    <ShoppingCart
                      size={18}
                      strokeWidth={2}
                      className="group-hover:scale-110 transition-transform"
                    />
                    {cartCount > 0 && (
                      <span
                        className={`absolute -top-2.5 -right-2.5 text-white text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full border-2 shadow-sm ${
                          isActive("/cart")
                            ? "bg-[#0B1D36] border-[#00A8E8]"
                            : "bg-[#00A8E8] border-[#0B1D36]"
                        }`}
                      >
                        {cartCount > 99 ? "99+" : cartCount}
                      </span>
                    )}
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

        {/* SEARCH BAR */}
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
                      {categories.length === 0 ? (
                        <p className="px-4 py-3 text-sm text-gray-400">
                          No categories yet
                        </p>
                      ) : (
                        categories.map((cat) => {
                          const Icon = categoryIcons[cat] || Grid;
                          return (
                            <Link
                              key={cat}
                              href={getCategoryHref(cat)}
                              onClick={() => setAllCategoriesOpen(false)}
                              className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#F0F9FF] transition-colors group"
                            >
                              <div className="w-8 h-8 rounded-lg bg-gray-50 group-hover:bg-[#00A8E8]/10 flex items-center justify-center text-[#0B1D36] group-hover:text-[#00A8E8] transition-colors">
                                <Icon size={15} strokeWidth={1.8} />
                              </div>
                              <span className="text-sm font-medium text-[#0B1D36] group-hover:text-[#00A8E8]">
                                {cat}
                              </span>
                            </Link>
                          );
                        })
                      )}
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

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg max-h-[75vh] overflow-y-auto">
            <div className="px-4 py-3 space-y-0.5">
              {isLoggedIn && user && (
                <div className="px-4 py-3 mb-2 bg-[#F0F9FF] rounded-xl">
                  <p className="text-sm font-semibold text-[#0B1D36]">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
              )}

              {[
                { href: "/", label: "Home" },
                { href: "/products", label: "All Products" },
                { href: "/deals", label: "Deals" },
                { href: "/brands", label: "Brands" },
                { href: "/contact", label: "Contact" },
                { href: "/wishlist", label: "Wishlist" },
                { href: "/cart", label: "Cart" },
                ...(isLoggedIn
                  ? [{ href: "/account", label: "My Account" }]
                  : [{ href: "/login", label: "Log in / Register" }]),
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-3 text-sm font-semibold rounded-lg ${
                    isActive(link.href)
                      ? "bg-[#F0F9FF] text-[#00A8E8]"
                      : "text-[#0B1D36] hover:bg-[#F0F9FF]"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                  {link.href === "/cart" && cartCount > 0 && (
                    <span className="ml-2 text-xs bg-[#00A8E8] text-white px-1.5 py-0.5 rounded-full">
                      {cartCount}
                    </span>
                  )}
                  {link.href === "/wishlist" && wishlistCount > 0 && (
                    <span className="ml-2 text-xs bg-[#E5484D] text-white px-1.5 py-0.5 rounded-full">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
              ))}

              {isLoggedIn && (
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 text-sm font-semibold text-red-500 rounded-lg hover:bg-red-50"
                >
                  Log out
                </button>
              )}

              <div className="px-4 py-2">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Categories
                </p>
                <div className="grid grid-cols-2 gap-1">
                  {categories.map((cat) => (
                    <Link
                      key={cat}
                      href={getCategoryHref(cat)}
                      className="px-3 py-2 text-sm text-[#0B1D36] rounded-lg hover:bg-[#F0F9FF] hover:text-[#00A8E8]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      <div style={{ height: headerHeight }} aria-hidden="true" />
    </>
  );
};

export default Navbar;