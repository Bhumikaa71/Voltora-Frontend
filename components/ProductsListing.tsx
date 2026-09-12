"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  SlidersHorizontal,
  X,
  Grid3X3,
  List,
  Star,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import ProductCard from "@/components/productcard";

// ===================== DATA =====================
const allProducts = [
  {
    id: 1,
    title: "Apple MagSafe Battery Pack",
    price: 99.99,
    oldPrice: 129.99,
    rating: 4.6,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600&q=80",
    stock: "Low Stock" as const,
    freeShipping: true,
    freeGift: false,
    category: "accessories",
    brand: "Apple",
  },
  {
    id: 2,
    title: "Sony WH-1000XM5 Wireless Headphones",
    price: 348.0,
    oldPrice: 399.99,
    rating: 4.8,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&q=80",
    stock: "In Stock" as const,
    freeShipping: true,
    freeGift: false,
    category: "sounds",
    brand: "Sony",
  },
  {
    id: 3,
    title: "Samsung Galaxy Buds3 Pro",
    price: 199.99,
    oldPrice: 249.99,
    rating: 4.5,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80",
    stock: "In Stock" as const,
    freeShipping: true,
    freeGift: true,
    category: "accessories",
    brand: "Samsung",
  },
  {
    id: 4,
    title: "Anker 737 Power Bank 24000mAh",
    price: 119.99,
    oldPrice: 149.99,
    rating: 4.7,
    reviews: 205,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&q=80",
    stock: "Low Stock" as const,
    freeShipping: true,
    freeGift: false,
    category: "accessories",
    brand: "Anker",
  },
  {
    id: 5,
    title: "Apple AirPods Pro 2nd Gen",
    price: 229.0,
    oldPrice: 249.0,
    rating: 4.9,
    reviews: 540,
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&q=80",
    stock: "In Stock" as const,
    freeShipping: true,
    freeGift: true,
    category: "accessories",
    brand: "Apple",
  },
  {
    id: 6,
    title: "MacBook Pro 16-inch M3 Pro",
    price: 2499,
    oldPrice: 2799,
    rating: 4.8,
    reviews: 1240,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80",
    stock: "In Stock" as const,
    freeShipping: true,
    freeGift: false,
    category: "laptops",
    brand: "Apple",
  },
  {
    id: 7,
    title: "iPhone 16 Pro Max",
    price: 1199,
    oldPrice: 1299,
    rating: 4.9,
    reviews: 3200,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&q=80",
    stock: "In Stock" as const,
    freeShipping: true,
    freeGift: false,
    category: "cell-phones",
    brand: "Apple",
  },
  {
    id: 8,
    title: "Dell XPS 15 OLED",
    price: 1899,
    oldPrice: 2199,
    rating: 4.6,
    reviews: 890,
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&q=80",
    stock: "In Stock" as const,
    freeShipping: true,
    freeGift: false,
    category: "laptops",
    brand: "Dell",
  },
  {
    id: 9,
    title: "iPad Pro 13-inch M4",
    price: 1299,
    oldPrice: 1499,
    rating: 4.8,
    reviews: 670,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80",
    stock: "In Stock" as const,
    freeShipping: true,
    freeGift: false,
    category: "tablets",
    brand: "Apple",
  },
  {
    id: 10,
    title: "Logitech MX Master 3S",
    price: 99.99,
    oldPrice: 119.99,
    rating: 4.7,
    reviews: 1450,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80",
    stock: "In Stock" as const,
    freeShipping: true,
    freeGift: false,
    category: "accessories",
    brand: "Logitech",
  },
  {
    id: 11,
    title: "Samsung Odyssey G9 Monitor",
    price: 1299,
    oldPrice: 1599,
    rating: 4.5,
    reviews: 320,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&q=80",
    stock: "Out of Stock" as const,
    freeShipping: false,
    freeGift: false,
    category: "pc-computers",
    brand: "Samsung",
  },
  {
    id: 12,
    title: "PlayStation 5 Slim",
    price: 499,
    oldPrice: 549,
    rating: 4.9,
    reviews: 2100,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600&q=80",
    stock: "Low Stock" as const,
    freeShipping: true,
    freeGift: true,
    category: "gaming-vr",
    brand: "Sony",
  },
];

const categories = [
  { label: "All Categories", value: "" },
  { label: "Laptops", value: "laptops" },
  { label: "PC & Computers", value: "pc-computers" },
  { label: "Cell Phones", value: "cell-phones" },
  { label: "Tablets", value: "tablets" },
  { label: "Gaming & VR", value: "gaming-vr" },
  { label: "Accessories", value: "accessories" },
  { label: "Sounds", value: "sounds" },
];

const brands = ["Apple", "Samsung", "Sony", "Dell", "Anker", "Logitech"];
const ratingOptions = [4.5, 4, 3.5, 3];
const ITEMS_PER_PAGE = 6;

