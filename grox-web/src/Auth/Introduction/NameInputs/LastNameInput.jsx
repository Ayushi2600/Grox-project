import React from 'react';

const LastNameInput = ({ value, onChange, error }) => (
  <div className='form-group'>
    <label>Last name</label>
    <input
      type='text'
      placeholder='Last name'
      value={value}
      onChange={onChange}
      className='input-field'
    />
    {error && <span className='validation-error-txt'>{error}</span>}
  </div>
);

export default LastNameInput;
