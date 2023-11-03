import React from 'react';
import { Outlet } from 'react-router-dom';

import styled from 'styled-components';
import NavBar from './NavBar';

const Layout = () => (
  <StyledWrapper>
    <NavBar />
    <Outlet />
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-family: "Consolas", sans-serif;
  input, button {
    font-family: inherit;
  }
`;
export default Layout;
