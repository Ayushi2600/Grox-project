import React from 'react';
import { features } from './data';
import './ForBusinesses.scss';
import BizImageDesktop from './biz-stats-desktop.svg';
import BizImageMobile from './biz-stats-mobile.svg';
import BizBG from './biz-bg.svg';
import BusinessCTA from './BusinessCTA';


const ForBusinesses = () => {

  const handleBusinessClick = () => {
    console.log('Create Business Account clicked');
  };
  return (
    <section id='for-businesses' className='for-businesses'>
      <div className='for-businesses__content'>
        <BusinessCTA onClick={handleBusinessClick} />

        <img
          src={BizImageDesktop}
          alt='Biz Image Desktop'
          className='for-businesses__img-desktop'
        />
        <img
          src={BizImageMobile}
          alt='Biz Image Mobile'
          className='for-businesses__img-mobile'
        />
      </div>
      <img src={BizBG} alt='Biz BG' className='for-businesses__bg' />
    </section>
  );
};

export default ForBusinesses;
