import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

export const RedirectLink = styled(Link)`
  color: gray;
  padding: 20px 30px;
  border-radius: 30px;
  background: linear-gradient(to right, #aaffa9, #11ffbd);
  display: block;
  margin: 20px auto;
  transition: 0.3s ease-in-out;
  text-align: center;
  width: 300px;
  :hover{ 
    color: black;
    text-decoration: none;
    transform: translateY(-5px);
  }
`;

export const Wrapper = styled.div`
  padding: 200px 50px;
  width: 700px;
  margin: auto;
`;


export const Header = styled.h1`
  color: #464646;
  text-align: center;
  font-size: 50px;
`;

export const Information = styled.p`
  color: #464646;
  position: absolute;
  bottom: 0;
  text-align: right;
  right: 10px;
  font-size:16px;
`;

export const UserName = styled.a`
  text-decoration: underline;
  color: #464646;
  cursor: pointer;
`;


export const Title = styled.p`
  text-align: center;
  font-size: 25px;
  margin: 0;
  color: #464646;
  @media only screen and (max-width: 600px) {
    font-size: 18px;
  }
`;