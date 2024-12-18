import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Button } from "./components/ui/button";
import HomePage from "./pages/HomePage";
import NoPage from "./pages/NoPage";
import MensWear from "./pages/MensWear";
import WomensWear from "./pages/WomensWear";
import KidsWear from "./pages/KidsWear";
import ProductInfo from "./pages/productInfo/ProductInfo";
import ScrollTop from "./components/scrollTop/ScrollTop";

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/*" element={<NoPage />} />
          <Route path="/menswear" element={<MensWear />} />
          <Route path="/womenswear" element={<WomensWear />} />
          <Route path="/kidswear" element={<KidsWear />} />
          <Route path="/productinfo" element={<ProductInfo />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
