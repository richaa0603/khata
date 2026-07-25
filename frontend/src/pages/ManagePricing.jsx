import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  getBuyerPricing,
  savePricing,
} from "../services/pricingService";

export default function ManagePricing() {
  const navigate = useNavigate();

  const { buyerId } = useParams();

  const [buyer, setBuyer] = useState(null);
  const [pricing, setPricing] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPage();
  }, [buyerId]);

  const loadPage = async () => {
    try {
      const buyerResponse = await axios.get(
        `http://localhost:5228/api/buyers`
      );

      const selectedBuyer =
        buyerResponse.data.find(
          (x) => x.id === Number(buyerId)
        );

      setBuyer(selectedBuyer);

      const pricingData =
        await getBuyerPricing(buyerId);

      setPricing(pricingData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updatePrice = (
    productId,
    value
  ) => {
    setPricing((prev) =>
      prev.map((product) =>
        product.id === productId
          ? {
              ...product,
              price: value,
            }
          : product
      )
    );
  };

  const saveAll = async () => {
    try {
      for (const item of pricing) {
        await savePricing(
          buyerId,
          item.id,
          Number(item.price)
        );
      }

      alert(
        "Pricing saved successfully ✅"
      );
    } catch (error) {
      console.error(error);

      alert(
        "Failed to save pricing"
      );
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "30px" }}>
        Loading...
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <button
        onClick={() => navigate("/buyers")}
        style={{
          marginBottom: "25px",
        }}
      >
        ← Back
      </button>

      <h1>
        {buyer?.buyerName} Pricing
      </h1>

      <p>
        Configure custom product rates
        for this buyer.
      </p>

      <div
        style={{
          marginTop: "30px",
        }}
      >
        {pricing.map((product) => (
          <div
            key={product.id}
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",

              marginBottom: "12px",

              padding: "16px",

              borderRadius: "12px",

              background: "#f6f7fb",
            }}
          >
            <div>
              <strong>
                {product.productName}
              </strong>
            </div>

            <input
              type="number"
              value={product.price}
              onChange={(e) =>
                updatePrice(
                  product.id,
                  e.target.value
                )
              }
              style={{
                width: "120px",
                padding: "10px",
              }}
            />
          </div>
        ))}
      </div>

      <button
        onClick={saveAll}
        style={{
          marginTop: "20px",

          padding:
            "12px 24px",

          border: "none",

          borderRadius: "10px",

          background:
            "#2563eb",

          color: "white",

          cursor: "pointer",
        }}
      >
        Save Pricing
      </button>
    </div>
  );
}