/* eslint-disable react-hooks/static-components */
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
} from "lucide-react";
import ProductCard from "@/components/productcard";

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
  { label: "All", value: "" },
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
    // eslint-disable-next-line react-hooks/set-state-in-effect
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

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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

  // ===================== FILTER SIDEBAR =====================
  const FilterSidebar = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-[15px] font-bold text-[#0B1D36] flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#0B1D36] text-white flex items-center justify-center">
            <SlidersHorizontal size={13} />
          </div>
          Filters
        </h3>
        {activeFiltersCount > 0 && (
          <button
            onClick={resetFilters}
            className="text-[11px] font-semibold text-[#E5484D] bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-full transition-colors flex items-center gap-1"
          >
            <RotateCcw size={10} />
            Clear
          </button>
        )}
      </div>

      {/* Category */}
      <div>
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">
          Category
        </p>
        <div className="space-y-0.5">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleCategoryChange(cat.value)}
              className={`w-full text-left px-3 py-2 rounded-lg text-[13px] transition-all ${
                selectedCategory === cat.value
                  ? "bg-[#0B1D36] text-white font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">
          Price
        </p>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-[#00A8E8]/30 text-[#0B1D36]"
          />
          <span className="text-gray-300 text-sm">–</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-[#00A8E8]/30 text-[#0B1D36]"
          />
        </div>
      </div>

      {/* Brand */}
      <div>
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">
          Brand
        </p>
        <div className="space-y-2">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedBrand.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="w-4 h-4 rounded border-gray-300 text-[#00A8E8] focus:ring-[#00A8E8]"
              />
              <span className="text-[13px] text-gray-600">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">
          Rating
        </p>
        <div className="space-y-1">
          {ratingOptions.map((val) => (
            <button
              key={val}
              onClick={() => setSelectedRating(selectedRating === val ? null : val)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] transition-all ${
                selectedRating === val
                  ? "bg-amber-50 text-amber-700"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={
                      i < Math.floor(val)
                        ? "fill-amber-400 text-amber-400"
                        : "fill-gray-200 text-gray-200"
                    }
                  />
                ))}
              </div>
              <span>{val} & up</span>
            </button>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">
          Availability
        </p>
        <div className="space-y-0.5">
          {[
            { label: "All items", value: "" },
            { label: "In stock only", value: "in-stock" },
            { label: "Out of stock", value: "out-of-stock" },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSelectedStock(opt.value)}
              className={`w-full text-left px-3 py-2 rounded-lg text-[13px] transition-all ${
                selectedStock === opt.value
                  ? "bg-[#0B1D36] text-white font-medium"
                  : "text-gray-600 hover:bg-gray-50"
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
    <div className="bg-[#F4F6F9] min-h-screen pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-7">
        {/* Header */}
        <div className="mb-7">
          <nav className="flex items-center gap-2 text-[13px] text-gray-400 mb-2">
            <Link href="/" className="hover:text-[#00A8E8]">Home</Link>
            <span>/</span>
            <span className="text-[#0B1D36] font-medium">{pageTitle}</span>
          </nav>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-[28px] font-bold text-[#0B1D36]">
                {pageTitle}
              </h1>
              <p className="text-sm text-gray-400 mt-0.5">
                {filteredProducts.length} products
              </p>
            </div>
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-[#0B1D36] text-white rounded-xl text-sm font-medium"
            >
              <SlidersHorizontal size={15} />
              Filters
              {activeFiltersCount > 0 && (
                <span className="bg-[#00A8E8] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="hidden lg:block w-[240px] flex-shrink-0">
            <div className="sticky top-28 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <FilterSidebar />
            </div>
          </aside>

          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <p className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-semibold text-[#0B1D36]">
                  {paginatedProducts.length
                    ? `${(currentPage - 1) * ITEMS_PER_PAGE + 1}–${Math.min(
                        currentPage * ITEMS_PER_PAGE,
                        filteredProducts.length
                      )}`
                    : 0}
                </span>{" "}
                of {filteredProducts.length}
              </p>

              <div className="flex items-center gap-2">
                <div className="flex bg-white rounded-xl p-1 border border-gray-100 shadow-sm">
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
                          : "text-gray-500 hover:text-[#0B1D36]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                <div className="flex bg-white rounded-xl p-1 border border-gray-100 shadow-sm">
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
              <div className="bg-white rounded-2xl py-20 text-center border border-gray-100">
                <p className="text-[#0B1D36] font-semibold text-lg">No products found</p>
                <p className="text-gray-400 text-sm mt-1 mb-5">Try adjusting your filters</p>
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0B1D36] text-white text-sm font-semibold rounded-xl"
                >
                  <RotateCcw size={14} />
                  Clear filters
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
                      layout={viewMode}   // ← important
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-10 flex items-center justify-center gap-1.5">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-500 hover:bg-white disabled:opacity-30 transition-all"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all ${
                          currentPage === page
                            ? "bg-[#0B1D36] text-white shadow-md"
                            : "text-gray-500 hover:bg-white"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-500 hover:bg-white disabled:opacity-30 transition-all"
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

      {/* Mobile Filters */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-[320px] bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <h3 className="font-bold text-[#0B1D36]">Filters</h3>
              <button onClick={() => setMobileFiltersOpen(false)} className="p-2 rounded-full hover:bg-gray-50">
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <FilterSidebar />
            </div>
            <div className="p-4 border-t">
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full py-3 bg-[#0B1D36] text-white font-semibold rounded-xl text-sm"
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