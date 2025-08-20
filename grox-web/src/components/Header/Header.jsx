import React, { useState, useEffect } from 'react';
import './Header.scss';
import Logo from './grox-logo.svg';
import MenuIcon from './menu.svg';
import CloseIcon from './close.svg';
import HeaderButtons from './HeaderButtons';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const newIsScrolled = scrollTop > 50;
      setIsScrolled(newIsScrolled);
    };

    const handleEscape = event => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = href => {
    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#about-grox', label: 'About Grox' },
    { href: '#how-it-works', label: 'How it works' },
    { href: '#faqs', label: 'FAQs' },
    { href: '#for-businesses', label: 'For Businesses' },
  ];

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className='header__container'>
        <img src={Logo} alt='Grox' className='header__container__logo' />

        {/* Mobile Menu Toggle */}
        <button
          className={`header__container__mobile-toggle ${isMobileMenuOpen ? 'header__container__mobile-toggle--open' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label='Toggle mobile menu'
          aria-expanded={isMobileMenuOpen}
        >
          <img
            src={isMobileMenuOpen ? CloseIcon : MenuIcon}
            alt={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            className='header__container__mobile-toggle__icon'
          />
        </button>

        {/* Desktop Button Holder */}
        <div className='header__container__button-holder'>
          <HeaderButtons />
        </div>

        {/* Mobile Navigation Overlay */}
        <div
          className={`header__container__mobile-nav ${isMobileMenuOpen ? 'header__container__mobile-nav--open' : ''}`}
        >
          <nav className='header__container__mobile-nav__content'>
            <ul className='header__container__mobile-nav__list'>
              {navItems.map(item => (
                <li
                  key={item.href}
                  className='header__container__mobile-nav__item'
                >
                  <button
                    className='header__container__mobile-nav__link'
                    onClick={() => handleNavClick(item.href)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }
                    }}
                    tabIndex={0}
                    aria-label={`Navigate to ${item.label} section`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Button Holder */}
          <div className='header__container__mobile-button-holder'>
            <HeaderButtons />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
