import React from 'react';
import './style.css';
import { Container, Wrapper, RedirectLink, Header, Information, UserName, Title } from './styled';
import Typed from 'react-typed';

export default () => {
  return (
    <Container className='gradDynamic'>
      <Wrapper>
        <Header> Welcome to algorithms visualization </Header>
        <Typed
          loop
          strings={[
            'We help you to understand algorithms easier.',
            'We help you to understand algorithms faster.',
            'We help you to understand algorithms better.',
          ]}
          typeSpeed={40}
          backSpeed={50}
          showCursor={false}
        >
          <Title />
        </Typed>
        <RedirectLink to='/sorting'> Sorting Visualizer </RedirectLink>
        <RedirectLink to='/path-finding'> Path-finding Visualizer </RedirectLink>
      </Wrapper>
      <Information>
        made by {' '}
        <UserName target='_blank' rel="noopener noreferrer" href='https://iammilod.com' >
          orif milod
        </UserName>
      </Information>
    </Container>
  )
}
