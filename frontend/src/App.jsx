import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import WelcomePage from "./pages/WelcomePage";
import BuyerPage from "./pages/BuyerPage";




export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:user" element={<WelcomePage />} />
        <Route path="/buyers" element={<BuyerPage />} />
      </Routes>
    </BrowserRouter>
  );
}