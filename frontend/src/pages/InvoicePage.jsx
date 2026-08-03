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

    <div className="invoice-paper">

      <div className="company-header">

        <div className="company-logo">
          /logo.png
        </div>

        <div className="company-info">

          <div className="invoice-type">
            TAX INVOICE
          </div>

          <h1>
            KHATA SANITARY INDUSTRIES
          </h1>

          <p>
            Deals in Sanitary &
            Plumbing Products
          </p>

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

      <div className="gst-strip">

        <div>
          <strong>GSTIN:</strong>
          {" "}
          22ABCDE1234F1Z5
        </div>

        <div>
          <strong>Invoice No:</strong>
          {" "}
          {invoiceNumber}
        </div>

        <div>
          <strong>Date:</strong>
          {" "}
          {generatedAt}
        </div>

      </div>

      <div className="buyer-box">

        <div className="section-title">
          Details of Receiver (Billed To)
        </div>

        <p>
          <strong>Name:</strong>
          {" "}
          {buyer?.buyerName}
        </p>

        <p>
          <strong>Address:</strong>
          {" "}
          {buyer?.address}
        </p>

        <p>
          <strong>Phone:</strong>
          {" "}
          {buyer?.phoneNumber}
        </p>

        <p>
          <strong>Discount:</strong>
          {" "}
          {buyer?.discountPercentage || 0}%
        </p>

      </div>

      <table className="gst-table">

        <thead>

          <tr>

            <th>No.</th>

            <th>
              Product Description
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
            (
              product,
              index
            ) => (

              <tr
                key={product.id}
              >

                <td>
                  {index + 1}
                </td>

                <td>
                  {product.name}
                </td>

                <td>
                  {
                    product.quantity
                  }
                </td>

                <td>
                  ₹
                  {" "}
                  {product.price}
                </td>

                <td>
                  ₹
                  {" "}
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

      <div className="bottom-section">

        <div className="amount-words">

          <h4>
            Total Invoice Value
            (In Words)
          </h4>

          <p>
            Rupees
            {" "}
            {grandTotal.toFixed(2)}
            {" "}
            Only
          </p>

          <div className="bank-details">

            <h4>
              Bank Details
            </h4>

            <p>
              KHATA SANITARY
              INDUSTRIES
            </p>

            <p>
              A/C:
              1234567890
            </p>

            <p>
              IFSC:
              HDFC0001234
            </p>

          </div>

        </div>

        <div className="total-box">

          <div>
            <span>
              Subtotal
            </span>

            <span>
              ₹
              {" "}
              {subtotal.toFixed(2)}
            </span>

          </div>

          <div>
            <span>
              Discount
            </span>

            <span>
              ₹
              {" "}
              {discountAmount.toFixed(2)}
            </span>

          </div>

          <div>
            <span>
              GST
            </span>

            <span>
              ₹
              {" "}
              {gstAmount.toFixed(2)}
            </span>

          </div>

          <div className="grand-total-row">

            <span>
              TOTAL
            </span>

            <span>
              ₹
              {" "}
              {grandTotal.toFixed(2)}
            </span>

          </div>

        </div>

      </div>

      <div className="terms-box">

        <h4>
          Terms & Conditions
        </h4>

        <ol>

          <li>
            Goods once sold
            will not be taken
            back.
          </li>

          <li>
            Subject to local
            jurisdiction.
          </li>

          <li>
            Check material at
            delivery.
          </li>

        </ol>

      </div>

      <div className="signature-section">

        <div>

          <div className="signature-line">

          </div>

          <p>
            Buyer Signature
          </p>

        </div>

        <div>

          <div className="signature-line">

          </div>

          <p>
            Authorized Signature
          </p>

        </div>

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
          onClick={
            handleDownloadPdf
          }
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

  