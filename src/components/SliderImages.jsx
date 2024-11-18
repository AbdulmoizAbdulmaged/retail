    import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import styled from 'styled-components';
import { mobile } from '../Responsive';
import { Link } from 'react-router-dom';
import { FavoriteBorderOutlined, SearchOutlined,  } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { addWish } from '../redux/userRedux';


const Wrapper = styled.div`
            display: flex;
            gap: 10px; /* Space between images */
            justify-content: center; /* Center the images */
            align-items: center; /* Align images vertically in center */
            flex-wrap: nowrap; /* Prevent wrapping */
  
`;
const Container = styled.div`

margin: 5px;
  min-width: 100px;
  height: 350px;
  display: flex;
 
  align-items: center;
  justify-content: center;
  
  transition: all 0.5s ease;
  &:hover {
    opacity: 1;
    transform: scale(1.2);
  }
 
`;
const Image = styled.img`
    width: 100px;
  height: 100px;
  
  z-index: 2;
  ${mobile({height:'30%',width:'90%'})}
`;
const Info = styled.div`
   opacity: 0;
  width: 100%;
  height: 100%;
  position:absolute;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease;
  &:hover{
    opacity: 1;
  }
  
`;
const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover{
      background-color: wheat;
      transform: scale(1.3);
      display: inline-block;
    }

`;



function SliderImages() {
  const [products,setProducts] = useState([]);
  const dispatch = useDispatch();
  useEffect(()=>{
    const getProducts = async ()=>{
     try{
       const res = await axios.get("http://localhost:5000/api/products");
       setProducts(res.data);
       
     }catch(err){

     }
    }
    getProducts();
 },[]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
      <Wrapper>
        {products.map((product, index) => (
        
          <Container key={index}  >
           
            {product.title}
            <Image src={product.img} alt={`Slide ${index}`} />
            <Info>
     
      <Icon>
        <Link to={`/product/${product._id}`}>
        <SearchOutlined />
        </Link>
        
      </Icon>
      <Icon>
         <FavoriteBorderOutlined style={{color:'red',}} onClick={()=>{dispatch(addWish(product))}}/>
      </Icon>
     </Info>
          </Container>
          
        ))}
        </Wrapper>
      </Slider>
    </div>
  );
};


export default SliderImages
