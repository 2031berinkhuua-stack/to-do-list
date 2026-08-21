"use client";
 
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../../lib/supabase/client";
import toast, { Toaster } from "react-hot-toast";
 
export default function StoreCatalog() {
 
 
  const [name, setName] = useState("");        
  const [price, setPrice] = useState("");      
  const [quantity, setQuantity] = useState("");
  const [imageFile, setImageFile] = useState(null);  
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");      
 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    async function getProducts() {
      setLoading(true);
      const { data, error } = await supabase.from("productsdata").select("*");
 
      if (error) {
        console.error("Error loading products:", error.message);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    }
 
    getProducts();
  }, []);
 
 
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
 
    setImageFile(file);
    setUploading(true);
 
 
    const fileName = `${Date.now()}-${file.name}`;
 
 
    const { data, error } = await supabase.storage
      .from("image")
      .upload(fileName, file);
 
    if (error) {
      toast.error("image upload error occured: " + error.message);
      setUploading(false);
      return;
    }
 
    const { data: publicData } = supabase.storage
      .from("images")
      .getPublicUrl(data.path);
 
 
    setImageUrl(publicData.publicUrl);
    setUploading(false);
  };
 
 
  const handleAddProduct = async (e) => {
    e.preventDefault();
 
    if (!name || !price) {
      toast.error("Please enter both a name and a price.");
      return;
    }
 
    const newProduct = {
      name: name,
      price: Number(price),
      quantity: Number(quantity) || 0,
      image_url: imageUrl || "https://via.placeholder.com/150",
    };
 
    const { data, error } = await supabase
      .from("productsdata")
      .insert([newProduct])
      .select();
 
    if (error) {
      toast.error("Error saving product: " + error.message);
    } else if (data) {
      setProducts([...products, data[0]]);
 
      setName("");
      setPrice("");
      setQuantity("");
      setImageUrl("");
      setImageFile(null);
      toast.success("Product added!");
    }
  };
 
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px", fontFamily: "sans-serif" }}>
        <Toaster/>
      <h1>Store Catalog</h1>
 
      <form
        onSubmit={handleAddProduct}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          backgroundColor: "#f4f4f4",
          padding: "16px",
          borderRadius: "8px",
          marginBottom: "30px",
        }}
      >
        <h3>Add New Product</h3>
 
        <input
          type="text"
          placeholder="Product Name *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "8px" }}
        />
 
       
        <input
          type="number"
          placeholder="Price ($) *"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ padding: "8px" }}
        />
 
 
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={{ padding: "8px" }}
        />
 
 
        <label style={{ fontSize: "14px", fontWeight: "bold" }}>
 
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ padding: "8px" }}
        />
        {uploading && <p style={{ color: "#0070f3", margin: 0 }}>Uploading...</p>}
        {imageFile && !uploading && (
          <p style={{ fontSize: "12px", color: "#2e7d32", margin: 0 }}>
             {imageFile.name}
          </p>
        )}
 
    
        <input
          type="text"
          placeholder="(https://...)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          style={{ padding: "8px" }}
        />
 
        <button
          type="submit"
          disabled={uploading}
          style={{
            padding: "10px",
            backgroundColor: uploading ? "#999" : "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: uploading ? "not-allowed" : "pointer",
            fontWeight: "bold",
          }}
        >
          {uploading ? "Uploading..." : "Add Product"}
        </button>
      </form>
 
      <h2>Products</h2>
 
      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "16px",
          }}
        >
          {products.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "12px",
                textAlign: "center",
              }}
            >
              <Link href={`/products/${item.id}`} style={{ textDecoration: "none", color: "black" }}>
                <img
                  src={item.image_url || "https://via.placeholder.com/150"}
                  alt={item.name}
                  style={{ width: "100%", height: "140px", objectFit: "cover", borderRadius: "4px" }}
                />
                <h4 style={{ margin: "10px 0 5px 0" }}>{item.name || item.title}</h4>
              </Link>
 
              <p style={{ fontWeight: "bold", color: "#2e7d32", margin: "5px 0" }}>
                ${Number(item.price || 0).toFixed(2)}
              </p>
              <p style={{ fontSize: "12px", color: "#666", margin: "0" }}>
                In Stock: {item.quantity || 0}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}