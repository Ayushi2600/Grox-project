import React from 'react';
import { ArrowRight, Spinner } from '@phosphor-icons/react';
import './Button.scss';

const Button = React.forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      onClick,
      onKeyDown,
      className,
      ...props
    },
    ref
  ) => {
    const handleClick = event => {
      if (!loading && !disabled && onClick) {
        onClick(event);
      }
    };

    const handleKeyDown = event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleClick(event);
      }
      if (onKeyDown) {
        onKeyDown(event);
      }
    };

    // Build BEM classes
    const buttonClasses = [
      'button',
      `button--${variant}`,
      `button--${size}`,
      loading && 'button--loading',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        className={buttonClasses}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <Spinner className='button__spinner' aria-hidden='true' />
        ) : (
          <>
            {leftIcon && <span className='button__icon'>{leftIcon}</span>}
            {children}
            {rightIcon && <span className='button__icon'>{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
