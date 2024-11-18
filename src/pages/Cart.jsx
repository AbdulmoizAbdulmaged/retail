import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Announcement from '../components/Announcement';
import Navbar from '../components/Navbar';
import { Add, DeleteOutlined, Remove } from '@material-ui/icons';
import { mobile } from '../Responsive';
import { useDispatch, useSelector } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { userRequest } from '../requestMethod';
import { Link, useNavigate } from 'react-router-dom';
import { removeProductSuccess, updateProductQuantitySuccessful } from '../redux/cartRedux';






const KEY = "pk_test_51Oo2gmCF9ap7lAyw3JKsmRoKT0njH1v22ggEeBfkgqv8mo6zXNMWVUDPl9qE5CjdaXhbVCbeGgUenYkK5huXeeR200bHOlVIU9";
const Container = styled.div`

  ${mobile({padding:"10px"})}
${mobile({flexDirection:"column"})}
`;
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({padding:"5px"})};
  
  ${mobile({flexDirection:'column',})};
  
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
 ${mobile({display:'none'})}
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${props=>props.type==="filled" && "none"};
  background-color: ${props=>props.type==="filled" ? "black" : "transparent"};
  color: ${props=>props.type==="filled" && "white"};
 
`;
const TopTexts = styled.div`
  ${mobile({display:"none"})}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;
const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({flexDirection:"column"})}
`;
const Info = styled.div`
  flex: 3;
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({flexDirection:"column",fontSize: "12px"})};
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  margin-Top: 15px;
  
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;
const Image = styled.img`
 width:100px;
height: 100px;
margin-top:5px;
border-radius: 5px;
margin-left: 20px;
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ProductName = styled.span`
  
`;
const ProductId = styled.span`
  
`;
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid gray;
  background-color: ${props=>props.color};
`;
const ProductSize = styled.span`
  
`;
const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const ProductAmountContainer = styled.div`
display: flex;
align-items: center;
margin-bottom: 20px;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({marginBottom:"20px"})}
`;
const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`
const Summary = styled.div`
  flex: 1;
  border: solid 0.5px lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 80vh;

`;
const SummaryTitle = styled.h1`
font-weight: 200;
`;
const SummaryItem = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  font-weight: ${props=>props.type==="total" && "500"};
  font-size: ${props=>props.type==="total" && "24px"};
`;
const SummaryItemText = styled.div`
  
`;
const SummaryItemPrice = styled.div`

`;
const Button = styled.button`
width: 100%;
padding: 10px;
margin-bottom: 3px;
background-color: black;
color: white;
cursor: pointer;
`;


