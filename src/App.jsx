import Login from "./pages/Auth/login";
import { Routes, Route, Link } from "react-router-dom";
import { useEffect } from "react";
import Register from "./pages/Auth/register";
import Cart from "./pages/product/cart/cart";
import ProductList from "./pages/product/productlist";
import Productdetail from "./pages/product/product-detail";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import { authChecking } from "./redux/actions/action";


function App() {
  const isLogin = useSelector(state=>state.isUserLoggedIn)
  console.log(isLogin)
  const dispatch = useDispatch();

  const token = localStorage.getItem("user");
  useEffect(() => {
    if (token) {
      dispatch(authChecking(true));
    }
  }, [token]);

  // useEffect(() => {
  //   console.log("hello");
  //   const setItems = () => {
  //     dispatch(setToken(localStorage.getItem("user")));
  //     if(store.Token !== null){
  //       dispatch(authChecking(true))
  //     }else{
  //       dispatch(authChecking(false))
  //     }

  //   };
  //   setItems();
  // }, [store.token]);
  return (
    <>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={isLogin === false ? <h1>i think you are not logged in <Link to="/login">login here</Link></h1> : <Cart />} />
        <Route path="/product/detail/:id" element={<Productdetail />} />
        <Route path="*" element={<h1>page is not found</h1>} />
      </Routes>
    </>
  );
}

export default App;
