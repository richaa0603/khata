import { useNavigate } from "react-router-dom";
import "./BuyerPage.css";

export default function BuyerPage() {
  const navigate = useNavigate();

  const buyers = [
    {
      id: 1,
      name: "Gupta Traders",
      phone: "9999990001",
      discount: "5%",
    },
    {
      id: 2,
      name: "Royal Sanitary",
      phone: "9999990002",
      discount: "8%",
    },
    {
      id: 3,
      name: "Om Enterprises",
      phone: "9999990003",
      discount: "10%",
    },
  ];

  return (
    <div className="buyers-container">
      <h1>Select Buyer</h1>

      <input
        type="text"
        placeholder="Search Buyer..."
        className="buyer-search"
      />

      <div className="buyers-grid">
        {buyers.map((buyer) => (
          <div className="buyer-card" key={buyer.id}>
            <h2>{buyer.name}</h2>

            <p>📞 {buyer.phone}</p>

            <p>💸 Discount: {buyer.discount}</p>

            <button
              className="select-btn"
              onClick={() =>
                navigate(`/buyers/${buyer.id}/products`)
              }
            >
              Select Buyer
            </button>

            <div className="buyer-actions">
              <button>History</button>
              <button>Manage</button>
            </div>
          </div>
        ))}

        <div className="buyer-card add-card">
          <h2>+</h2>
          <p>Add Buyer</p>
        </div>
      </div>
    </div>
  );
}