"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Package,
  Filter,
} from "lucide-react";

interface Product {
  id: number;
  title: string;
  price: number;
  oldPrice?: number;
  category: string;
  stock: "In Stock" | "Low Stock" | "Out of Stock";
  image: string;
  rating: number;
}

const initialProducts: Product[] = [
  {
    id: 1,
    title: "Apple MagSafe Battery Pack",
    price: 99.99,
    oldPrice: 129.99,
    category: "Accessories",
    stock: "Low Stock",
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=200&q=80",
    rating: 4.6,
  },
  {
    id: 2,
    title: "Sony WH-1000XM5 Wireless Headphones",
    price: 348,
    oldPrice: 399.99,
    category: "Sounds",
    stock: "In Stock",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=200&q=80",
    rating: 4.8,
  },
  {
    id: 3,
    title: "MacBook Air M2 13-inch",
    price: 1249,
    oldPrice: 1499,
    category: "Laptops",
    stock: "In Stock",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&q=80",
    rating: 4.9,
  },
  {
    id: 4,
    title: "Samsung Galaxy S23 Ultra",
    price: 1199,
    oldPrice: 1299,
    category: "Cell Phones",
    stock: "In Stock",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=200&q=80",
    rating: 4.9,
  },
  {
    id: 5,
    title: "PlayStation 5 Slim Console",
    price: 499,
    oldPrice: 549,
    category: "Gaming & VR",
    stock: "Low Stock",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=200&q=80",
    rating: 4.9,
  },
  {
    id: 6,
    title: "Apple AirPods Pro 2nd Gen",
    price: 229,
    oldPrice: 249,
    category: "Accessories",
    stock: "Out of Stock",
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=200&q=80",
    rating: 4.8,
  },
];

const categories = [
  "All",
  "Laptops",
  "Cell Phones",
  "Accessories",
  "Sounds",
  "Gaming & VR",
  "Tablets",
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);

  // Form state
  const [form, setForm] = useState({
    title: "",
    price: "",
    oldPrice: "",
    category: "Laptops",
    stock: "In Stock" as Product["stock"],
    image: "",
  });

  const filtered = products.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || p.category === category;
    return matchSearch && matchCat;
  });

  const openAdd = () => {
    setEditing(null);
    setForm({
      title: "",
      price: "",
      oldPrice: "",
      category: "Laptops",
      stock: "In Stock",
      image: "",
    });
    setShowModal(true);
  };

  const openEdit = (product: Product) => {
    setEditing(product);
    setForm({
      title: product.title,
      price: String(product.price),
      oldPrice: product.oldPrice ? String(product.oldPrice) : "",
      category: product.category,
      stock: product.stock,
      image: product.image,
    });
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Product = {
      id: editing?.id ?? Date.now(),
      title: form.title,
      price: parseFloat(form.price) || 0,
      oldPrice: form.oldPrice ? parseFloat(form.oldPrice) : undefined,
      category: form.category,
      stock: form.stock,
      image:
        form.image ||
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80",
      rating: editing?.rating ?? 4.5,
    };

    if (editing) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editing.id ? payload : p))
      );
    } else {
      setProducts((prev) => [payload, ...prev]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Delete this product?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const stockColor = (stock: Product["stock"]) => {
    if (stock === "In Stock") return "bg-emerald-50 text-emerald-600";
    if (stock === "Low Stock") return "bg-amber-50 text-amber-600";
    return "bg-red-50 text-red-500";
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-[#0B1D36]">Products</h2>
          <p className="text-sm text-gray-400 mt-0.5">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 h-10 px-4 bg-[#0B1D36] hover:bg-[#00A8E8] text-white text-sm font-semibold rounded-xl transition-colors"
        >
          <Plus size={16} />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-5 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#00A8E8] focus:ring-2 focus:ring-[#00A8E8]/15 text-[#0B1D36]"
          />
        </div>
        <div className="relative">
          <Filter
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="pl-9 pr-8 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#00A8E8] text-[#0B1D36] bg-white appearance-none min-w-[160px]"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/80">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Product
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">
                  Category
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Price
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden sm:table-cell">
                  Stock
                </th>
                <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-16 text-center">
                    <Package size={32} className="mx-auto text-gray-200 mb-2" />
                    <p className="text-gray-400 text-sm">No products found</p>
                  </td>
                </tr>
              ) : (
                filtered.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl bg-[#F7F8FA] overflow-hidden shrink-0">
                          <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-[#0B1D36] line-clamp-1">
                            {product.title}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            ID: {product.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <span className="text-gray-500">{product.category}</span>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-semibold text-[#0B1D36]">
                        ${product.price.toFixed(2)}
                      </p>
                      {product.oldPrice && (
                        <p className="text-xs text-gray-400 line-through">
                          ${product.oldPrice.toFixed(2)}
                        </p>
                      )}
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <span
                        className={`inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full ${stockColor(
                          product.stock
                        )}`}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEdit(product)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-[#F0F9FF] hover:text-[#00A8E8] transition-colors"
                          title="Edit"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowModal(false)}
          />
          <div className="relative bg-white rounded-2xl w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-[#0B1D36]">
                {editing ? "Edit Product" : "Add Product"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-[13px] font-medium text-[#0B1D36] mb-1.5">
                  Product name
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                  placeholder="Product title"
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#00A8E8] text-[#0B1D36]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[13px] font-medium text-[#0B1D36] mb-1.5">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={form.price}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, price: e.target.value }))
                    }
                    placeholder="0.00"
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#00A8E8] text-[#0B1D36]"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[#0B1D36] mb-1.5">
                    Old price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={form.oldPrice}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, oldPrice: e.target.value }))
                    }
                    placeholder="Optional"
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#00A8E8] text-[#0B1D36]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[13px] font-medium text-[#0B1D36] mb-1.5">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, category: e.target.value }))
                    }
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#00A8E8] text-[#0B1D36] bg-white"
                  >
                    {categories
                      .filter((c) => c !== "All")
                      .map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[#0B1D36] mb-1.5">
                    Stock status
                  </label>
                  <select
                    value={form.stock}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        stock: e.target.value as Product["stock"],
                      }))
                    }
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#00A8E8] text-[#0B1D36] bg-white"
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-medium text-[#0B1D36] mb-1.5">
                  Image URL
                </label>
                <input
                  type="url"
                  value={form.image}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, image: e.target.value }))
                  }
                  placeholder="https://..."
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#00A8E8] text-[#0B1D36]"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 h-11 text-sm font-semibold text-[#0B1D36] bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 h-11 text-sm font-semibold text-white bg-[#0B1D36] hover:bg-[#00A8E8] rounded-xl transition-colors"
                >
                  {editing ? "Save Changes" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}