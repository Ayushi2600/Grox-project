import React from 'react';

const FirstNameInput = ({ value, onChange, error }) => (
  <div className='form-group'>
    <label>First name</label>
    <input
      type='text'
      placeholder='First name'
      value={value}
      onChange={onChange}
      className='input-field'
    />
    {error && <span className='validation-error-txt'>{error}</span>}
  </div>
);

export default FirstNameInput;
