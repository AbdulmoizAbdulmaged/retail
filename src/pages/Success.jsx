import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import { userRequest } from '../requestMethod';
import { resetCustomerCart } from '../redux/apiCalls';
const Success = () => {
  const location = useLocation();
  const cart = location.state.cart;
  const stripeData = location.state.stripeData;
  const [orderId, setOrderId] = useState(null);
  const currentCustomer = useSelector((state) => state.customer.currentCustomer);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentCustomer._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            title: item.title,
            img: item.img,
            size: item.size,
            color: item.color,
            quantity: item._quantity,
          })),
          amount: stripeData.amount,
          address: stripeData.billing_details.address,
          payment: 'online',
          paymentStatus: 'done'
        });
        console.log(res.data);
        setOrderId(res.data._id);
        resetCustomerCart(dispatch);
      } catch {}
    };
    stripeData && createOrder();
  }, [cart, stripeData, currentCustomer,dispatch]);
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <button onClick={()=>{window.location.href = '/'}} style={{ padding: 10, marginTop: 20 }}>Continue Shopping</button>
    </div>
  )
}

export default Success
