import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "Cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
    isFetching : false,
    error : false,
  },
  reducers:{
    addProduct: (state,action)=>{
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    
    removeProductSuccess: (state,action)=>{
      state.quantity -= 1;
      state.products.splice(state.products.findIndex((item)=>item._id === action.payload._id),1);
      state.total = action.payload.totalPrice
    },

    
 
    updateProductQuantitySuccessful: (state,action)=>{
      state.isFetching = false;
      const index = state.products.findIndex((item) => item._id === action.payload.id);
      if (index !== -1) {
        state.products[index].quantity = action.payload.quantity;
    }
  },
   
    
    resetCart: (state)=>{
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },

  }
});

export const {addProduct,removeProductSuccess,resetCart,updateProductQuantityStart,updateProductQuantitySuccessful,updateProductQuantityFailure} = cartSlice.actions;
export default cartSlice.reducer;