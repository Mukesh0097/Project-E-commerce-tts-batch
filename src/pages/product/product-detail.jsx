import Layout from "../../Components/layout/layout";
import Header from "../../Components/header/header";
import Footer from "../../Components/footer/footer";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import { selectProduct } from "../../redux/actions/action";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { addToCart } from "../../redux/actions/action";
import { GiShoppingCart } from "react-icons/gi";

const Productdetail = () => {
  const { id } = useParams();
  const product = useSelector((state) => state);
  console.log(product);
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
    dispatch(addToCart({ ...product.selectedProduct, Quantity: 1 }));
    Navigate("/cart");
  }

  return (
    <>
      <Header />
      <Layout>
        {
          product.selectedProduct.length === 0 ? (
            <h3>loading...</h3>
          ):(<div className="container">
          <div
            className="card mb-3"
            style={{ maxWidth: "540px", border: "none ! important" }}
          >
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={product.selectedProduct.image}
                  className="img-fluid rounded-start"
                  alt="product-image"
                />
                
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h6 className="card-title">
                    {product.selectedProduct.title}
                  </h6>
                  <h3 className="card-subtitle mb-2 text-body-secondary">
                    Price:{" "}
                    <span className="">
                      &#x20B9;{product.selectedProduct.price}{" "}
                    </span>
                  </h3>
                  <p className="card-text">
                    {product.selectedProduct.description}
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
        </div>)
        }
      </Layout>
      <Footer />
    </>
  );
};

export default Productdetail;
