import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <nav>
    <ul>
      <li key="news">
        <Link to="/">News</Link>
      </li>
      <li key="login">
        <Link to="login">Login</Link>
      </li>
      <li key="register">
        <Link to="register">Register</Link>
      </li>
    </ul>
  </nav>
);

export default NavBar;