const Cart = () => {

  const cart = useSelector(state=>state.cart);
  const [totalPrice, setTotalPrice] = useState(0);
  const [stripeToken,setStripeToken] = useState(null);
  const dispatch = useDispatch();
  const customer = useSelector(state=>state.customer.currentCustomer);
 
  
  const onToken = (token)=>{
    setStripeToken(token);
  };
  let  navigate = useNavigate();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: ((cart.total * 100).toFixed()),
          
        });
        
        navigate("/success",{replace:true,state:{cart:cart,stripeData:res.data}
        });
          
         
      } catch {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart,navigate]);

  

  const handleDeleteProduct = (e)=>{
    e.preventDefault();
    const productId = e.target.id
    const product = cart.products.find(product=> product._id === productId);
   try{

    dispatch(removeProductSuccess({...product,totalPrice}));
   
    
   }catch(err){}
   
  }

  useEffect(()=>{
    if (cart && cart.products) {
      const sum = cart.products.reduce((acc, product) => acc + (product.price * product.quantity), 0);
      setTotalPrice(sum);
      
    }
  },[cart]);

  const handleOrderClick = (e)=>{
     e.preventDefault();
     if(customer.email){
     
     navigate("/paycash",{replace:true,state:{cart:cart,}
        });
    }else
    {
      window.location.href = '/login'
    }
  }

 const handleProductQuantity = (product,type)=>{
 
   const id = product._id;
   if(type === "inc"){
    const quantity = product.quantity + 1;
    dispatch(updateProductQuantitySuccessful({ id,quantity }));
   }else if(type === "dec"){
    const quantity = product.quantity - 1;
    if(quantity > 0){
    dispatch(updateProductQuantitySuccessful({ id,quantity }));
    }
   }
   console.log(cart.products);
   
   
 }
  console.log(cart)
  return (
   <Container>
    <Announcement/>
    <Navbar/>
    <Wrapper>
      <Title>My Cart</Title>
      <Top>
        <Link to={'/products'}>
        <TopButton>CONTINUE SHOPING</TopButton>
        </Link>
        <TopTexts>
          <TopText style={{display:'none'}}>SHOPING BAG(2)</TopText>
          <TopText style={{display:'none'}}>YOUR WISHLIST(0)</TopText>
        </TopTexts>
        <TopButton style={{display:'none'}}onClick={handleOrderClick} type="filled">PAY CASH</TopButton>
      </Top>
      <Bottom>
        <Info>
          {cart.products.map((product)=>(
            <Product>
            <ProductDetail>
              <Image src={product.img}/>
              <Details>
                <ProductName><b>Product:</b> {product.title}</ProductName>
                <ProductId><b>ID:</b>{product._id}</ProductId>
                {(product.color !== 'any color') && <ProductColor color={product.selectedColor}/>}
                <ProductSize><b>Size:</b> {product.selectedSize}</ProductSize>
                <DeleteOutlined id={product._id} onClick={handleDeleteProduct} style={{marginTop:'10px',cursor:'pointer',color:'red'}}/>
              </Details>
            </ProductDetail>
            <PriceDetail>
              <ProductAmountContainer>
                <Add style={{cursor:'pointer',color:'green'}} id={product._id} onClick={()=>handleProductQuantity(product,"inc")} />
                <Amount>{product.quantity}</Amount>
                <Remove style={{cursor:'pointer',color:'red'}} id={product._id} onClick={()=>handleProductQuantity(product,"dec")}/>
              </ProductAmountContainer>
              <ProductPrice>$ {product.price*product.quantity}</ProductPrice>
            </PriceDetail>
          </Product>
          

          ))}
          <Hr/>
          </Info>
        <Summary>
          <SummaryTitle>ORDER SUMMARY</SummaryTitle>
          <SummaryItem>
            <SummaryItemText>Subtotal</SummaryItemText>
            <SummaryItemPrice>$ {totalPrice}</SummaryItemPrice>
          </SummaryItem>
          <SummaryItem>
            <SummaryItemText>Estimated Shipping</SummaryItemText>
            <SummaryItemPrice>$ 5.90</SummaryItemPrice>
          </SummaryItem>
          <SummaryItem>
            <SummaryItemText>Estimated Discount</SummaryItemText>
            <SummaryItemPrice>$ 5.9</SummaryItemPrice>
          </SummaryItem>
          <SummaryItem  type="total">
            <SummaryItemText>Total</SummaryItemText>
            <SummaryItemPrice>$ {totalPrice}</SummaryItemPrice>
          </SummaryItem>
          <SummaryItem>
          <Button onClick={handleOrderClick} type="filled">PAY CASH</Button>
          </SummaryItem>
        
         {customer.email ? <StripeCheckout
              name="R9 Retail"
              image="https://avatars.githubusercontent.com/u/1486366?v=4"
              billingAddress
              shippingAddress
              description={`Your total is $${totalPrice}`}
              amount={totalPrice * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button style={{}}>PAY ONLINE</Button>
            </StripeCheckout> : ()=>{window.location.href = '/login'}}
         
        </Summary>
        
      </Bottom>
    </Wrapper>
    

   </Container>

  )
}

export default Cart
