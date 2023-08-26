
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

export const removeProduct = ()=>{
    return {
        type:"REMOVE_PRODUCT",
    }
}


