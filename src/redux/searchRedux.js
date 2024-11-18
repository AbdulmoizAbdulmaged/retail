import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name:'search',
  initialState:{
    products:[],
    isFetching:false,
    error:false
  },
  reducers:{
    getSearchProducts:(state,action)=>{
      state.products = action.payload;
    }
  }
});

export const {getSearchProducts} = searchSlice.actions;
export default searchSlice.reducer;