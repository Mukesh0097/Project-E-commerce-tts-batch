import { filterProduct } from "../actions/action";

const initialData = {
  appliedFilters: [],
  products: [],
};
const productListReducer = (state = initialData, action) => {
  switch (action.type) {
    case "SET_PRODUCT":
      return { ...state, products: [...action.payload] };
    case "FILTER_PRODUCT":
      let newState = Object.assign({}, state);
      let value = action.text;

      let filteredValues = state.products.filter((product) => {
        return product.category.startsWith(value);
      });

      let appliedFilters = state.appliedFilters;
      if (value) {
        let index = appliedFilters.indexOf("FILTER_PRODUCT");
        if (index === -1) appliedFilters.push("FILTER_PRODUCT");
        newState.filteredProducts = filteredValues;
      } else {
        let index = appliedFilters.indexOf("FILTER_PRODUCT");
        appliedFilters.splice(index, 1);
        if (appliedFilters.length === 0) {
          newState.filteredProducts = newState.products;
        }
      }
      return newState;

    default:
      return { ...state };
  }
};

const selectedProductReducer = (state = {}, action) => {
  switch (action.type) {
    case "SELECT_PRODUCT":
      return { ...action.payload };
    default:
      return state;
  }
};

const addToCartReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_PRODUCT_TOCART":
      console.log()
      return [...JSON.parse(localStorage.getItem("cartData"))];
    case "REMOVE_TOCART":
      return state.filter(
        (product) => product.id !== parseFloat(action.payload)
      );
    case "INCREASE_ITEM":
      return state.map((product) => {
        if (product.id === parseFloat(action.payload)) {
          return { ...product, Quantity: product.Quantity + 1 };
        }
        return product;
      });
    case "DECREASE_ITEM":
      return state.map((product) => {
        if (product.id === parseFloat(action.payload)) {
          return { ...product, Quantity: product.Quantity - 1 };
        }
        return product;
      });
    default:
      return state;
  }
};

//authentication

const Authentication = (state = false, action) => {
  switch (action.type) {
    case "LOGGED_IN":
      return action.payload;
    default:
      return state;
  }
};



const productreducer = {
  productListReducer,
  selectedProductReducer,
  addToCartReducer,
  Authentication
};
export default productreducer;
