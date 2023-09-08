//product listing
export const setProduct = (product)=>{
    return {
        type:"SET_PRODUCT",
        payload:product
    }
}

export const selectProduct = (product)=>{
   
    return {
        type:"SELECT_PRODUCT",
        payload:product
    }
}


export const filterProduct = (value)=>{
    return {
        type:"FILTER_PRODUCT",
        text:value
    }
}


export const removeProduct = ()=>{
    return {
        type:"REMOVE_PRODUCT",
    }
}


//cart

export const addToCart = (product)=>{
    return {
        type:"ADD_PRODUCT_TOCART",
        payload:product
    }
}

export const increaseItem = (id) => {
    return {
        type:"INCREASE_ITEM",
        payload:id
    }
}

export const decreaseItem = (id) => {
    return {
        type:"DECREASE_ITEM",
        payload:id
    }
}

export const removeCartItem = (id)=>{
    return {
        type:"REMOVE_TOCART",
        payload:id
    }
}

// Authentication

export const authChecking = (flag)=>{
    return {
        type:"LOGGED_IN",
        payload:flag
    }
}




