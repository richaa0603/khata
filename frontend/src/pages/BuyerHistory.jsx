import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  getBuyerInvoices,
} from "../services/invoiceService";

export default function BuyerHistory() {
  const { buyerId } =
    useParams();

  const navigate =
    useNavigate();

  const [invoices,
    setInvoices] =
    useState([]);

  useEffect(() => {
    loadInvoices();
  }, [buyerId]);

  const loadInvoices =
    async () => {
      try {
        const data =
          await getBuyerInvoices(
            buyerId
          );

        setInvoices(data);
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "1000px",
        margin: "0 auto",
      }}
    >
      <button
        onClick={() =>
          navigate("/buyers")
        }
      >
        ← Back
      </button>

      <h1>
        Buyer Invoice History
      </h1>

      {invoices.length === 0 && (
        <p>
          No invoices found.
        </p>
      )}

      {invoices.map(
        (invoice) => (
          <div
            key={invoice.id}
            style={{
              border:
                "1px solid #ddd",
              borderRadius:
                "12px",
              padding: "20px",
              marginBottom:
                "15px",
              background:
                "#fff",
            }}
          >
            <h3>
              {
                invoice.invoiceNumber
              }
            </h3>

            <p>
              Date:
              {" "}
              {new Date(
                invoice.invoiceDate
              ).toLocaleString()}
            </p>

            <p>
              Grand Total:
              {" "}
              ₹
              {invoice.grandTotal}
            </p>

            <p>
              Discount:
              {" "}
              ₹
              {
                invoice.discountAmount
              }
            </p>

            <p>
              GST:
              {" "}
              ₹
              {
                invoice.gstAmount
              }
            </p>
          </div>
        )
      )}
    </div>
  );
}