// const initialState = {
//     product : []
// }

const productListReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_PRODUCT":
      return [...action.payload];
    default:
      return [...state];
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

const productreducer = { productListReducer, selectedProductReducer };
export default productreducer;
