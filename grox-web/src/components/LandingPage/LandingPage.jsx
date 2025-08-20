import React from 'react';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import HeroSection from '../HeroSection/HeroSection';
import AboutGroxSection from '../AboutGroxSection/AboutGroxSection';
import HowGroxWorks from '../HowGroxWorks/HowGroxWorks';
import Testimonials from '../Testimonials/Testimonials';
import FAQs from '../FAQs/FAQs';
import ForBusinesses from '../ForBusinesses/ForBusinesses';
import CTASection from '../CTASection/CTASection';
import Footer from '../Footer/Footer';
import './LandingPage.scss';

const LandingPage = ({ onJoinWaitlist }) => {
  return (
    <div className='landing-page'>
      {/* Accessibility: Skip to main content */}
      <a href='#hero' className='skip-to-main'>
        Skip to main content
      </a>

      {/* Header - with mobile sticky behavior */}
      <Header />

      {/* Navigation */}
      <Navigation />

      {/* Main content sections */}
      <main>
        <HeroSection onJoinWaitlist={onJoinWaitlist} />
        <AboutGroxSection />
        <HowGroxWorks />
        <Testimonials />
        <FAQs />
        <ForBusinesses />
        <CTASection onJoinWaitlist={onJoinWaitlist} />
      </main>

      {/* Footer */}
      <Footer onJoinWaitlist={onJoinWaitlist} />
    </div>
  );
};

export default LandingPage;
