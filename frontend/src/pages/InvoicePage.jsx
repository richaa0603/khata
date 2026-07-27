import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBuyerById } from "../services/buyerService";
import {
  saveInvoice,
  downloadInvoicePdf,
} from "../services/invoiceService";
import "./InvoicePage.css";
export default function InvoicePage() {
  const { state } = useLocation();
  const products =
    state?.products || [];
  const buyerId =
    state?.buyerId;
  const shopkeeperId =
    state?.shopkeeperId;
  const [buyer, setBuyer] =
    useState(null);
  const [saved, setSaved] =
  useState(false);
 const [saving, setSaving] =
  useState(true);
 const [invoiceId, setInvoiceId] =
  useState(null);
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
  const loadBuyer =
    async () => {
      try {
        const data =
          await getBuyerById(
            buyerId
          );
        setBuyer(data);
      } catch (error) {
        console.error(error);
      }
    };
  const subtotal =
    products.reduce(
      (sum, product) =>
        sum +
        product.price *
          product.quantity,
      0
    );
  const discountPercentage =
    buyer?.discountPercentage ||
    0;
  const discountAmount =
    (subtotal *
      discountPercentage) /
    100;
  const amountAfterDiscount =
    subtotal -
    discountAmount;
  const gstAmount =
    (amountAfterDiscount *
      5) /
    100;

  const grandTotal =
    amountAfterDiscount +
    gstAmount;
 const storeInvoice = async () => {
  try {

    setSaving(true);

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
      "Saving invoice:",
      payload
    );

    const result =
      await saveInvoice(payload);

    console.log(
      "Saved Invoice ID:",
      result
    );

    setInvoiceId(result);

    setSaved(true);

  } catch (error) {

    console.error(
      "Invoice save failed:",
      error
    );

  } finally {

    setSaving(false);
  }
};

  const handleDownloadPdf =
    async () => {
      console.log(
        "invoiceId:",
        invoiceId
      );

      if (saving) {
        alert(
          "Invoice is still being saved."
        );
        return;
      }

      if (!invoiceId) {
        alert(
          "Invoice save failed."
        );
        return;
      }

      try {
        await downloadInvoicePdf(
          invoiceId
        );
      } catch (error) {
        console.error(error);
        alert(
          "Failed to download PDF"
        );
      }
    };

  const invoiceNumber =
    invoiceId || "N/A";
  const generatedAt =
    new Date()
      .toLocaleDateString();

  return (
  <div className="invoice-page">

    <div className="invoice-container">

      <div className="invoice-header">

        <div className="header-logo">
          <img src="logo.png" alt="Khata Logo" />
        </div>


        <div className="header-company">

          <h1>
            KHATA SANITARY INDUSTRIES
          </h1>

          <p>
            Delhi NCR, India
          </p>

          <p>
            GSTIN:
            22ABCDE1234F1Z5
          </p>

          <p>
            Phone:
            +91 9999999999
          </p>

        </div>

      </div>

      <div className="invoice-heading">
        TAX INVOICE
      </div>

      <div className="invoice-meta">

        <div>
          <strong>
            Invoice No:
          </strong>{" "}
          {invoiceNumber}
        </div>

        <div>
          <strong>
            Date:
          </strong>{" "}
          {generatedAt}
        </div>

      </div>

      <div className="buyer-section">

        <h3>
          Details of Buyer
        </h3>

        <p>
          {buyer?.buyerName}
        </p>

        <p>
          {buyer?.address}
        </p>

        <p>
          {buyer?.phoneNumber}
        </p>

        <p>
          Discount:{" "}
          {buyer?.discountPercentage || 0}%
        </p>

      </div>

      <div className="table-wrapper">

        <table className="invoice-table">

          <thead>

            <tr>

              <th>
                Product
              </th>

              <th>
                Qty
              </th>

              <th>
                Rate
              </th>

              <th>
                Amount
              </th>

            </tr>

          </thead>

          <tbody>

            {products.map(
              (product) => (

                <tr
                  key={product.id}
                >

                  <td>
                    {product.name}
                  </td>

                  <td>
                    {product.quantity}
                  </td>

                  <td>
                    ₹ {product.price}
                  </td>

                  <td>
                    ₹{" "}
                    {(
                      product.price *
                      product.quantity
                    ).toFixed(2)}
                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

      <div className="totals-section">

        <div className="totals-table">

          <div>

            <span>
              Subtotal
            </span>

            <span>
              ₹ {subtotal.toFixed(2)}
            </span>

          </div>

          <div>

            <span>
              Discount
            </span>

            <span>
              ₹ {discountAmount.toFixed(2)}
            </span>

          </div>

          <div>

            <span>
              GST (5%)
            </span>

            <span>
              ₹ {gstAmount.toFixed(2)}
            </span>

          </div>

          <div className="grand-row">

            <span>
              GRAND TOTAL
            </span>

            <span>
              ₹ {grandTotal.toFixed(2)}
            </span>

          </div>

        </div>

      </div>

      <div className="signatures">

        <div>

          <div className="signature-line"></div>

          <p>
            Buyer Signature
          </p>

        </div>

        <div>

          <div className="signature-line"></div>

          <p>
            Authorized Signature
          </p>

        </div>

      </div>

      <div className="invoice-footer">

        Thank you for doing
        business with
        Khata Sanitary Industries.

      </div>

      <div className="invoice-actions">

        <button
          className="download-btn"
          onClick={() =>
            window.print()
          }
        >
          Print Bill
        </button>

        <button
          className="download-btn"
          onClick={handleDownloadPdf}
          disabled={saving}
        >
          {
            saving
              ? "Saving Invoice..."
              : "Download PDF"
          }
        </button>

      </div>

    </div>

  </div>
);
}