import { Facebook, Instagram, MailOutline, Phone, RoomOutlined, Twitter } from '@material-ui/icons';
import React from 'react'
import styled from 'styled-components'
import { mobile } from '../Responsive';

const Container = styled.div`
  display: flex;
  
  padding: 20px;
  
  ${mobile({flexDirection:"column",fontSize:'12px'})}

`;
const Logo = styled.h1`
  
`;
const Desc = styled.p`
  width: 50%;
  margin: 20px 0px;
`;
const SocialContainer = styled.div`
  display: flex;
`;
const SocialIcon = styled.div`
 width: 40px;
 height: 40px;
 border-radius: 50%;
 color: white;
 background-color: #${props=>props.color};
 display: flex;
 align-items: center;
 justify-content: center;
 margin: 3px;
 cursor: pointer;
`

const Left = styled.div`
  flex: 1;
  padding: 20px;
`;
const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({backgroundColor:"#eee"})}

`;
const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({display:"none"})}
`;
const Title = styled.h3`
  margin-bottom: 30px;
`;
const List = styled.ul`
margin: 0;
padding: 0;
list-style: none;
display: flex;
flex-wrap: wrap;
`;
const ListItem = styled.li`
width: 50%;
margin-bottom: 10px;
`;
const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;
const Payment = styled.img`
  width: 50%;
`

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>R9Retail.com</Logo>
        <Desc>There are many passages of lorem Ipsum available. but majority have suffered alteration in some form
          by injected humour or randomised words which don't look even slightly believable
        </Desc>
        <SocialContainer>
          <SocialIcon color='3B5999'>
            <Facebook/>
          </SocialIcon>
          <SocialIcon color='E4405F'>
            <Instagram/>
          </SocialIcon>
          <SocialIcon color='55ACEE'>
            <Twitter/>
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Usefull Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Man fashion</ListItem>
          <ListItem>Women fashion</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem><Phone style={{marginRight:"10px"}}/>0538023368</ContactItem>
        <ContactItem><RoomOutlined style={{marginRight:"10px"}}/>Saudi Arabia - Riyadh</ContactItem>
        <ContactItem><MailOutline style={{marginRight:"10px"}}/>abdulmoizabdulmaged@gmail.com</ContactItem>
        <Payment src="Pay.png"/>
      </Right>
      

    </Container>
  )
}

export default Footer