// ===================== COMPONENT =====================
interface ProductsListingProps {
  initialCategory?: string;
}

export default function ProductsListing({
  initialCategory = "",
}: ProductsListingProps) {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedStock, setSelectedStock] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setSelectedCategory(initialCategory);
    setCurrentPage(1);
  }, [initialCategory]);

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }
    if (selectedBrand.length > 0) {
      result = result.filter((p) => selectedBrand.includes(p.brand));
    }

    const min = minPrice ? Number(minPrice) : 0;
    const max = maxPrice ? Number(maxPrice) : Infinity;
    result = result.filter((p) => p.price >= min && p.price <= max);

    if (selectedRating) {
      result = result.filter((p) => p.rating >= selectedRating);
    }
    if (selectedStock === "in-stock") {
      result = result.filter((p) => p.stock !== "Out of Stock");
    }
    if (selectedStock === "out-of-stock") {
      result = result.filter((p) => p.stock === "Out of Stock");
    }

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => b.id - a.id);
        break;
    }

    return result;
  }, [
    selectedCategory,
    selectedBrand,
    minPrice,
    maxPrice,
    selectedRating,
    selectedStock,
    sortBy,
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedBrand, minPrice, maxPrice, selectedRating, selectedStock, sortBy]);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    if (value) router.push(`/products?category=${value}`);
    else router.push("/products");
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrand((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const resetFilters = () => {
    setSelectedCategory("");
    setSelectedBrand([]);
    setMinPrice("");
    setMaxPrice("");
    setSelectedRating(null);
    setSelectedStock("");
    setSortBy("featured");
    setCurrentPage(1);
    router.push("/products");
  };

  const activeFiltersCount =
    (selectedCategory ? 1 : 0) +
    selectedBrand.length +
    (minPrice || maxPrice ? 1 : 0) +
    (selectedRating ? 1 : 0) +
    (selectedStock ? 1 : 0);

  const pageTitle = selectedCategory
    ? selectedCategory
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    : "All Products";

  // ===================== NEW FILTER DESIGN =====================
  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-[15px] font-bold text-[#0B1D36] flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#0B1D36] flex items-center justify-center">
            <SlidersHorizontal size={13} className="text-white" />
          </div>
          Filters
        </h3>
        {activeFiltersCount > 0 && (
          <button
            onClick={resetFilters}
            className="text-[11px] font-semibold text-[#E5484D] bg-red-50 px-2.5 py-1 rounded-full hover:bg-red-100 transition-colors flex items-center gap-1"
          >
            <RotateCcw size={10} />
            Clear ({activeFiltersCount})
          </button>
        )}
      </div>

      {/* Category - Pill style */}
      <div>
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">
          Category
        </p>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleCategoryChange(cat.value)}
              className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-all ${
                selectedCategory === cat.value
                  ? "bg-[#0B1D36] text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">
          Price Range
        </p>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-medium">
              $
            </span>
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full pl-7 pr-2 py-2.5 text-sm bg-gray-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A8E8]/40 text-[#0B1D36] placeholder:text-gray-400"
            />
          </div>
          <div className="w-3 h-[2px] bg-gray-200 rounded-full" />
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-medium">
              $
            </span>
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full pl-7 pr-2 py-2.5 text-sm bg-gray-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A8E8]/40 text-[#0B1D36] placeholder:text-gray-400"
            />
          </div>
        </div>
      </div>

      {/* Brand - Chip style */}
      <div>
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">
          Brand
        </p>
        <div className="flex flex-wrap gap-1.5">
          {brands.map((brand) => {
            const active = selectedBrand.includes(brand);
            return (
              <button
                key={brand}
                onClick={() => toggleBrand(brand)}
                className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-all border ${
                  active
                    ? "bg-[#00A8E8]/10 border-[#00A8E8] text-[#00A8E8]"
                    : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                {brand}
              </button>
            );
          })}
        </div>
      </div>

      {/* Rating */}
      <div>
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">
          Minimum Rating
        </p>
        <div className="space-y-1.5">
          {ratingOptions.map((val) => (
            <button
              key={val}
              onClick={() =>
                setSelectedRating(selectedRating === val ? null : val)
              }
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] transition-all ${
                selectedRating === val
                  ? "bg-amber-50 text-amber-700"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={13}
                    className={
                      i < Math.floor(val)
                        ? "fill-amber-400 text-amber-400"
                        : "fill-gray-200 text-gray-200"
                    }
                  />
                ))}
              </div>
              <span className="font-medium">{val}+</span>
            </button>
          ))}
        </div>
      </div>

      {/* Availability - Segmented control */}
      <div>
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">
          Availability
        </p>
        <div className="bg-gray-100 rounded-xl p-1 flex">
          {[
            { label: "All", value: "" },
            { label: "In Stock", value: "in-stock" },
            { label: "Sold Out", value: "out-of-stock" },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSelectedStock(opt.value)}
              className={`flex-1 py-2 text-[12px] font-semibold rounded-lg transition-all ${
                selectedStock === opt.value
                  ? "bg-white text-[#0B1D36] shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-[#F4F6F9] min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Breadcrumb + Title */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-[13px] text-gray-400 mb-3">
            <Link href="/" className="hover:text-[#00A8E8] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#0B1D36] font-medium">{pageTitle}</span>
          </nav>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#0B1D36]">
                {pageTitle}
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                {filteredProducts.length} products available
              </p>
            </div>
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-[#0B1D36] text-white rounded-xl text-sm font-medium shadow-lg shadow-[#0B1D36]/20"
            >
              <SlidersHorizontal size={15} />
              Filters
              {activeFiltersCount > 0 && (
                <span className="bg-[#00A8E8] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* ========== NEW SIDEBAR ========== */}
          <aside className="hidden lg:block w-[260px] flex-shrink-0">
            <div className="sticky top-28 bg-white rounded-2xl p-5 shadow-sm border border-gray-100/60">
              <FilterSidebar />
            </div>
          </aside>

          {/* ========== MAIN ========== */}
          <div className="flex-1 min-w-0">
            {/* ========== NEW TOOLBAR ========== */}
            <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Left - Results count */}
              <p className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-semibold text-[#0B1D36]">
                  {paginatedProducts.length > 0
                    ? (currentPage - 1) * ITEMS_PER_PAGE + 1
                    : 0}
                  –
                  {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-[#0B1D36]">
                  {filteredProducts.length}
                </span>
              </p>

              {/* Right - Sort + View */}
              <div className="flex items-center gap-3">
                {/* Sort pills */}
                <div className="flex items-center gap-1 bg-white rounded-xl p-1 shadow-sm border border-gray-100/60">
                  {[
                    { label: "Featured", value: "featured" },
                    { label: "Price ↑", value: "price-low" },
                    { label: "Price ↓", value: "price-high" },
                    { label: "Top Rated", value: "rating" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setSortBy(opt.value)}
                      className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all ${
                        sortBy === opt.value
                          ? "bg-[#0B1D36] text-white"
                          : "text-gray-500 hover:text-[#0B1D36] hover:bg-gray-50"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                {/* View toggle */}
                <div className="flex items-center bg-white rounded-xl p-1 shadow-sm border border-gray-100/60">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-all ${
                      viewMode === "grid"
                        ? "bg-[#0B1D36] text-white"
                        : "text-gray-400 hover:text-[#0B1D36]"
                    }`}
                  >
                    <Grid3X3 size={15} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg transition-all ${
                      viewMode === "list"
                        ? "bg-[#0B1D36] text-white"
                        : "text-gray-400 hover:text-[#0B1D36]"
                    }`}
                  >
                    <List size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* Products */}
            {paginatedProducts.length === 0 ? (
              <div className="bg-white rounded-2xl py-24 text-center border border-gray-100">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-50 flex items-center justify-center">
                  <Search size={24} className="text-gray-300" />
                </div>
                <p className="text-[#0B1D36] font-bold text-lg">No products found</p>
                <p className="text-gray-400 text-sm mt-1 mb-6">
                  Try changing or clearing your filters
                </p>
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0B1D36] text-white text-sm font-semibold rounded-xl hover:bg-[#132B4A] transition-colors"
                >
                  <RotateCcw size={14} />
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
                      : "flex flex-col gap-3"
                  }
                >
                  {paginatedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      title={product.title}
                      price={product.price}
                      oldPrice={product.oldPrice}
                      rating={product.rating}
                      reviews={product.reviews}
                      image={product.image}
                      stock={product.stock}
                      freeShipping={product.freeShipping}
                      freeGift={product.freeGift}
                    />
                  ))}
                </div>

                {/* ========== PAGINATION ========== */}
                {totalPages > 1 && (
                  <div className="mt-10 flex items-center justify-center gap-1.5">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-500 hover:bg-white hover:text-[#0B1D36] disabled:opacity-30 disabled:cursor-not-allowed transition-all border border-transparent hover:border-gray-200"
                    >
                      <ChevronLeft size={18} />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all ${
                            currentPage === page
                              ? "bg-[#0B1D36] text-white shadow-lg shadow-[#0B1D36]/25"
                              : "text-gray-500 hover:bg-white hover:text-[#0B1D36] border border-transparent hover:border-gray-200"
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}

                    <button
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-500 hover:bg-white hover:text-[#0B1D36] disabled:opacity-30 disabled:cursor-not-allowed transition-all border border-transparent hover:border-gray-200"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-[320px] bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h3 className="font-bold text-[#0B1D36]">Filters</h3>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-2 -mr-2 rounded-full hover:bg-gray-50"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <FilterSidebar />
            </div>
            <div className="p-4 border-t border-gray-100">
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full py-3.5 bg-[#0B1D36] text-white font-semibold rounded-xl text-sm"
              >
                Show {filteredProducts.length} products
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}