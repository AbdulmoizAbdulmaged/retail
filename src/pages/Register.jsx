import React, { useState } from 'react'
import styled from 'styled-components'
import { mobile } from '../Responsive';
import { addCustomer } from '../redux/apiCalls';
import { useDispatch } from 'react-redux';
import Navbar from '../components/Navbar';
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({width:"75%"})}
`;
const Title = styled.h1`
font-size: 24px;
font-weight: 300;
`;
const Form = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0 0;
  padding: 10px;
`;
const Agreement = styled.span`
  font-size: 12px;
  padding: 20px 0px;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;
const Register = () => {

  const [inputs,setInputs] = useState([]);
  
  const dispatch = useDispatch();
  const handleChange = (e)=>{
     e.preventDefault();
    setInputs(prev=>{

       return {...prev,[e.target.name]: e.target.value}
    }); 

    
 }

  const handleClick = (e)=>{
     e.preventDefault();
    
    const customer = {...inputs,password:'none',address:'none',isAdmin:false,img:'none',wish:[]};
     addCustomer(dispatch,customer);
     window.location.href = '/login' 
  }
  return (
    <>
    <Navbar/>
    <Container>
      
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
          <Form>
          <Input placeholder="name" name='username' onChange={handleChange}/>
          <Input placeholder="phone" name='phone' onChange={handleChange}/>
          <Input placeholder="user name" style={{display:'none'}}/>
          <Input placeholder="email" name='email' onChange={handleChange}/>
          <Input placeholder="password" style={{display:'none'}}/> 
          <Input placeholder="confirm password" style={{display:'none'}}/>
          <Agreement>By Creating an account, I consent the processing of my personal data in accordance with the <b>Privacy Policy</b></Agreement>
          <Button onClick={handleClick}>ADD ACCOUNT</Button>
          </Form>
      </Wrapper>
    </Container>
    </>
  )
}

export default Register
