import React from 'react';
import FAQs from '../components/FAQs/FAQs';

export default {
  title: 'Sections/FAQs',
  component: FAQs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'FAQ section with expandable accordion items, smooth animations, and accessible keyboard navigation.',
      },
    },
  },
};

// Default FAQs
export const Default = () => <FAQs />;

// FAQs in different contexts
export const InContainer = () => (
  <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
    <FAQs />
  </div>
);

InContainer.parameters = {
  docs: {
    description: {
      story:
        'FAQs section contained within a max-width container for better readability.',
    },
  },
};
