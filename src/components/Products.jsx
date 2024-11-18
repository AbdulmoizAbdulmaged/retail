import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ProductItem from './ProductItem'
import axios from 'axios';

const Container = styled.div`
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  background-color: #f5fefd;
`
const Products = ({cat,filters,sort}) => {
  const [products,setProducts] = useState([]);
  const [filteredProducts,setFilteredProducts] = useState([]);
  useEffect(()=>{
     const getProducts = async ()=>{
      try{
        const res = await axios.get(cat ? `https://retail-api.onrender.com/api/products?category=${cat}` : "https://retail-api.onrender.com/api/products");
        setProducts(res.data);
        
      }catch(err){

      }
     }
     getProducts();
  },[cat]);
  
  useEffect(()=>{
    cat ?
    setFilteredProducts(
      products.filter((item)=> Object.entries(filters).every(([key,value])=> item[key].includes(value)))
    ): setFilteredProducts(products);

  },[products,cat,filters]);

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
     {
      filteredProducts.map(
        item=>(<ProductItem item={item} key={item.id}/>)
      )
     }
    </Container>
  )
}

export default Products
