import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import WelcomePage from "./pages/WelcomePage";
import BuyerPage from "./pages/BuyerPage";
import ProductPage from "./pages/ProductPage";
import  InvoicePage from "./pages/InvoicePage";
import ManageShopkeepers from "./pages/ManageShopkeepers";
import ManagePricing from "./pages/ManagePricing";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:user" element={<WelcomePage />} />
        <Route path="/buyers" element={<BuyerPage />} />
        <Route path="/buyers/:buyerId/products" element={<ProductPage />}/>
        <Route path="/invoice" element={<InvoicePage />} />
        <Route path="/manage-shopkeepers" element={<ManageShopkeepers />}/>
        <Route path="/manage-pricing" element={<ManagePricing />} />
        <Route path="/manage-pricing/:buyerId" element={<ManagePricing />} />
        <Route
  path="/buyers/:buyerId/pricing"
  element={<ManagePricing />}
/>
      </Routes>
    </BrowserRouter>
  );
}