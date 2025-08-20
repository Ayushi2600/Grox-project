import React from 'react';
import { ArrowRight, Info, Spinner } from '@phosphor-icons/react';
import Button from '../components/Button/Button';

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A versatile button component with multiple variants, sizes, and states. Built with Emotion styled components and follows BEM naming conventions.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost'],
      description: 'The visual style variant of the button',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'The size of the button',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Shows a loading spinner and disables the button',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disables the button and reduces opacity',
    },
    leftIcon: {
      control: false,
      description: 'Icon to display on the left side of the button text',
    },
    rightIcon: {
      control: false,
      description: 'Icon to display on the right side of the button text',
    },
    onClick: {
      action: 'clicked',
      description: 'Function called when button is clicked',
    },
  },
};

// Template for individual stories
const Template = args => <Button {...args} />;

// Default button
export const Default = Template.bind({});
Default.args = {
  children: 'Join the Waitlist',
  variant: 'primary',
  size: 'md',
};

// Primary variant
export const Primary = Template.bind({});
Primary.args = {
  children: 'Join the Waitlist',
  variant: 'primary',
  size: 'md',
};

// Secondary variant
export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Learn How It Works',
  variant: 'secondary',
  size: 'md',
};

// Ghost variant
export const Ghost = Template.bind({});
Ghost.args = {
  children: 'Learn More',
  variant: 'ghost',
  size: 'md',
};

// Button sizes
export const Sizes = () => (
  <div
    style={{
      display: 'flex',
      gap: '16px',
      alignItems: 'center',
      flexWrap: 'wrap',
    }}
  >
    <Button variant='primary' size='sm'>
      Small Button
    </Button>
    <Button variant='primary' size='md'>
      Medium Button
    </Button>
    <Button variant='primary' size='lg'>
      Large Button
    </Button>
  </div>
);

Sizes.parameters = {
  docs: {
    description: {
      story:
        'Buttons come in three sizes: small (32px), medium (44px), and large (56px) height.',
    },
  },
};

// Button variants
export const Variants = () => (
  <div
    style={{
      display: 'flex',
      gap: '16px',
      alignItems: 'center',
      flexWrap: 'wrap',
    }}
  >
    <Button variant='primary'>Primary</Button>
    <Button variant='secondary'>Secondary</Button>
    <Button variant='ghost'>Ghost</Button>
  </div>
);

Variants.parameters = {
  docs: {
    description: {
      story:
        'Three visual variants: primary (filled), secondary (outlined), and ghost (minimal).',
    },
  },
};

// Button with icons
export const WithIcons = () => (
  <div
    style={{
      display: 'flex',
      gap: '16px',
      alignItems: 'center',
      flexWrap: 'wrap',
    }}
  >
    <Button variant='primary' leftIcon={<Info />}>
      Learn More
    </Button>
    <Button variant='secondary' rightIcon={<ArrowRight />}>
      Get Started
    </Button>
    <Button variant='ghost' leftIcon={<Info />} rightIcon={<ArrowRight />}>
      Explore
    </Button>
  </div>
);

WithIcons.parameters = {
  docs: {
    description: {
      story:
        'Buttons can include icons on the left, right, or both sides using Phosphor Icons.',
    },
  },
};

// Button states
export const States = () => (
  <div
    style={{
      display: 'flex',
      gap: '16px',
      alignItems: 'center',
      flexWrap: 'wrap',
    }}
  >
    <Button variant='primary'>Default</Button>
    <Button variant='primary' loading>
      Loading
    </Button>
    <Button variant='primary' disabled>
      Disabled
    </Button>
  </div>
);

States.parameters = {
  docs: {
    description: {
      story: 'Different states: default, loading (with spinner), and disabled.',
    },
  },
};

// All button combinations
export const AllCombinations = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    {/* Primary variants */}
    <div
      style={{
        display: 'flex',
        gap: '16px',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Button variant='primary' size='sm'>
        Small Primary
      </Button>
      <Button variant='primary' size='md'>
        Medium Primary
      </Button>
      <Button variant='primary' size='lg'>
        Large Primary
      </Button>
      <Button variant='primary' size='md' loading>
        Loading
      </Button>
      <Button variant='primary' size='md' disabled>
        Disabled
      </Button>
    </div>

    {/* Secondary variants */}
    <div
      style={{
        display: 'flex',
        gap: '16px',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Button variant='secondary' size='sm'>
        Small Secondary
      </Button>
      <Button variant='secondary' size='md'>
        Medium Secondary
      </Button>
      <Button variant='secondary' size='lg'>
        Large Secondary
      </Button>
      <Button variant='secondary' size='md' loading>
        Loading
      </Button>
      <Button variant='secondary' size='md' disabled>
        Disabled
      </Button>
    </div>

    {/* Ghost variants */}
    <div
      style={{
        display: 'flex',
        gap: '16px',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Button variant='ghost' size='sm'>
        Small Ghost
      </Button>
      <Button variant='ghost' size='md'>
        Medium Ghost
      </Button>
      <Button variant='ghost' size='lg'>
        Large Ghost
      </Button>
      <Button variant='ghost' size='md' loading>
        Loading
      </Button>
      <Button variant='ghost' size='md' disabled>
        Disabled
      </Button>
    </div>
  </div>
);

AllCombinations.parameters = {
  docs: {
    description: {
      story: 'Complete overview of all button variants, sizes, and states.',
    },
  },
};

// Interactive example
export const Interactive = Template.bind({});
Interactive.args = {
  children: 'Click Me!',
  variant: 'primary',
  size: 'md',
  rightIcon: <ArrowRight />,
};

Interactive.parameters = {
  docs: {
    description: {
      story:
        'Interactive button with click handler and right icon. Check the Actions panel to see click events.',
    },
  },
};
