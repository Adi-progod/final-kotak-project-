"use client";

export default function FoodCard({ name, quantity, onDelete, onUpdate }: any) {
  return (
    <div style={{ 
      backgroundColor: "white", padding: "20px", borderRadius: "16px", display: "flex", alignItems: "center", gap: "25px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", border: "1px solid #f0f0f0"
    }}>
      <div style={{ width: "100px", height: "100px", borderRadius: "12px", backgroundColor: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem" }}>
        📦
      </div>

      <div style={{ flex: 1 }}>
        <h3 style={{ margin: 0, fontSize: "1.4rem", fontWeight: "800", color: "#013974" }}>{name}</h3>
        <p style={{ margin: "5px 0", color: "#ED1B24", fontWeight: "700" }}>Stock: {quantity}</p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <div style={{ display: "flex", alignItems: "center", backgroundColor: "#F8F9FA", borderRadius: "8px", padding: "2px" }}>
          <button 
            onClick={() => onUpdate("decrease")} 
            disabled={quantity <= 0}
            style={{ padding: "8px 12px", border: "none", background: "none", cursor: quantity <= 0 ? "not-allowed" : "pointer", fontWeight: "bold", color: "#013974" }}
          >
            -
          </button>
          <span style={{ minWidth: "30px", textAlign: "center", fontWeight: "bold" }}>{quantity}</span>
          <button 
            onClick={() => onUpdate("increase")} 
            style={{ padding: "8px 12px", border: "none", background: "none", cursor: "pointer", fontWeight: "bold", color: "#013974" }}
          >
            +
          </button>
        </div>
        
        <button 
          onClick={onDelete} 
          style={{ padding: "10px 15px", backgroundColor: "transparent", color: "#ED1B24", border: "1.5px solid #ED1B24", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}
        >
          Remove
        </button>
      </div>
    </div>
  );
}