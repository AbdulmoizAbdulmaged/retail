import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Announcement from '../components/Announcement';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Add, Remove } from '@material-ui/icons';
import { mobile } from '../Responsive';
import { useLocation } from 'react-router-dom';
import { publicRequest } from '../requestMethod';
import { addProduct } from '../redux/cartRedux';
import {  useDispatch } from 'react-redux';
const Container = styled.div`
  
`;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({flexDirection:"column", padding:"10px"})}
`;
const ImgContainer = styled.div`
flex: 1;


`;
const Image = styled.img`
width: 300px;
height:300px;

${mobile({height:"40vh"})}
`;
const InfoContainer = styled.div`
   
  flex: 1;
  padding: 0px 50px;
  ${mobile({padding:"10px"})}
`;
const Title = styled.h1`
  font-weight: 200;
`;
const Desc = styled.p`
 margin: 20px 0px;
`;
const Price = styled.span`
  font-weight: 300;
  font-size: 20px;
`;
const FilterContainer = styled.div`
  margin: 30px 0px;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${mobile({width:"100%"})}
`;
const Filter = styled.div`
   display: flex;
   align-items: center;
   margin-right:10px;
   margin-bottom:10px;
`;
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;
const FilterColor = styled.div`
 width: 20px;
 height: 20px;
 border: 1px solid black;
 border-radius: 50%;
 background-color: ${props=>props.color};
 margin: 0px 5px;
 cursor: pointer;
`;
const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;
const FilterSizeOption = styled.option`
  
`;
const AddContainer = styled.div`
display: flex;
width: 50%;
justify-content: space-between;
align-items: center;
${mobile({width:"100%"})}
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
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
const Button = styled.button`
padding: 15px;
border: 2px solid teal;
background-color: white;
font-weight: 500;
cursor: pointer;
&:hover{
  background-color: #f8f4f4;
}
`;
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  border-radius: 3px;
  border: 1px solid gray;
  background-color: ${props=>props.color};
`;
const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product,setProduct] = useState({});
  const [quantity,setQuantity] = useState(1);
  const [color,setColor] = useState(["any color"]);
  const [size,setSize] = useState();
  const dispatch = useDispatch();
  
  useEffect(()=>{
    const getProduct = async ()=>{
      try{
           const res = await publicRequest.get("/products/find/"+ id);
           setProduct(res.data);
           setSize(res.data.size[0])
           setColor(res.data.color[0])
           
      }catch
      {
      }
    };
    getProduct();
  },[id]);

  const handleQuantity = (type)=>{
    if(type === "dec" && quantity > 1){
      setQuantity(quantity-1);
    }else if(type === "inc"){
      setQuantity(quantity+1)
    }
  }

  

  const handleClick = ()=>{
    //update Cart
    if(color === "any color"){
      
    }
    dispatch(addProduct({...product,quantity,color,size}));
    
    
  }
  return (
    <Container>
      <Announcement/>
      <Navbar/>
      <Wrapper>
        <ImgContainer>
          <Image src= {product.img} />

          
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>$ {product.price}</Price>
          <FilterContainer>
          {(product.color?.length > 0) && <Filter>
            {(color !== 'any color') && <ProductColor color={color}/>}
              <FilterTitle>Select Color</FilterTitle>
               {
               product.color?.map((c)=>(
                <FilterColor onClick={() => setColor(c)} color={c} key={c}  />
               ))
               }
            </Filter>}
            {(product.size?.length > 0) &&<Filter>
              <FilterTitle>Select Size</FilterTitle>
              <FilterSize onChange={(e)=>setSize(e.target.value)}>
                {
                  product.size?.map((s)=>(
                    <FilterSizeOption key={s} >
                      {s}
                      </FilterSizeOption>
                  ))
                }
              
              
              </FilterSize>
            </Filter>}
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={()=>handleQuantity("dec")}/>
              <Amount>{quantity}</Amount>
              <Add onClick={()=>handleQuantity("inc")}/>
            </AmountContainer>
            <Button onClick={handleClick}>ADD TO CART</Button>
          </AddContainer>
          
        </InfoContainer>
      </Wrapper>
    
      <Footer/>
    </Container>
  )
}

export default Product