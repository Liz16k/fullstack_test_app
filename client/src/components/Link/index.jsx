import React from 'react';
import { Link } from 'react-router-dom';
import LinkWrapper from './styled';

const StyledLink = ({ to, name }) => (
  <LinkWrapper>
    <li key={to}>
      <Link to={to}>{name}</Link>
    </li>
  </LinkWrapper>
);

export default StyledLink;
