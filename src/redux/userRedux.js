import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "Customer",
  initialState: {
    currentCustomer: [],
    isFetching: false,
    error: false
  },
  reducers:
  {
    resetError: (state)=>{
      state.error = false;
   },
    loginStart:(state)=>{
      state.isFetching = true;
      state.error = false;
    },
    loginSuccess:(state,action)=>{
      state.isFetching = true;
      state.currentCustomer = action.payload;
      state.error = false;
    },
    loginFailure:(state)=>{
      state.isFetching = false;
      state.error = true;
    },
    addCustomerStart: (state)=>{
      state.isFetching = true;
      state.error = false;
    },
    addCustomerSuccessfull: (state,action)=>{
      state.isFetching = true;
      state.currentCustomer = action.payload;
    },
    addCustomerFailure: (state)=>{
      state.isFetching = false;
      state.error = true;
    },
    signOutCustomer: (state)=>{
      state.currentCustomer = []
    },
    addWish: (state,action)=>{
     state.currentCustomer.wish.push(action.payload);
    },
    removeWish: (state,action)=>{
      state.currentCustomer.wish.splice(state.currentCustomer.wish.findIndex(item=> item._id === action.payload),1);
    }
    }
  }
);

export const {resetError,loginStart,loginSuccess,loginFailure,addCustomerStart,addCustomerSuccessfull,addCustomerFailure,signOutCustomer,addWish,removeWish} = userSlice.actions;
export default userSlice.reducer;