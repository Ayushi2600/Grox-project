import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateField } from '../../store/features/introduction/introductionSlice.js';
import { updateUser } from '../../store/features/introduction/introductionThunks.js';
import { Icons } from '../../Icons/Icons.jsx';
import './Introduction.scss';
import Button from '../../components/Button/Button.jsx';
import maskImg from '../../images/Mask_group.png';
import CustomSelect from '../../components/CustomSelect/CustomSelect.jsx';
import { countries } from '../../constants/countries.js';
import PhoneInput from '../../components/WaitlistModal/PhoneInput/PhoneInput.jsx';
import { validateName } from '../../utils/validators';
import FirstNameInput from './NameInputs/FirstNameInput.jsx';
import LastNameInput from './NameInputs/LastNameInput.jsx';

const Introduction = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = React.useState({
    firstName: '',
    lastName: '',
  });

  const { isLoading } = useSelector(state => state.auth);

  const formData = useSelector(state => state.introduction);

  const handleChange = field => e => {
    const value = e.target.value;
    dispatch(updateField({ field, value }));

    if (field === 'firstName' || field === 'lastName') {
      if (!value) {
        setErrors(prev => ({ ...prev, [field]: '' }));
      } else if (!validateName(value)) {
        setErrors(prev => ({
          ...prev,
          [field]: `${field === 'firstName' ? 'First' : 'Last'} name must start with a capital letter and contain only letters.`,
        }));
      } else {
        setErrors(prev => ({ ...prev, [field]: '' }));
      }
    }
  };

  const handleDialCodeChange = e => {
    const code = e.target.value;
    dispatch(updateField({ field: 'dialCode', value: code }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('User not logged in');
      return;
    }

    try {
      const dataToSubmit = {
        ...formData,
        phoneNumber: formData.phoneNumber,
        countryCode: formData.dialCode,
      };

      const result = await dispatch(
        updateUser({ userId, formData: dataToSubmit })
      ).unwrap();
      console.log('User updated:', result);
      navigate('/verify-phone');
    } catch (error) {
      console.error('Failed to update user:', error);
      alert(error);
    }
  };

  const isButtonDisabled = !(
    formData.firstName &&
    formData.lastName &&
    formData.phoneNumber &&
    formData.dialCode &&
    formData.nationality
  );

  let isError = false;
  return (
    <div className='center-container-div introduction-screen'>
      <div className='verification-container intro-container'>
        <div className='logo-div'>
          <div className='logo'>{Icons.redLogo}</div>
          <h2 className='form-heading'>Let's get to know you</h2>
        </div>
        <form className='intro-form' onSubmit={handleSubmit}>
          <div className='form-row'>
            <FirstNameInput
              value={formData.firstName}
              onChange={handleChange('firstName')}
              error={errors.firstName}
            />
            <LastNameInput
              value={formData.lastName}
              onChange={handleChange('lastName')}
              error={errors.lastName}
            />
          </div>

          <div className='form-group'>
            <label>Phone number</label>
            <PhoneInput
              value={
                formData.dialCode && formData.phoneNumber
                  ? `${formData.dialCode}${formData.phoneNumber}`
                  : ''
              }
              onChange={(value, country) => {
                const dialCode = `+${country.dialCode}`;
                const nationalNumber = value.replace(dialCode, '');

                dispatch(
                  updateField({ field: 'phoneNumber', value: nationalNumber })
                );
                dispatch(updateField({ field: 'dialCode', value: dialCode }));
              }}
              error={false} // Need to set error here for
              disabled={isLoading}
            />
            {isError && <span className='validation-error-txt'>error</span>}
          </div>

          <div className='form-group'>
            <label>Nationality</label>
            <CustomSelect
              options={countries}
              value={formData.nationality}
              onChange={val =>
                dispatch(updateField({ field: 'nationality', value: val }))
              }
              placeholder='Select'
            />
          </div>

          <div className='form-group referral-group'>
            <label>Referral code (optional)</label>
            <input
              type='text'
              placeholder='Enter referral code'
              value={formData.referralCode}
              onChange={handleChange('referralCode')}
              className='input-field'
            />
            {isError && <span className='validation-error-txt'>error</span>}
          </div>

          <div className='form-action-btn'>
            <Button
              type='submit'
              variant='primary'
              size='lg'
              loading={isLoading}
              disabled={isButtonDisabled}
              className='auth-form-submit-btn'
            >
              {isLoading ? 'Loading...' : 'Continue'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Introduction;
