import React, { useEffect } from 'react'
import styled from 'styled-components'
import { mobile } from '../Responsive';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import { Link } from 'react-router-dom';
import { DeleteOutlined } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, updateOrder } from '../redux/apiCalls';

const Constainer = styled.div``;
const Wrapper = styled.div`
padding: 20px;
${mobile({padding:"10px",marginTop:'10px'})}
${mobile({flexDirection:"column"})}
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({flexDirection:"column"})}
`;
const Info = styled.div`
  width: 200px;
  padding: 3px;
  display: flex;
  margin: 5px;
  flex-direction: column;
 

`;

const Order = styled.div`
  flex: 1;
  display: flex;
  font-size: 12px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  margin-Top: 15px;
  ${mobile({flexDirection:'column',marginLeft:'10px'})}
`;
const Product = styled.div`
  display: flex;
  flex-wrap: wrap;
  ${mobile({flexDirection:'column',marginLeft:'10px'})}
`;
const ProductDetail = styled.div`
  flex:2;
  display: flex;
`;
const Image = styled.img`
width:100px;
height: 100px;
margin-top:5px;
border-radius: 5px;
`;
const Details = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const ProductName = styled.span`
  
`;
const ProductId = styled.span`
  
`;
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid gray;
  border-radius: 50%;
  background-color: ${props=>props.color};
`;

const Hr = styled.hr`
  background-color: #777575;
  border: none;
  height: 1px;
`;
const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  color: white;
  background-color: blue;
  border: none;
  border-radius: 3px;
`;
const ProductSize = styled.span`
  
`;

function Orders() {
  const dispatch = useDispatch();
  const userId = useSelector(state=>state.customer.currentCustomer._id);
  const order  = useSelector(state=>state.order);

  useEffect(()=>{

    getOrders(dispatch,userId);
 
  },[userId,dispatch]);
 
  console.log(order);
    
  const handleDeleteClick = (e)=>{
    e.preventDefault();
    const orderId = e.target.id;
    const updatedOrder = order.orders.find(order=>order._id === orderId);
    const removedOrder = {...updatedOrder,status:'canceled'};
   
    updateOrder(orderId,removedOrder,dispatch);
  }
  return (
    <Constainer>
      <Announcement/>
      <Navbar/>
      
      <Wrapper>
       
       <Top>
       
       <Link to={'/products'}>
       <TopButton>CONTINUE SHOPING</TopButton>
       </Link>
       </Top>
       <Bottom>
        
        <Order>
        {order.orders.map((order)=>(
          <>
        <Info>
          <ProductId><b>Order: </b>{order._id}</ProductId>
              <ProductName><b>Total Price: </b>{order.amount/100} SAR</ProductName>
              <ProductName><b>Status: </b>{order.status}</ProductName>
              <ProductName><b>Receiving date: </b></ProductName>
              <DeleteOutlined id={order._id} onClick={handleDeleteClick} style={{marginTop:'10px',cursor:'pointer',color:'red'}}/>
        </Info>
          <Product>
         { order.products.map((product=>(             
         
<ProductDetail>
<Image src={product.img}/>
<Details>
  <ProductName><b>Product: </b>{product.title}</ProductName>
  <div style={{display:'flex',alignItems:'center'}}><span style={{marginRight:'5px',fontWeight:'600'}}><b>Color: </b></span>

  <ProductColor color={product.color}/></div>
  <ProductSize><b>Size: </b>{product.size}</ProductSize>
  <ProductName><b>Quantity: </b>{product.quantity}</ProductName>
  <ProductName><b>Price: </b>{product.price}</ProductName>

 <Hr/>
</Details>
</ProductDetail>
          
          )))} 
    
          </Product>
          <Hr/></>))}
        </Order>
       </Bottom>
      </Wrapper>
    </Constainer>
  )
}

export default Orders
