import React from 'react';
import HeroSection from '../components/HeroSection/HeroSection';

export default {
  title: 'Sections/HeroSection',
  component: HeroSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Hero section with main headline, CTA buttons, and animated background elements.',
      },
    },
  },
};

// Default hero section
export const Default = () => <HeroSection />;

// Hero section with different content (for testing)
export const WithCustomContent = () => (
  <div style={{ minHeight: '100vh', background: '#fafafa' }}>
    <HeroSection />
  </div>
);

WithCustomContent.parameters = {
  docs: {
    description: {
      story: 'Hero section with custom background and full viewport height.',
    },
  },
};
