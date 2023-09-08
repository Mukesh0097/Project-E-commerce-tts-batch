import Login from "./pages/Auth/login";
import { Routes, Route } from "react-router-dom";

import Register from "./pages/Auth/register";
import Cart from "./pages/product/cart";
import ProductList from "./pages/product/productlist";
import Productdetail from "./pages/product/product-detail";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProductList/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/product/detail/:id" element={<Productdetail/>}/>
        <Route path="*" element={<h1>page is not found</h1>}/>
      </Routes>
    </>
  );
}

export default App;
