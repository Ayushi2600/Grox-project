import React, { useState, useEffect } from 'react';
import './Navigation.scss';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = event => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
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
    <>
      <nav className={`navigation ${isScrolled ? 'navigation--scrolled' : ''}`}>
        <div className='navigation__content'>
          <ul className='navigation__menu'>
            {navItems.map(item => (
              <li key={item.href} className='navigation__menu-item'>
                <a
                  className='navigation__menu-link'
                  onClick={() => handleNavClick(item.href)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }
                  }}
                  tabIndex={0}
                  role='button'
                  aria-label={`Navigate to ${item.label} section`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            className={`navigation__mobile-toggle ${
              isMobileMenuOpen ? 'navigation__mobile-toggle--open' : ''
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label='Toggle mobile menu'
            aria-expanded={isMobileMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile menu commented out
      <div
        className={`navigation__mobile-menu ${
          isMobileMenuOpen ? 'navigation__mobile-menu--open' : ''
        }`}
      >
        <ul className='navigation__mobile-menu-list'>
          {navItems.map(item => (
            <li key={item.href} className='navigation__mobile-menu-item'>
              <a
                className='navigation__mobile-menu-link'
                onClick={() => handleNavClick(item.href)}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }
                }}
                tabIndex={0}
                role='button'
                aria-label={`Navigate to ${item.label} section`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      */}
    </>
  );
};

export default Navigation;
