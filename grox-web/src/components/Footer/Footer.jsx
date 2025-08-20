import React from 'react';
import { footerLinks } from './data';
import './Footer.scss';
import FooterMover from './FooterMover/FooterMover';
import Shadow from './Shadow.svg';
import Logo from './footer-logo.svg';

const Footer = ({ onJoinWaitlist }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='footer'>
      <FooterMover />
      <img src={Shadow} className='footer__shadow' />
      <div className='footer__content'>
        {/* Main Footer Content */}
        <div className='footer__grid'>
          {/* CTA */}
          <div className='footer__section'>
            <p>Be the first to know when Grox launches & get $10.</p>
            <button className='button' onClick={onJoinWaitlist}>
              Join Waitlist
            </button>
          </div>

          {/* Help Links */}
          <div className='footer__section'>
            <h3 className='footer__title'>Help</h3>
            <ul className='footer__links'>
              {footerLinks.help.map((link, index) => (
                <li key={index} className='footer__link-item'>
                  <a href={link.href} className='footer__link'>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Brand Section */}
          <div className='footer__section'>
            <img src={Logo} alt='' />

            <p>The future of money, one asset at a time.</p>
            <p className='footer__email'>customersuccess@usegrox.com</p>
          </div>
        </div>

        {/* Bottom Bar */}
      </div>
      <div className='footer__bottom'>
        <p className='footer__copyright'>
          © {currentYear} Grox Money. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
