import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBuyerById } from "../services/buyerService";
import "./InvoicePage.css";
import { saveInvoice }
from "../services/invoiceService";

export default function InvoicePage() {
  const { state } = useLocation();

const products = state?.products || [];
const buyerId = state?.buyerId;
const shopkeeperId =
  state?.shopkeeperId;
  const [saved, setSaved] =
  useState(false);

const [buyer, setBuyer] = useState(null);

useEffect(() => {
  if (buyerId) {
    loadBuyer();
  }
}, [buyerId]);

useEffect(() => {
 if (
  buyer &&
  products.length > 0 &&
  !saved
) {
    storeInvoice();
  }
}, [buyer]);
const storeInvoice = async () => {
  try {

    const payload = {
  buyerId,

  shopkeeperId,

  subtotal,

  discountAmount,

  gstAmount,

  grandTotal,

  items: products.map((product) => ({
    productId: product.id,

    productName: product.name,

    rate: product.price,

    quantity: product.quantity,

    amount:
      product.price *
      product.quantity,
  })),
};

    console.log(
      "Invoice payload:",
      payload
    );

    const result = await saveInvoice(
      payload
    );
setSaved(true);

    console.log(
      "Invoice saved:",
      result
    );

  } catch (error) {
    console.error(
      "Invoice save failed:",
      error.response?.data ||
      error.message ||
      error
    );
  }
};

const loadBuyer = async () => {
  try {
    const data = await getBuyerById(buyerId);
    setBuyer(data);
  } catch (error) {
    console.error(error);
  }
};
  const subtotal = products.reduce(
    (sum, product) =>
      sum + product.price * product.quantity,
    0
  );

 const discountPercentage =
  buyer?.discountPercentage || 0;


  const discountAmount =
    (subtotal * discountPercentage) / 100;

  const amountAfterDiscount =
    subtotal - discountAmount;

  const gstAmount =
    (amountAfterDiscount * 5) / 100;

  const grandTotal =
    amountAfterDiscount + gstAmount;

  const invoiceNumber =
    "KH-" + Math.floor(100000 + Math.random() * 900000);

  const generatedAt =
    new Date().toLocaleString();

  return (
    <div className="invoice-page">
      <div className="invoice-container">

        <div className="invoice-header">
          <div>
            <h1>KHATA SANITARY INDUSTRIES</h1>

            <p>Delhi NCR, India</p>
            <p>GSTIN: 22ABCDE1234F1Z5</p>
            <p>Phone: +91 9999999999</p>
            <p>Account No: 1234567890</p>
            <p>IFSC: HDFC0001234</p>
          </div>

          <div className="company-logo">
            LOGO
          </div>
        </div>

        <hr />

        <div className="invoice-title">
          <h2>TAX INVOICE</h2>
        </div>

        <div className="invoice-info">
          <div>
            <h3>Invoice Details</h3>

            <p>
              <strong>Invoice No:</strong>{" "}
              {invoiceNumber}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {generatedAt}
            </p>
          </div>

          <div>
  <h3>Buyer Details</h3>

  <p>{buyer?.buyerName}</p>

  <p>{buyer?.phoneNumber}</p>

  <p>{buyer?.address}</p>

  <p>
    Discount:{" "}
    {buyer?.discountPercentage || 0}%
  </p>
</div>
        </div>

        <table className="invoice-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Rate</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>

                <td>{product.quantity}</td>

                <td>₹ {product.price}</td>

                <td>
                  ₹ {(product.price * product.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="summary-section">
          <div className="summary-card">
            <p>
              <span>Subtotal</span>
              <span>
                ₹ {subtotal.toFixed(2)}
              </span>
            </p>

            <p>
              <span>
                Discount ({discountPercentage}%)
              </span>
              <span>
                - ₹{" "}
                {discountAmount.toFixed(2)}
              </span>
            </p>

            <p>
              <span>GST (5%)</span>
              <span>
                ₹ {gstAmount.toFixed(2)}
              </span>
            </p>

            <hr />

            <p className="grand-total">
              <span>Grand Total</span>
              <span>
                ₹ {grandTotal.toFixed(2)}
              </span>
            </p>
          </div>
        </div>

        <div className="signatures">
          <div>
            <div className="signature-box"></div>
            <p>Buyer Signature</p>
          </div>

          <div>
            <div className="signature-box"></div>
            <p>Authorized Signature</p>
          </div>
        </div>

        <div className="invoice-footer">
          <p>
            Thank you for doing business with
            Khata Sanitary Industries.
          </p>
        </div>

        <button
          className="download-btn"
          onClick={() => window.print()}
        >
          Download Bill
        </button>
      </div>
    </div>
  );
}