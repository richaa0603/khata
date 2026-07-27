import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import {
  getShopkeeperInvoices,
} from "../services/invoiceService";

export default function ShopkeeperHistory() {

  const { shopkeeperId } =
    useParams();

  const [invoices,
    setInvoices] =
    useState([]);

  useEffect(() => {
    loadInvoices();
  }, [shopkeeperId]);

  const loadInvoices =
    async () => {

      try {

        const data =
          await getShopkeeperInvoices(
            shopkeeperId
          );

        setInvoices(data);

      } catch (error) {
        console.error(error);
      }
    };

  const totalRevenue =
    invoices.reduce(
      (sum, invoice) =>
        sum +
        invoice.grandTotal,
      0
    );

  return (
    <div className="history-page">

      <h1>
        Invoice History
      </h1>

      <h3>
        Total Revenue: ₹
        {totalRevenue.toFixed(2)}
      </h3>

      <h3>
        Total Invoices:
        {" "}
        {invoices.length}
      </h3>

      {invoices.map(
        (invoice) => (

          <div
            key={invoice.id}
            className="history-card"
          >

            <h3>
              {
                invoice.invoiceNumber
              }
            </h3>

            <p>
              Buyer:
              {" "}
              {
                invoice.buyer
                  ?.buyerName
              }
            </p>

            <p>
              Amount:
              {" "}
              ₹
              {
                invoice.grandTotal
              }
            </p>

            <p>
              Date:
              {" "}
              {
                new Date(
                  invoice.invoiceDate
                ).toLocaleString()
              }
            </p>

          </div>
        )
      )}

    </div>
  );
}