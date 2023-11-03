import React from 'react';
import Nav from './styled';
import Link from '../Link/index';

const NavBar = () => (
  <Nav>
    <Link to="/" name="News" />
    <Link to="login" name="Login" />
    <Link to="register" name="Register" />
  </Nav>
);

export default NavBar;
