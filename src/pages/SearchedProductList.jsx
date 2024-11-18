import React, { useState } from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer';
import { mobile } from '../Responsive';
import {  useNavigate } from 'react-router-dom';
import SearchedProducts from '../components/SearchedProducts';

const Container = styled.div`
  
`;
const Title = styled.h1`
  margin: 20px;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
margin: 20px;
`;
const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({marginRight:"0px"})}
`;
const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({margin:"5px"})}
`;
const Option = styled.option`
  
`;
function SearchedProductList() {
  const [filters,] = useState({});
  const [sort,setSort] = useState("newest");
  const navigate = useNavigate();
  const handleFilters = (e)=>{
     const value = e.target.value;
 
    if(value === "Men"){
      navigate('/products/men');
    }else if(value === "Women")
    {
      navigate('/products/women');
    }else if(value === 'Kids'){
      navigate('/products/kids');
    }else if(value === 'Infant')
    {
      navigate('/products/infant');
    }
  }
  return (
    <Container>
      <Announcement/>
      <Navbar/>
      <Title></Title>
      <FilterContainer>
        <Filter><FilterText>Filter Products:</FilterText>
        
        <Select name='size' onChange={handleFilters} style={{display:'none'}}>
          <Option disabled >
            Size
          </Option>
        <Option>S</Option>
        <Option>M</Option>
        <Option>L</Option>
        <Option>XL</Option>
        <Option>XXL</Option>

        </Select>
        </Filter>
        <Filter><FilterText>Sort Products:</FilterText>
        <Select onChange={(e)=>setSort(e.target.value)}>
          <Option value={"newest"}>Newest</Option>
          <Option value={"asc"}>Price (asc)</Option>
          <Option value={"desc"}>Price (desc)</Option>
        </Select>
        </Filter>
      </FilterContainer>
      <SearchedProducts filters={filters} sort={sort} />
   
      <Footer/>
      
    </Container>

  )
}

export default SearchedProductList
