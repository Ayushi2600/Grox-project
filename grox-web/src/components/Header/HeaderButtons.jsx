import React from 'react';
import { Link } from 'react-router-dom';

const HeaderButtons = () => (
  <>
    <Link to="/login">
      <button className="button button--secondary">Log In</button>
    </Link>
      
    <Link to="/create-account">  
    <button className="button button--primary">Register Now</button>
    </Link>
  </>
);

export default HeaderButtons;

