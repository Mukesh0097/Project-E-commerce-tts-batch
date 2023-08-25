// const initialState = {
//     data : []
// }

const productreducer = (state = [], action) => {
  
  switch (action.type) {
    case "SET_PRODUCT":
      return [...state, ...action.payload];
    case "SELECT_PRODUCT":
      state = [];
      return [...state, ...action.payload];
    case "REMOVE_PRODUCT":
      return [];
    default:
      return [...state];
  }
};

export default productreducer;
