"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../../lib/supabase/client";

const Page = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchItem() {
      try {
        setLoading(true);

        const { data, error } = await supabase
          .from("productsdata")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;

        setItem(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-gray-50">
        <p className="text-xl font-medium text-gray-500 animate-pulse">Loading product details...</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-gray-50">
        <p className="text-xl font-medium text-gray-600">Product not found.</p>
      </div>
    );
  }

  return (

    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 p-6">
      

      <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl transition-all duration-300 hover:shadow-xl md:flex">
        

        <div className="relative md:w-1/2 h-64 md:h-auto bg-gray-100">
          {item.image_url ? (
            <img
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              src={item.image_url}
              alt={item.name}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-400">
              No Image Available
            </div>
          )}
        </div>

        <div className="flex md:w-1/2 flex-col justify-between p-8">
          <div>
          
            <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-3">
              In Stock
            </span>
            
  
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 md:text-3xl leading-tight">
              {item.name}
            </h2>
            
    
            <div className="mt-4 flex items-baseline">
              <span className="text-3xl font-black text-emerald-600">${item.price}</span>
              <span className="ml-1 text-sm text-gray-400">USD</span>
            </div>

            {item.description && (
              <p className="mt-4 text-base text-gray-600 leading-relaxed">
                {item.description}
              </p>
            )}
          </div>

  
          <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-wider text-gray-400 font-bold">Availability</span>
              <span className="text-sm font-semibold text-gray-700">{item.quantity} items left</span>
            </div>
            
    
            <button className="rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-gray-800 transition-colors duration-200">
              Add to Cart
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Page;
