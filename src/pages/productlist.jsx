import Layout from "../Components/layout/layout";
import Header from "../Components/header/header";
import Footer from "../Components/footer/footer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProduct, removeProduct } from "../redux/actions/action";
import "./productlist.css";
import { Link } from "react-router-dom";

const ProductList = () => {
  //take state from store
  const product = useSelector((state) => state);
  console.log(product)
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://fakestoreapi.com/products").then(
          (res) => res.json()
        );
        dispatch(setProduct(response));
      } catch (err) {
        console.log("err", err.message);
      }
    }
    fetchData();
    return () => {
      dispatch(removeProduct());
    };
  }, []);
  return (
    <>
      <Header />
      <Layout>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4  g-4">
          {product.Allproduct.length === 0 ? (
            <h1>loading....</h1>
          ) : (
            product.Allproduct.map((element, index) => (
              <Link
                to={`/product/detail/${element.id}`}
                key={index}
                className="listAnchor"
              >
                <div className="col">
                  <div className="card" style={{ height: "400px" }}>
                    <div
                      className="card-img"
                      style={{ backgroundImage: `url(${element.image})` }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{element.title}</h5>
                      <p className="card-text">
                        <span>
                          Price:<span>{element.price}</span>
                        </span>
                      </p>
                      <p className="card-text">
                      <h5><span class="badge bg-success">{element.rating.rate} &#9734;</span></h5>
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </Layout>
      {/* <Footer /> */}
    </>
  );
};

export default ProductList;
