import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentStep: 1,
  documentType: '',
  uploadedFileMeta: null,
  fileError: '',
};

const kycSlice = createSlice({
  name: 'kyc',
  initialState,
  reducers: {
    nextStep: state => {
      state.currentStep += 1;
    },
    setDocumentType: (state, action) => {
      state.documentType = action.payload;
    },
    setUploadedFileMeta: (state, action) => {
      state.uploadedFileMeta = action.payload; 
      state.fileError = '';
    },
    setFileError: (state, action) => {
      state.fileError = action.payload;
    },
    resetKyc: () => initialState,
  },
});

export const {
  nextStep,
  setDocumentType,
  setUploadedFileMeta,
  setFileError,
  resetKyc,
} = kycSlice.actions;

export default kycSlice.reducer;
