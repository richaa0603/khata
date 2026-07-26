import {
  useEffect,
  useState,
} from "react";

import {
  getInvoices
} from "../services/invoiceService";

export default function InvoiceHistory() {
  const [invoices, setInvoices] =
    useState([]);

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    const data =
      await getInvoices();

    setInvoices(data);
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>Invoice History</h1>

      {invoices.map(invoice => (
        <div
          key={invoice.id}
          style={{
            padding: 20,
            marginBottom: 10,
            border: "1px solid #ddd",
            borderRadius: 10
          }}
        >
          <h3>
            {invoice.buyer?.buyerName}
          </h3>

          <p>
            ₹ {invoice.grandTotal}
          </p>

          <p>
            {new Date(
              invoice.invoiceDate
            ).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}