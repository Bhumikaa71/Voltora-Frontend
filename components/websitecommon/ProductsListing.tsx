"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  List,
  RotateCcw,
  SlidersHorizontal,
  Star,
  X,
} from "lucide-react";
import ProductCard from "@/components/websitecommon/productcard";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const ratingOptions = [4.5, 4, 3.5, 3];
const ITEMS_PER_PAGE = 6;

interface ProductsListingProps {
  initialCategory?: string;
}

export default function ProductsListing({
  initialCategory = "",
}: ProductsListingProps) {
  const router = useRouter();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Dynamic filters
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [availableBrands, setAvailableBrands] = useState<string[]>([]);

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

  // Fetch products + categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [productsRes, categoriesRes] = await Promise.all([
          fetch(`${API_URL}/api/products`),
          fetch(`${API_URL}/api/products/categories`),
        ]);

        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();

        const productsList = Array.isArray(productsData) ? productsData : [];
        setProducts(productsList);

        setAvailableCategories(
          Array.isArray(categoriesData) ? categoriesData : []
        );

        // Extract unique brands
        const brands = [
          ...new Set(
            productsList
              .map((p: any) => p.brand)
              .filter((b: string) => b && b.trim() !== "")
          ),
        ].sort() as string[];

        setAvailableBrands(brands);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setSelectedCategory(initialCategory);
    setCurrentPage(1);
  }, [initialCategory]);

  // ========== FILTERING ==========
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category
    if (selectedCategory) {
      result = result.filter(
        (p) =>
          p.category?.toLowerCase().trim() ===
          selectedCategory.toLowerCase().trim()
      );
    }

    // Brand
    if (selectedBrand.length > 0) {
      result = result.filter((p) =>
        selectedBrand.some(
          (b) =>
            b.toLowerCase().trim() === (p.brand || "").toLowerCase().trim()
        )
      );
    }

    // Price
    const min = minPrice ? Number(minPrice) : 0;
    const max = maxPrice ? Number(maxPrice) : Infinity;
    result = result.filter((p) => p.price >= min && p.price <= max);

    // Rating
    if (selectedRating) {
      result = result.filter((p) => (p.rating || 0) >= selectedRating);
    }

    // Availability
    if (selectedStock === "in-stock") {
      result = result.filter(
        (p) => p.stock === "In Stock" || p.stock === "Low Stock"
      );
    }
    if (selectedStock === "out-of-stock") {
      result = result.filter((p) => p.stock === "Out of Stock");
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime()
        );
        break;
    }

    return result;
  }, [
    products,
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
    setCurrentPage(1);
  }, [
    selectedCategory,
    selectedBrand,
    minPrice,
    maxPrice,
    selectedRating,
    selectedStock,
    sortBy,
  ]);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    if (value) {
      router.push(`/products?category=${encodeURIComponent(value)}`);
    } else {
      router.push("/products");
    }
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrand((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
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

  const pageTitle = selectedCategory || "All Products";

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

      {/* Category - DYNAMIC */}
      <div>
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">
          Category
        </p>
        <div className="space-y-0.5">
          <button
            onClick={() => handleCategoryChange("")}
            className={`w-full text-left px-3 py-2 rounded-lg text-[13px] transition-all ${
              selectedCategory === ""
                ? "bg-[#0B1D36] text-white font-medium"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            All
          </button>
          {availableCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`w-full text-left px-3 py-2 rounded-lg text-[13px] transition-all ${
                selectedCategory === cat
                  ? "bg-[#0B1D36] text-white font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {cat}
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

      {/* Brand - DYNAMIC */}
      {availableBrands.length > 0 && (
        <div>
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">
            Brand
          </p>
          <div className="space-y-2">
            {availableBrands.map((brand) => (
              <label
                key={brand}
                className="flex items-center gap-2.5 cursor-pointer"
              >
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
      )}

      {/* Rating */}
      <div>
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">
          Rating
        </p>
        <div className="space-y-1">
          {ratingOptions.map((val) => (
            <button
              key={val}
              onClick={() =>
                setSelectedRating(selectedRating === val ? null : val)
              }
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

  if (loading) {
    return (
      <div className="bg-[#F4F6F9] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#00A8E8] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-slate-500">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F4F6F9] min-h-screen pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-7">
        {/* Header */}
        <div className="mb-7">
          <nav className="flex items-center gap-2 text-[13px] text-gray-400 mb-2">
            <Link href="/" className="hover:text-[#00A8E8]">
              Home
            </Link>
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
                <p className="text-[#0B1D36] font-semibold text-lg">
                  No products found
                </p>
                <p className="text-gray-400 text-sm mt-1 mb-5">
                  Try adjusting your filters
                </p>
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
                      key={product._id}
                      id={product._id}
                      title={product.title}
                      price={product.price}
                      oldPrice={product.oldPrice}
                      rating={product.rating || 4.5}
                      reviews={product.reviews || 0}
                      image={product.images?.[0] || ""}
                      stock={product.stock || "In Stock"}
                      freeShipping={product.freeShipping}
                      freeGift={product.freeGift}
                      layout={viewMode}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-10 flex items-center justify-center gap-1.5">
                    <button
                      onClick={() =>
                        setCurrentPage((p) => Math.max(1, p - 1))
                      }
                      disabled={currentPage === 1}
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-500 hover:bg-white disabled:opacity-30 transition-all"
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
                              ? "bg-[#0B1D36] text-white shadow-md"
                              : "text-gray-500 hover:bg-white"
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
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-[320px] bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <h3 className="font-bold text-[#0B1D36]">Filters</h3>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-2 rounded-full hover:bg-gray-50"
              >
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