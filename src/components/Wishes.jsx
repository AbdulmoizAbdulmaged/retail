import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import ProductItem from './ProductItem';
import { DeleteOutlined } from '@material-ui/icons';
import { removeWish } from '../redux/userRedux';


const Container = styled.div`
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  background-color: #f5fefd;
`;
const Wrapper = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
`;
function Wishes() {
  const products = useSelector(state=>state.customer.currentCustomer.wish);
  const dispatch = useDispatch();
  const handleDeleteProduct = (e)=>{
    e.preventDefault();
    const productId = e.target.id
    
   try{

    dispatch(removeWish(productId));
   
    
   }catch(err){}
   
  }
  
  return (
    <Container>
      {products &&
        products.map(item=>(
          <Wrapper>
          <ProductItem item={item} key={item._id} />
            <DeleteOutlined id={item._id} onClick={handleDeleteProduct} style={{marginTop:'10px',cursor:'pointer',color:'red'}}/></Wrapper>))
      }
    </Container>
  )
}

export default Wishes
