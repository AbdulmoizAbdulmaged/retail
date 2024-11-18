import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userRequest } from '../requestMethod';
import { resetCustomerCart } from '../redux/apiCalls';
function PayCash() {
  
  const cart = useSelector((state)=>state.cart);
  const [orderId, setOrderId] = useState(null);
  const currentCustomer = useSelector((state) => state.customer.currentCustomer);
  const dispatch = useDispatch();
  
    useEffect(()=>{
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentCustomer._id,
          phone: currentCustomer.phone,
          products: cart.products.map((item) => ({
            productId: item._id,
            title: item.title,
            img: item.img,
            price:item.price,
            size: item.selectedSize,
            color: item.selectedColor,
            quantity: item._quantity,
          })),
          amount: cart.total * 100,
          address: 'none',
          payment: 'cash',
          paymentStatus: 'pending',
          
        });
      
        setOrderId(res.data._id);
        
      } catch {}
    };

  createOrder();
  resetCustomerCart(dispatch);
},[])
 
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

export default PayCash
