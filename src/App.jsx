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
import CartPage from "./pages/cart/CartPage";
import AllProduct from "./pages/allproduct/AllProduct";
import Signup from "./pages/registration/Signup";
import Login from "./pages/registration/Login";
import UserDashboard from "./pages/user/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddProductPage from "./pages/admin/AddProductPage";
import UpdateProductPage from "./pages/admin/UpdateProductPage";
import MyState from "./context/myState";
import { Toaster } from "react-hot-toast";
import { ProtectedRouteForUser } from "./protectedRoute/ProtectedRouteForUser";
import { ProtectedRouteForAdmin } from "./protectedRoute/ProtectedRouteForAdmin";
import CategoryPage from "./pages/category/CategoryPage";

function App() {
  return (
    <MyState>
      <BrowserRouter>
        <ScrollTop />
        <Toaster/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/*" element={<NoPage />} />
          <Route path="/menswear" element={<MensWear />} />
          <Route path="/womenswear" element={<WomensWear />} />
          <Route path="/kidswear" element={<KidsWear />} />
          <Route path="/productinfo/:id" element={<ProductInfo />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/allproduct" element={<AllProduct />} />
          <Route path="/category/:categoryname" element={<CategoryPage />} />  {/* category Page route  */}
          {/* <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} /> */}
          <Route path="/user-dashboard" element={<ProtectedRouteForUser><UserDashboard /></ProtectedRouteForUser>} />
          <Route path="/admin-dashboard" element={<ProtectedRouteForAdmin><AdminDashboard /></ProtectedRouteForAdmin>} />
          <Route path="/addproduct" element={<ProtectedRouteForAdmin><AddProductPage /></ProtectedRouteForAdmin>} />
          <Route path="/updateproduct/:id" element={<ProtectedRouteForAdmin><UpdateProductPage /></ProtectedRouteForAdmin>} />
        </Routes>
      </BrowserRouter>
    </MyState>
  );
}

export default App;
