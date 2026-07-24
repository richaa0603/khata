import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import WelcomePage from "./pages/WelcomePage";
import BuyerPage from "./pages/BuyerPage";
import ProductPage from "./pages/ProductPage";
import  InvoicePage from "./pages/InvoicePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:user" element={<WelcomePage />} />
        <Route path="/buyers" element={<BuyerPage />} />
        <Route path="/buyers/:buyerId/products" element={<ProductPage />}/>
        <Route path="/invoice" element={<InvoicePage />} />
      </Routes>
    </BrowserRouter>
  );
}