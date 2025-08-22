import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSupportedIdTypes,
  submitBiometricKyc,
  fetchJobStatus,
} from '../../store/features/kyc/kycThunks';
import { clearError, clearKycResult } from '../../store/features/kyc/kycSlice';
import ID_TYPES from '../../constants/idTypes';
import { ID_RULES } from '../../constants/idRules';

export default function KycForm() {
  const dispatch = useDispatch();
  const { 
    supportedIdTypes, 
    loading, 
    kycResult, 
    jobId, 
    error,
    jobStatus,
    statusLoading 
  } = useSelector(state => state.kyc);

  const [country, setCountry] = useState('');
  const [idType, setIdType] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [selfie, setSelfie] = useState('');
  const [validationError, setValidationError] = useState('');
  const [isKycSubmitted, setIsKycSubmitted] = useState(false);

  useEffect(() => {
    if (kycResult && jobId) {
      console.log('KYC Submitted Successfully:', {
        jobId,
        result: kycResult
      });
      setIsKycSubmitted(true);
    }
  }, [kycResult, jobId]);

  useEffect(() => {
    if (supportedIdTypes.length > 0) {
      console.log('Supported ID Types fetched:', supportedIdTypes);
    }
  }, [supportedIdTypes]);

  // Clear Redux errors when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleCountryChange = e => {
    const selectedCountry = e.target.value;
    setCountry(selectedCountry);
    setIdType('');
    if (selectedCountry) {
      console.log('Fetching supported ID types for:', selectedCountry);
      dispatch(fetchSupportedIdTypes(selectedCountry));
    }
  };

  const handleSelfieUpload = e => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setValidationError('File size must be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setSelfie(reader.result);
        console.log('Selfie uploaded successfully');
        setValidationError(''); // Clear any previous errors
      };
      reader.onerror = () => {
        setValidationError('Failed to read the file');
      };
      reader.readAsDataURL(file);
    }
  };

  const validateIdNumber = () => {
    const rules = ID_RULES[country]?.[idType];
    if (!rules) return true; // no regex, skip validation
    return rules.some(regex => regex.test(idNumber));
  };

  const validateForm = () => {
    if (!country || !idType || !idNumber || !firstName || !lastName || !dob || !selfie) {
      setValidationError('All fields are required.');
      return false;
    }

    if (!validateIdNumber()) {
      setValidationError('Invalid ID number format for selected ID type.');
      return false;
    }

    // Validate date of birth (must be at least 18 years old)
    const dobDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - dobDate.getFullYear();
    if (age < 18) {
      setValidationError('You must be at least 18 years old.');
      return false;
    }

    setValidationError('');
    return true;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await dispatch(
        submitBiometricKyc({
          firstName,
          lastName,
          country,
          idType,
          idNumber,
          dateOfBirth: dob,
          selfieImage: selfie,
          isBase64: true,
        })
      ).unwrap(); // This will throw if the action is rejected
    } catch (error) {
      console.error('KYC submission failed:', error);
    }
  };

  const handleCheckStatus = async () => {
    if (!jobId) {
      console.error('No job ID available for status check');
      return;
    }
    console.log('Checking KYC status for Job ID:', jobId);
    try {
      await dispatch(fetchJobStatus(jobId)).unwrap();
    } catch (error) {
      console.error('Status check failed:', error);
    }
  };

  const handleReset = () => {
    setCountry('');
    setIdType('');
    setIdNumber('');
    setFirstName('');
    setLastName('');
    setDob('');
    setSelfie('');
    setValidationError('');
    setIsKycSubmitted(false);
    dispatch(clearKycResult());
    dispatch(clearError());
  };

  return (
    <div className="kyc-form">
      <h2 className="kyc-form-title">KYC Verification</h2>
      
      {/* Display API errors */}
      {error && (
        <div className="kyc-error-message">
          <p className="error-text">Error: {error}</p>
        </div>
      )}

      {/* KYC Success Message */}
      {isKycSubmitted && (
        <div className="kyc-success-message">
          <p className="success-text">KYC submitted successfully! Job ID: {jobId}</p>
        </div>
      )}

      {/* Display Job Status */}
      {jobStatus && (
        <div className="job-status-container">
          <h3>KYC Status</h3>
          <p>Status: {jobStatus.status}</p>
          {jobStatus.resultCode && <p>Result Code: {jobStatus.resultCode}</p>}
          {jobStatus.resultText && <p>Result: {jobStatus.resultText}</p>}
          {jobStatus.confidenceValue && <p>Confidence: {jobStatus.confidenceValue}</p>}
        </div>
      )}

      <form onSubmit={handleSubmit} className="kyc-form">
        {/* Country */}
        <div className="form-field">
          <label htmlFor="country" className="form-label">
            Country *
          </label>
          <select 
            className="form-select-country"
            value={country} 
            onChange={handleCountryChange}
            disabled={loading || isKycSubmitted}
          >
            <option value="">Select Country</option>
            <option value="NG">Nigeria</option>
            <option value="KE">Kenya</option>
            <option value="GH">Ghana</option>
            <option value="UG">Uganda</option>
            <option value="ZA">South Africa</option>
            <option value="ZM">Zambia</option>
          </select>
        </div>

        {/* ID Type */}
        <div className="form-field">
          <label htmlFor="idType" className="form-label">
            ID Type *
          </label>
          <select
            className="form-select-id-type"
            value={idType}
            onChange={e => setIdType(e.target.value)}
            disabled={loading || isKycSubmitted || !country}
          >
            <option value="">Select ID Type</option>
            {country &&
              ID_TYPES[country]?.map(id => (
                <option key={id.type} value={id.type}>
                  {id.type} {id.format && `(${id.format})`}
                </option>
              ))}
          </select>
        </div>

        {/* ID Number */}
        <div className="form-field">
          <label htmlFor="idNumber" className="form-label">
            ID Number *
          </label>
          <input
            className="form-input"
            type="text"
            placeholder="Enter ID Number"
            value={idNumber}
            onChange={e => setIdNumber(e.target.value)}
            disabled={loading || isKycSubmitted}
          />
        </div>

        {/* First Name */}
        <div className="form-field">
          <label htmlFor="firstName" className="form-label">
            First Name *
          </label>
          <input
            className="form-input"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            disabled={loading || isKycSubmitted}
          />
        </div>

        {/* Last Name */}
        <div className="form-field">
          <label htmlFor="lastName" className="form-label">
            Last Name *
          </label>
          <input
            className="form-input"
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            disabled={loading || isKycSubmitted}
          />
        </div>

        {/* DOB */}
        <div className="form-field">
          <label htmlFor="dob" className="form-label">
            Date of Birth *
          </label>
          <input
            className="form-input"
            type="date"
            value={dob}
            onChange={e => setDob(e.target.value)}
            disabled={loading || isKycSubmitted}
            max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
          />
        </div>

        {/* Upload Selfie */}
        <div className="form-field">
          <label htmlFor="selfie" className="form-label">
            Upload Selfie * (Max 5MB)
          </label>
          <input
            className="form-file-input"
            type="file"
            accept="image/*"
            onChange={handleSelfieUpload}
            disabled={loading || isKycSubmitted}
          />
          {selfie && (
            <div className="selfie-preview">
              <img 
                src={selfie} 
                alt="Selfie Preview" 
                className="preview-image"
                style={{ maxWidth: '200px', maxHeight: '200px' }}
              />
            </div>
          )}
        </div>

        {/* Validation Error */}
        {validationError && (
          <p className="validation-error">{validationError}</p>
        )}

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={loading || isKycSubmitted}
          className={`submit-button ${loading || isKycSubmitted ? 'disabled' : 'active'}`}
        >
          {loading ? 'Submitting...' : isKycSubmitted ? 'KYC Submitted' : 'Submit KYC'}
        </button>
      </form>

      {/* Action Buttons - Only visible after successful KYC submission */}
      {isKycSubmitted && (
        <div className="status-actions">
          <button 
            onClick={handleCheckStatus}
            disabled={statusLoading}
            className={`status-button ${statusLoading ? 'loading' : 'active'}`}
          >
            {statusLoading ? 'Checking Status...' : 'Check KYC Status'}
          </button>
        </div>
      )}
    </div>
  );
}