import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
 name:"Order",
 initialState: {
  orders: [],
  isFetching:false,
  isUpdating: false,
  error: false
 },
 reducers:{
  getOrderStart: (state)=>{
    state.isFetching = true;
    state.error = false;
  },
  getOrderSuccess: (state,action)=>{
    state.orders = action.payload;
    state.error = false;
  },
  getOrderFailure: (state)=>{
    state.isFetching = false;
    state.error = true;
  },
  updateOrderStart: (state)=>{
    state.isFetching = true;
    state.error = false;
  },
  updateOrderSuccess: (state,action)=>{
    state.isFetching = false;
    state.orders.splice(state.orders.findIndex(order=>order._id === action.payload.orderId),1)
  },
  updateOrderFailure: (state)=>{
    state.isFetching = false;
    state.error = true;
  }
 }

});

export const {getOrderStart,getOrderSuccess,getOrderFailure,updateOrderStart,updateOrderSuccess,updateOrderFailure} = orderSlice.actions;

export default orderSlice.reducer;