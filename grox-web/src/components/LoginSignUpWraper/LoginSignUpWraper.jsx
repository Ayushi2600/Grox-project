import React from 'react';
import './LoginSignUpWraper.scss';
import { Icons } from '../../Icons/Icons.jsx';
import SwaperSlider from '../Slider/SwaperSlider.jsx';

const LoginSignUpWraper = ({
  children,
  handleGoBack,
  heading,
  termsPolicy,
}) => {
  return (
    <div className='LoginSignUpWraper'>
      <div className='col-section left-section'>
        <div className='wraper-form-container'>
          <button onClick={handleGoBack} className='go-back-btn'>
            {Icons.backIcon} Go back
          </button>
          <div className='center-card'>
            <div className='logo'>{Icons.redLogo}</div>
            <h2 className='form-heading'>{heading}</h2>
            {children}
          </div>
          <p className='terms-text'>{termsPolicy}</p>
        </div>
      </div>
      <div className='col-section right-section'>
        
        <SwaperSlider />
      </div>
    </div>
  );
};

export default LoginSignUpWraper;
