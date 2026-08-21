"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../../lib/supabase/client";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [priceFilter, setPriceFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 20;

  useEffect(() => {
    async function getProducts() {
      const { data, error } = await supabase.from("productsdata").select("*");

      if (error) {
        console.error("Error fetching products:", error.message);
      } else {
        setProducts(data || []);
      }
    }

    getProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const price = Number(product.price || 0);

    let matchesPrice = true;
    if (priceFilter === "1-20") {
      matchesPrice = price >= 1 && price <= 20;
    } else if (priceFilter === "20-200") {
      matchesPrice = price > 20 && price <= 200;
    } else if (priceFilter === "200+") {
      matchesPrice = price > 200;
    }

    const title = (product.title || product.name || "").toLowerCase();
    const brand = (product.brand || "").toLowerCase();
    const query = searchTerm.toLowerCase();

    const matchesSearch = title.includes(query) || brand.includes(query);

    return matchesPrice && matchesSearch;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        
        {/* Header Section */}
        <div className="flex flex-col gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
            Products Catalog
          </h2>
          <div className="relative max-w-xs w-full">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-xl border border-gray-300 bg-white py-2 pl-4 pr-4 text-sm text-gray-900 shadow-sm transition-all focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="my-6 flex flex-wrap gap-2">
          {[
            { id: "all", label: "All Products" },
            { id: "1-20", label: "$1 - $20" },
            { id: "20-200", label: "$20 - $200" },
            { id: "200+", label: "$200+" },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => {
                setPriceFilter(btn.id);
                setCurrentPage(1);
              }}
              className={`rounded-xl px-4 py-2 text-xs font-semibold tracking-wide uppercase transition-all duration-200 shadow-sm ${
                priceFilter === btn.id
                  ? "bg-gray-900 text-white shadow-md"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Empty State */}
        {currentProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-lg font-medium text-gray-500">No items match your filters.</p>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {currentProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Image Box */}
              <div className="relative mb-4 flex h-44 w-full items-center justify-center overflow-hidden rounded-xl bg-gray-50 p-2">
                <img
                  src={
                    product.image_url ||
                    product.imageUrl ||
                    "https://via.placeholder.com/180"
                  }
                  alt={product.title || product.name}
                  className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Text Info */}
              <div className="flex flex-1 flex-col">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  {product.brand || "Generic"}
                </span>

                <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-gray-800 transition-colors group-hover:text-emerald-600">
                  {product.title || product.name}
                </h3>

                {/* Price Display */}
                <div className="mt-4 text-lg font-black text-gray-900">
                  ${Number(product.price || 0).toFixed(2)}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-4 border-t border-gray-200 pt-6">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-bold text-gray-600 shadow-sm transition-all hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-40"
            >
              Previous
            </button>

            <span className="text-sm font-medium text-gray-500">
              Page <span className="font-bold text-gray-900">{currentPage}</span> of{" "}
              <span className="font-bold text-gray-900">{totalPages}</span>
            </span>

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-bold text-gray-600 shadow-sm transition-all hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

