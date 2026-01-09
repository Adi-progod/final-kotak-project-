"use client";
import { useState } from "react";

export default function AddFoodForm({ onAdd }: any) {
  const [name, setName] = useState("");
  const [qty, setQty] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter a product name");
      return;
    }
    onAdd(name.trim(), qty); 
    setName(""); 
    setQty(1);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      <input 
        type="text" 
        placeholder="Product Name (e.g. Milk)" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        required
        style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ccc", color: "black" }} 
      />
      <input 
        type="number" 
        placeholder="Initial Quantity" 
        value={qty} 
        min="1"
        onChange={(e) => setQty(Number(e.target.value))} 
        style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ccc", color: "black" }} 
      />
      <button 
        type="submit" 
        style={{ padding: "12px", backgroundColor: "#013974", color: "white", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}
      >
        Add to Bazaar
      </button>
    </form>
  );
}