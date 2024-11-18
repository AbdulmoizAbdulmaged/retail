import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components'

import SearchedItem from './SearchedItem';


const Container = styled.div`
  padding:10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

function SearchedProducts({filters,sort}) {
  const products = useSelector(state=>state.search.products);
  const [filteredProducts,setFilteredProducts] = useState([]);
 
  useEffect(()=>{
    setFilteredProducts(products);
  },[products]);
  
  useEffect(()=>{
    if(sort==="newest"){
     setFilteredProducts(prev=>[...prev].sort(
       (a,b)=> a.createdAt - b.createdAt
     ));
    }else if(sort==="asc"){
     setFilteredProducts(prev=>[...prev].sort(
       (a,b)=> a.price - b.price
     ));
    }else{
     setFilteredProducts(prev=>[...prev].sort(
       (a,b)=> b.price - a.price
     ));
    }
 },[sort]);
  return (
    <Container>
      {filteredProducts.map(item=>(<SearchedItem item={item} key={item.id}/>))}
    </Container>
  )
}

export default SearchedProducts
