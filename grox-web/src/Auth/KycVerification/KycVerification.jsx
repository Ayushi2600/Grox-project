import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  nextStep,
  setDocumentType,
  setUploadedFileMeta,
  setFileError,
} from '../../store/features/kyc/kycSlice';
import { Icons } from '../../Icons/Icons';
import './KycVerification.scss';
import Button from '../../components/Button/Button';

const stepsArr = [
  {
    head: 'Create Account',
    desc: 'Join Grox by creating an account',
    status: 'complete',
    icon: Icons.completedStep,
  },
  {
    head: 'Verify phone number',
    desc: 'Add an extra layer of security by verifying your phone number.',
    status: 'complete',
    icon: Icons.completedStep,
  },
  {
    head: 'Verify identity',
    desc: 'Upload and verify your government-issued identity credentials e.g. NIN, BVN, Int’l Passport',
    status: 'inprogrss',
    icon: Icons.inprogressStep,
  },
  {
    head: 'Upload Selfie',
    desc: 'Complete the verification process by taking your picture in real time.',
    status: 'pending',
    icon: Icons.pendingStep,
  },
];

const KycVerification = () => {
  const dispatch = useDispatch();
  const { currentStep, documentType, uploadedFile, fileError } = useSelector(
    state => state.kyc
  );

  const [actualFile, setActualFile] = useState(null);
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
  const isUploadReady = documentType && actualFile;

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 20 * 1024 * 1024) {
      dispatch(setFileError('File too large (max 20MB)'));
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      dispatch(setFileError('Invalid file type. Only PDF, JPG, PNG allowed.'));
      return;
    }

    dispatch(
      setUploadedFileMeta({ name: file.name, size: file.size, type: file.type })
    );
    setActualFile(file);
  };

  const handleSubmitDocuments = () => {
    if (!documentType) {
      dispatch(setFileError('Please select a document type.'));
      return;
    }
    if (!actualFile) {
      dispatch(setFileError('Please upload a valid file.'));
      return;
    }

    console.log('Sending to backend:', {
      documentType,
      file: actualFile,
    });
    console.log('Mock submit complete!');
  };

  const stepRender = useCallback(() => {}, []);

  let isStep1 = currentStep === 1;
  return (
    <div className='center-container-div kyc-verification-screen'>
      <div className='verification-container verfiy-container'>
        <div className='logo-div'>
          <div className='logo'>{Icons.redLogo}</div>
          <h2 className='form-heading'>
            {isStep1 ? 'You’re almost set up' : 'Verify document'}
          </h2>
          <p className='form-desc'>
            {isStep1
              ? 'In line with regulations, we have to collect and verify your information'
              : 'Choose a government issued document and upload. Ensure they are clear and well-lit.  '}
          </p>
        </div>
        {isStep1 && (
          <div className='verification-card complete-step-card'>
            <div className='steps-main-div'>
              {stepsArr?.map(step => {
                return (
                  <div className={`steps ${step?.status}`}>
                    {step.icon}
                    <div className='step-txt-div'>
                      <h4 className='step-head'>{step?.head}</h4>
                      <h6 className='step-desc'>{step?.desc}</h6>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className='form-action-btn'>
              <Button
                variant='primary'
                size='lg'
                className='auth-form-submit-btn'
                onClick={() => dispatch(nextStep())}
              >
                Submit Documents
              </Button>
              <Button
                variant='primary'
                size='lg'
                className='auth-form-submit-btn later-btn'
                onClick={() => alert('Later')}
              >
                Verify later
              </Button>
            </div>
          </div>
        )}

        {!isStep1 && (
          <div className='verification-card '>
            <div>
              <label>
                <input
                  type='radio'
                  name='doc'
                  value='passport'
                  checked={documentType === 'passport'}
                  onChange={e => dispatch(setDocumentType(e.target.value))}
                />
                International Passport
              </label>

              <label>
                <input
                  type='radio'
                  name='doc'
                  value='bvn'
                  checked={documentType === 'bvn'}
                  onChange={e => dispatch(setDocumentType(e.target.value))}
                />
                Bank Verification Number (BVN)
              </label>

              <label>
                <input
                  type='radio'
                  name='doc'
                  value='nin'
                  checked={documentType === 'nin'}
                  onChange={e => dispatch(setDocumentType(e.target.value))}
                />
                National Identity Number
              </label>
            </div>

            <div>
              <input type='file' onChange={handleFileChange} />
              {uploadedFile && <p>File uploaded: {uploadedFile.name}</p>}
              {fileError && <p style={{ color: 'red' }}>{fileError}</p>}
            </div>

            <button onClick={handleSubmitDocuments} disabled={!isUploadReady}>
              Upload Document
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default KycVerification;
