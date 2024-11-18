



import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {mobile} from '../Responsive';
import { useDispatch, useSelector } from 'react-redux';
import { Link,useNavigate, } from 'react-router-dom';
import { signOut } from '../redux/apiCalls';
import axios from 'axios';
import { getSearchProducts } from '../redux/searchRedux';
import { Favorite, Search } from '@mui/icons-material';
import { ShoppingCart } from '@mui/icons-material';
import { Badge } from '@mui/material';



const Container = styled.div`
 position: -webkit-sticky; /* For Safari */
            position: sticky;
            top: 0;
            background-color: white;
            z-index: 1000; /* Ensures it stays above other content */
height:75px;
-webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  margin-Top: 15px;
${mobile({marginBottom:"20px",dispatch:'flex',flexDirection:'column',height:'140px'})};
`
const Wrapper = styled.div`
  padding: 10px 20px;
 display: flex;
 justify-content: space-between;
 align-items: center;
${mobile({padding:"10px 0px"})}
${mobile({flexDirection:"column"})}
`

const Left = styled.div`
flex: 1;
display: flex;
align-items: center;
justify-content: space-around;
`;
const Right = styled.div`
flex: 1;
display: flex;
justify-content: flex-end;
align-items: center;
${mobile({flex:2,justifyContent:"center"})}
`;
const Center = styled.div`
flex: 1;
display: flex;
align-items: center;
text-align: center;
justify-content: center;
`;

const Languages = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({display:"none"})}
`
const SearchContainer = styled.div`
border: 0.5px solid lightgray;
display: flex;
align-items: center;
margin-left: 25px;
padding: 5px;

`;

const Input = styled.input`
  border: none;
  ${mobile({width:"150px"})}
`;

const Logo = styled.h1`
font-weight: bold;
cursor: pointer;
${mobile({fontSize:"24px",marginLeft:"10px"})}
`

const MenuItem = styled.div`
  cursor: pointer;
  font-size: 14px;
  margin-left: 25px;
  ${mobile({fontSize:"12px",marginLeft:"10px"})}
`
const Navbar = () => {
  const quantity = useSelector(state=>state.cart.quantity);
  const user = useSelector(state=>state.customer.currentCustomer);
  const [products,setProducts] = useState([])
  const [query,setQuery] = useState([]);
  
  const navigate = useNavigate();
  
  useEffect(()=>{
    const getProducts = async ()=>{
     try{
       const res = await axios.get("https://retail-api.onrender.com/api/products");
       setProducts(res.data);
       
     }catch(err){

     }
    }
    getProducts();
 },[]);
  let wish = 0;
  if(user._id){
    wish = user.wish?.length;
 }
 
  const dispatch = useDispatch();

  const handleClick = (e)=>{
    e.preventDefault();
    if(user.email){
    signOut(dispatch);
    }else
    {
      window.location.href = '/login'
    }
  }
  const handleSearch = ()=>{
    if(query.length>0){
    const wordsArray = query.split(' ');
    const filteredProducts = products.filter(product =>
    wordsArray.every(term => product.categories.includes(term))
);
    
    console.log(filteredProducts);
    dispatch(getSearchProducts(filteredProducts));
    navigate('/searchedProducts');
  }}
  
  
  return (
    <Container>
      <Wrapper>
       <Left>
        <Languages>
          EN
        </Languages>
        <SearchContainer>
          <Input placeholder='Search' id='query' name='query' onChange={e=>setQuery(e.target.value)}/>
          <Search style={{color:"gray",fontSize:16,cursor:"pointer"}} onClick={handleSearch}/>
          <Link to={'/products'}>
        <ShoppingCart style={{color:'blue',fontSize:30,cursor:"pointer"}}/>
        </Link>
        </SearchContainer>
        
        </Left>
        <Link to={'/'}>
        <Center><Logo>R9Retail.com</Logo></Center>
        </Link>
       <Right>

        <MenuItem>{!user && 'REGISTER'}</MenuItem>
        <MenuItem style={{color:'green'}}>{!user ?'SignIn' : user.phone}</MenuItem>
        <Link to={'/orders'}>
        <MenuItem  style={{color:'green'}}>
          {user.email && 'My Orders'}
        </MenuItem></Link>
        <MenuItem onClick={handleClick} style={{color:'blue'}}>{user.email ? 'SignOut' : <MenuItem style={{color:'green'}}>SignIn</MenuItem>}</MenuItem>
        <Link to="/cart">
        
        <MenuItem>
        <Badge badgeContent={quantity} color="primary">
        <ShoppingCart/>
        </Badge>
        </MenuItem>
        </Link>
        <Link to={'/wishes'}>
          {user.phone &&
        <MenuItem>
         <Badge badgeContent={wish} color="primary">
        <Favorite/>
        </Badge>
        </MenuItem>
        }
        </Link>
       </Right>
       
       
      </Wrapper>
      
    </Container>
  )
}

export default Navbar
