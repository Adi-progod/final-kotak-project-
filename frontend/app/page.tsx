"use client";

import { useState, useEffect } from "react";
import FoodCard from "./components/FoodCard";
import AddFoodForm from "./components/AddFoodForm";

const API_BASE_URL =  "http://127.0.0.1:8080/api/food";

export default function Home() {
  const [foods, setFoods] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // --- GET: Fetch all items ---
const fetchFoods = async () => {
    try {
      const response = await fetch(API_BASE_URL);
      
      // --- UPDATE THIS SECTION ---
      if (!response.ok) {
        // This will print "Server Error: 500 Internal Server Error" to your console
        console.error(`Server Error: ${response.status} ${response.statusText}`);
        // If the server sent a text message, try to read it
        const text = await response.text();
        console.error("Server Response Body:", text);
        
        throw new Error(`Backend failed with status: ${response.status}`);
      }
      // ----------------------------

      const data = await response.json();
      setFoods(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  // --- POST: Add food item ---
  // API: /api/food/{itemName}
  const handleAddFood = async (name: string, quantity: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemName: name, quantity: quantity })
      });
      if (response.ok) {
        await fetchFoods(); // Refresh list after success
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error adding food:", error);
    }
  };

  // --- DELETE: Remove item ---
  // API: /api/food/{itemName}
  const handleDeleteFood = async (name: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${encodeURIComponent(name)}`, {
        method: "DELETE",
      });
      if (response.ok) await fetchFoods();
    } catch (error) {
      console.error("Error deleting food:", error);
    }
  };

  // --- PUT: Update count ---
  // API: /api/food/{itemName}?action=(increase/decrease)
  const handleUpdateQuantity = async (name: string, action: "increase" | "decrease") => {
    try {
      const response = await fetch(`${API_BASE_URL}/${encodeURIComponent(name)}?action=${action}`, {
        method: "PUT",
      });
      if (response.ok) await fetchFoods();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  if (loading) return <div style={{ textAlign: "center", padding: "50px" }}>Loading Bazaar...</div>;

  return (
    <main style={{ backgroundColor: "#FDF2F5", minHeight: "100vh", padding: "0", color: "#000000", fontFamily: "'Segoe UI', sans-serif" }}>
      
      {/* --- Aesthetic Header --- */}
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 60px", backgroundColor: "white", boxShadow: "0 4px 20px rgba(0,0,0,0.04)", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div style={{ backgroundColor: "white", padding: "6px", borderRadius: "14px", border: "2px solid #ED1B24" }}>
            <img src="https://e7.pngegg.com/pngimages/20/41/png-clipart-kotak-mahindra-bank-logo-thumbnail-bank-logos-thumbnail.png" alt="Logo" style={{ height: "45px" }} />
          </div>
          <h1 style={{ fontSize: "2.4rem", fontWeight: "900", color: "#013974", margin: 0 }}>Kotak<span style={{ color: "#ED1B24" }}>Bazaar</span></h1>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "25px" }}>
          <button onClick={() => setIsModalOpen(true)} style={{ background: "#F8F9FA", border: "1.5px solid #E9ECEF", width: "40px", height: "40px", borderRadius: "12px", cursor: "pointer", fontSize: "1.5rem", color: "#013974" }}> + </button>
          <div style={{ fontSize: "1.6rem" }}>🛒</div>
          <div style={{ width: "42px", height: "42px", borderRadius: "50%", backgroundColor: "#013974", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #ED1B24" }}>
            <span style={{ color: "white", fontWeight: "bold" }}>JD</span>
          </div>
        </div>
      </header>

      {/* --- List Section --- */}
      <div style={{ maxWidth: "800px", margin: "40px auto", padding: "0 20px", display: "flex", flexDirection: "column", gap: "20px" }}>
        {isModalOpen && (
          <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.6)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, backdropFilter: "blur(8px)" }}>
            <div style={{ backgroundColor: "white", padding: "40px", borderRadius: "28px", width: "90%", maxWidth: "420px" }}>
              <h2 style={{ color: "#013974", textAlign: "center" }}>Add Bazaar Product</h2>
              <AddFoodForm onAdd={handleAddFood} />
              <button onClick={() => setIsModalOpen(false)} style={{ width: "100%", marginTop: "15px", background: "none", border: "none", color: "#999", cursor: "pointer" }}>Cancel</button>
            </div>
          </div>
        )}

        {foods.length > 0 ? (
          foods.map((food, index) => (
            <FoodCard 
              key={food.itemName || index} 
              name={food.itemName} 
              quantity={food.quantity}
              onDelete={() => handleDeleteFood(food.itemName)}
              onUpdate={(action: "increase" | "decrease") => handleUpdateQuantity(food.itemName, action)}
            />
          ))
        ) : (
          <div style={{ textAlign: "center", padding: "40px", color: "#013974" }}>
            <h3>Your Bazaar is empty. Click "+" to add items!</h3>
          </div>
        )}
      </div>
    </main>
  );
}