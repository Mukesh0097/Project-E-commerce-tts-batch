import Layout from "../Components/layout/layout";
import Header from "../Components/header/header";
import Footer from "../Components/footer/footer";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseItem,
  decreaseItem,
  removeCartItem,
} from "../redux/actions/action";
const Cart = () => {
  const product = useSelector((state) => state);
  console.log(product);
  const dispatch = useDispatch();

  function incrementItem(id) {
    dispatch(increaseItem(id));
  }

  function decreamentItem(id) {
    dispatch(decreaseItem(id));
  }

  function removeItemFromCart(id) {
    dispatch(removeCartItem(id));
  }
  return (
    <>
      <Header />
      <Layout>
        {product.cartProduct.map((element) => (
          <div className="card mb-3" style={{ maxWidth: 540 }} key={element.id}>
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={element.image}
                  className="img-fluid rounded-start"
                  alt="..."
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{element.title}</h5>
                  <h3 class="card-subtitle mb-2 text-body-secondary">
                    Price: <span className="">&#x20B9;{element.price} </span>
                  </h3>
                  <p className="cart-text">
                    <div
                      className="btn-group btn-group-sm"
                      role="group"
                      aria-label="Small button group"
                    >
                      <button
                        type="button"
                        className="btn btn-outline-dark"
                        id={element.id}
                        onClick={(e) => {
                          decreamentItem(e.target.id);
                        }}
                      >
                        -
                      </button>
                      <button type="button" className="btn btn-outline-dark">
                        {element.Quantity}
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-dark"
                        id={element.id}
                        onClick={(e) => {
                          incrementItem(e.target.id);
                        }}
                      >
                        +
                      </button>
                    </div>
                  </p>
                  <p className="card-text">
                    <button
                      type="button"
                      id={element.id}
                      class="btn btn-danger"
                      onClick={(e) => {
                        removeItemFromCart(e.target.id);
                      }}
                    >
                      Remove Item
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Layout>
      <Footer />
    </>
  );
};

export default Cart;
