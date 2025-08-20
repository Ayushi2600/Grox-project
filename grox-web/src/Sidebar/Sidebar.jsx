import React from 'react';
import './Sidebar.scss';
import { Icons } from '../Icons/Icons';

const sidebarItem = [
  {
    icon: Icons.homeBank,
    name: 'Home',
  },
  {
    icon: Icons.wallet,
    name: 'Wallet',
  },
  {
    icon: Icons.buyGrox,
    name: 'Buy Grox',
  },
  {
    icon: Icons.sendMoney,
    name: 'Send Money',
  },
  {
    icon: Icons.p2p,
    name: 'P2P Market',
  },
  {
    icon: Icons.convert,
    name: 'Convert',
  },
  {
    icon: Icons.cashout,
    name: 'Cash Out',
  },
  {
    icon: Icons.stakeGrox,
    name: 'Stake Grox',
  },
];

const Sidebar = () => {
  return (
    <aside className='sidebar'>
      <div className='sidebar-logo-section'>
        <img
          src='/path-to-profile.jpg'
          alt='profile'
          className='sidebar-profile-image'
        />
        <p className='sidebar-user-name'>FirstName LastName</p>
      </div>

      <nav className='sidebar-nav'>
        {sidebarItem?.map(item => {
          return (
            <div className='side-item' key={item.name}>
              <span className='icon'>{item.icon}</span>
              <span className='text'>{item.name}</span>
            </div>
          );
        })}
      </nav>

      <div className='sidebar-logout-section'>
        <button className='sidebar-logout-button'>Log Out</button>
      </div>
    </aside>
  );
};

export default Sidebar;
