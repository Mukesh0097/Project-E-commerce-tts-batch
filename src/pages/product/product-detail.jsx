import React from "react";
import Layout from "../../Components/layout/layout";
import Header from "../../Components/header/header";
import Footer from "../../Components/footer/footer";
import { useParams, useNavigate, json } from "react-router-dom";
import Axios from "axios";
import { selectProduct } from "../../redux/actions/action";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { addToCart } from "../../redux/actions/action";
import { GiShoppingCart } from "react-icons/gi";

const Productdetail = () => {
  const { id } = useParams();
  const storeData = useSelector((state) => state);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const fetchsingleProductData = async () => {
    const response = await Axios.get(`https://fakestoreapi.com/products/${id}`);
    dispatch(selectProduct(response.data));
  };

  useEffect(() => {
    fetchsingleProductData();
  }, [id]);

  function addTocart() {
    if (storeData.isUserLoggedIn) {
      let flag = false
      const Arry = JSON.parse(localStorage.getItem("cartData") || "[]");
      let data  = Arry.map((x)=>{
        if(x.id == storeData.selectedProduct.id){
          x.Quantity += 1 
          flag = true
          return x
        }
        return x;

      })
      if(!flag){
        data.push({ ...storeData.selectedProduct, Quantity: 1 });
      }
      localStorage.setItem("cartData", JSON.stringify(data));
      dispatch(addToCart(Arry));
      Navigate("/cart");
    } else {
      alert("please login");
    }
  }

  return (
    <>
      <Header />
      <Layout>
        {storeData.selectedProduct.length === 0 ? (
          <h3>loading...</h3>
        ) : (
          <div className="container">
            <div
              className="card mb-3"
              style={{ maxWidth: "540px", border: "none ! important" }}
            >
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={storeData.selectedProduct.image}
                    className="img-fluid rounded-start"
                    alt="product-image"
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h6 className="card-title">
                      {storeData.selectedProduct.title}
                    </h6>
                    <h3 className="card-subtitle mb-2 text-body-secondary">
                      Price:{" "}
                      <span className="">
                        &#x20B9;{storeData.selectedProduct.price}{" "}
                      </span>
                    </h3>
                    <p className="card-text">
                      {storeData.selectedProduct.description}
                    </p>
                    <p className="card-text">
                      <button
                        className="btn btn-warning text-light fw-bold"
                        onClick={addTocart}
                      >
                        <GiShoppingCart style={{ fontSize: "1.5rem" }} />
                        Add to cart
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Layout>
      <Footer />
    </>
  );
};

export default Productdetail;
