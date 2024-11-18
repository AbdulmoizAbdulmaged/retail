import React, { useState } from 'react'
import styled from 'styled-components'
import { mobile } from '../Responsive';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/apiCalls';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({width:"75%"})}
`;
const Title = styled.h1`
font-size: 24px;
font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled{
        color: green;
        cursor: not-allowed;
  }
`;
const HyperLink = styled.a`
  margin: 5px 0;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;
const Error = styled.span`
 color: red;
`
const Login = () => {

  const [phone,setPhone] = useState("");
  const dispatch = useDispatch();

  
  const handleClick = (e)=>{
    e.preventDefault();
    login(dispatch,{phone,});
  }

  return (
    <>
    <Navbar/>
    <Container>
      
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input type='tel' pattern="[0-9]{3}[0-9]{3}[0-9]{4}" maxlength="10"  placeholder="enter phone number" onChange={(e)=>setPhone(e.target.value)} required/>
          <Input type='password' style={{display:'none'}} placeholder="password" />
          <Button onClick={handleClick} >LOGIN</Button>
          {(useSelector((state)=> state.customer.error) === true) && <Error>Account is not available...</Error>  }
          
          <Link to={'/register'}>
          <HyperLink>
          Create a new Account.
          </HyperLink>
          </Link>
          
          
         
        </Form>
      </Wrapper>
    </Container>
    </>
  )
}

export default Login
