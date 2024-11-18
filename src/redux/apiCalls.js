import { publicRequest, userRequest } from "../requestMethod";
import { resetCart} from "./cartRedux";
import { getOrderFailure, getOrderStart, getOrderSuccess, updateOrderFailure, updateOrderStart, updateOrderSuccess } from "./orderRedux";
import { addCustomerFailure, addCustomerStart, addCustomerSuccessfull, loginFailure, loginStart, loginSuccess, signOutCustomer } from "./userRedux"

export const login = async (dispatch,customer)=>{
  dispatch(loginStart());

  try{
      const res = await publicRequest.post('/auth/signin',customer);
      dispatch(loginSuccess(res.data));
  }catch(err){

    dispatch(loginFailure());
  }
}

export const addCustomer = async (dispatch,customer)=>{
  dispatch(addCustomerStart());
  try{
    const res = await publicRequest.post('auth/register',customer);
    dispatch(addCustomerSuccessfull(res.data));

  }catch(err){
    dispatch(addCustomerFailure());
  }
}

export const signOut = async (dispatch)=>{
  try{
    dispatch(signOutCustomer());
    window.location.href = '/';
  }catch{}
}

export const resetCustomerCart = async (dispatch)=>{
  try{
       dispatch(resetCart());
  }catch{}
}


export const getOrders = async (dispatch,userId)=>{

    dispatch(getOrderStart())
  try{
        const res = await userRequest.get('orders/find/'+ userId);
        dispatch(getOrderSuccess(res.data));
  }catch{
    dispatch(getOrderFailure());
  }
}

export const updateOrder = async (orderId,removedOrder,dispatch)=>{

  dispatch(updateOrderStart());
  try{

    const res = await userRequest.put('orders/' + orderId,removedOrder);
    dispatch(updateOrderSuccess(orderId,res.data));

  }catch{
    dispatch(updateOrderFailure());
  }
}




