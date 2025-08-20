import React, { useState, useRef, useEffect } from 'react';
import './CustomSelect.scss';

const CustomSelect = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  const selected = options.find(opt => opt.code === value);

  const handleSelect = val => {
    onChange(val);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='custom-select' ref={dropdownRef}>
      <div className='custom-select-trigger' onClick={() => setIsOpen(!isOpen)}>
        {selected ? (
          <>
            <span className='selected-name'>{selected.name}</span>
          </>
        ) : (
          <span className='placeholder'>{placeholder}</span>
        )}
        <span className={`arrow ${isOpen ? 'up' : ''}`} />
      </div>
      {isOpen && (
        <div className='custom-select-dropdown'>
          {options.map(option => (
            <div
              className={`custom-select-option ${selected?.name === option?.name ? 'selected-item' : ''}`}
              key={option.code}
              onClick={() => handleSelect(option.code)}
            >
              <span>{option.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
