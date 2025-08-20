import React from 'react';
import Navigation from '../components/Navigation/Navigation';

export default {
  title: 'Components/Navigation',
  component: Navigation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Floating navigation bar with sticky behavior, mobile hamburger menu, and smooth scroll navigation.',
      },
    },
  },
};

// Default navigation
export const Default = () => <Navigation />;

// Navigation with scroll (to show sticky behavior)
export const WithScroll = () => (
  <div
    style={{
      height: '200vh',
      background: 'linear-gradient(to bottom, #f0f0f0, #e0e0e0)',
    }}
  >
    <Navigation />
    <div style={{ paddingTop: '100px', textAlign: 'center' }}>
      <h1>Scroll down to see sticky navigation</h1>
      <p>
        Scroll down to see the navigation become sticky with background blur
      </p>
    </div>
  </div>
);

WithScroll.parameters = {
  docs: {
    description: {
      story:
        'Scroll down to see the navigation become sticky with background blur effect.',
    },
  },
};
