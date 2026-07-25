import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getBuyers } from "../services/buyerService";
import "./BuyerPage.css";

export default function BuyerPage() {
  const navigate = useNavigate();

  const [buyers, setBuyers] = useState([]);

useEffect(() => {
  loadBuyers();
}, []);

const loadBuyers = async () => {
  try {
    const data = await getBuyers();
    setBuyers(data);
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="buyers-container">
      <div className="buyers-header">
        <h1>Select Buyer</h1>

        <div className="buyers-count">
          Total Buyers: {buyers.length}
        </div>
      </div>

      <input
        type="text"
        placeholder="Search Buyer..."
        className="buyer-search"
      />

      <div className="buyers-grid">
        {buyers.map((buyer) => (
          <div className="buyer-card" key={buyer.id}>
            <div className="buyer-avatar">
              👤
            </div>
            <h2>{buyer.buyerName}</h2>

<p>{buyer.phoneNumber}</p>

<p>
  Discount: {buyer.discountPercentage}%
</p>

            <button
              className="select-btn"
              onClick={() =>
                navigate(`/buyers/${buyer.id}/products`)
              }
            >
              Select Buyer
            </button>

            <div className="buyer-actions">
              <button
                onClick={() =>
                  navigate(`/buyers/${buyer.id}/history`)
                }
              >
                History
              </button>

              <button
                onClick={() =>
                  navigate(`/buyers/${buyer.id}/pricing`)
                }
              >
                Pricing
              </button>
            </div>
          </div>
        ))}

        <div className="buyer-card add-card">
          <div className="add-icon">+</div>

          <h3>Add Buyer</h3>

          <button
            className="select-btn"
            onClick={() => navigate("/buyers/add")}
          >
            Create Buyer
          </button>
        </div>
      </div>
    </div>
  );
}