import { Link } from 'react-router-dom';
import styled from 'styled-components'

import { useDispatch, useSelector } from 'react-redux';
import { mobile } from '../Responsive';
import { addWish } from '../redux/userRedux';
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FavoriteBorderOutlined,    ShoppingCartOutlined } from '@mui/icons-material'
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Info = styled.div`
  opacity: 1.5;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: transparent;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease;
  &:hover{
    
  }
`;
const Container = styled.div`
  
  margin: 5px;
  min-width: 120px;
  height: 170px;
  padding: 3px;
  margin: 20px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  display: inline-block;
  transition: all 0.5s ease;
  &:hover {
    opacity: 1;
    transform: scale(1.1);
    background-color: rgb(0,0,0,0.2);
  }
`

const Image = styled.img`
  height: 70%;
  border-radius: 5px;
  z-index: 2;
  ${mobile({height:'50%'})}
`;

const Icon = styled.div`
  width: 75px;
  height: 75px;
  border-radius: 50%;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 10px;
  transition: all 0.5s ease;
  
  &:hover{
      background-color: transparent;
      transform: scale(2.0);
      
  }

`;
const Product = styled.div`
 width: 100px;
 height: 100px;
 display : flex;
 flex-direction: column;
`;
const Title = styled.h1`
  font-weight: 200;
  font-size: 10px;
`;

const Price = styled.span`
  font-weight: 300;
  font-size: 20px;
`;
const FilterContainer = styled.div`
  margin: 5px 0px;
  width: 100%;
  height: 20px;
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

const FilterColor = styled.div`
 width: 15px;
 height: 15px;
 border: 1px solid black;
 border-radius: 50%;
 background-color: ${props=>props.color};
 margin: 0px 5px;
 cursor: pointer;
 transition: all 0.5s ease;
  &:hover{
      
      transform: scale(1.2);
  }
`;

const FilterSize = styled.span`
  font-size: 12px;
  font-weight: 600;
  margin: 0 10px ;
  cursor: pointer;
  transition: all 0.5s ease;
  &:hover{
      
      transform: scale(1.5);
  }
`;

function SearchedItem({item}) {
  const customer = useSelector(state=>state.customer.currentCustomer);
  const dispatch = useDispatch();

  
   
   const addToWish = ()=>{
    
     if(customer?.phone !== undefined){
     dispatch(addWish(item));
     }
   }
   
   return (
     <Wrapper>
    <Container>
      <Image src={item?.img}/>
      <Info>
      
       <Icon>
         <Link to={`/product/${item?._id}`}>
         <ShoppingCartOutlined />
         </Link>
         
       </Icon>
       <Icon>
          <FavoriteBorderOutlined style={{color:'red'} } onClick={addToWish}/>
       </Icon>
      </Info>
      <Title>{item?.title}</Title>
    <Price>{item?.price} SAR</Price>
    
    <Product>
    
    <FilterContainer>
     <Filter>
       
       {
         item.color.map((c)=>
       <FilterColor onClick={()=>{item.selectedColor = c}} color={c} key={c} />)
       
       }
       
     </Filter>
    </FilterContainer>
    <FilterContainer>
     <Filter>
       
       {
         item.size?.map((c)=>
       <FilterSize onClick={()=>{item.selectedSize = c}
       
       }  key={c}>
         {c}
         </FilterSize>
         )
       }
     </Filter>
    </FilterContainer>
   </Product>
   </Container>
   <ToastContainer/>
   </Wrapper>
  
   )
}

export default SearchedItem
