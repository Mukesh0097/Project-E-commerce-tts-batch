import React from "react";
import Layout from "../../../Components/layout/layout";
import Header from "../../../Components/header/header";
import Footer from "../../../Components/footer/footer";
import ProductBill from "./bill";
import { useSelector } from "react-redux";
import "./cart.css";
import AddedProduct from "./Addedproduct";
const Cart = () => {
  const storeData = useSelector((state) => state);
  return (
    <>
      <Header />
      <Layout>
        <AddedProduct list={storeData.cartProduct} />
        <ProductBill list={storeData.cartProduct} />
      </Layout>
      <Footer />
    </>
  );
};

export default Cart;
