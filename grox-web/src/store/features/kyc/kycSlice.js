import { createSlice } from "@reduxjs/toolkit";
import {
  submitBiometricKyc,
  fetchJobStatus,
  fetchSupportedIdTypes,
} from "./kycThunks";

const initialState = {
  loading: false,
  error: null,
  jobId: null,
  userId: null,
  kycResult: null,
  supportedIdTypes: [],
  jobStatus: null,
  statusLoading: false,
};

const kycSlice = createSlice({
  name: "kyc",
  initialState,
  reducers: {
    resetKyc: () => initialState,
    clearError: (state) => {
      state.error = null;
    },
    clearKycResult: (state) => {
      state.kycResult = null;
      state.jobId = null;
      state.userId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Submit Biometric KYC
      .addCase(submitBiometricKyc.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitBiometricKyc.fulfilled, (state, action) => {
        state.loading = false;
        state.jobId = action.payload.jobId || null;
        state.userId = action.payload.userId || null;
        state.kycResult = action.payload.data || action.payload; // fallback
        state.error = null;
      })
      .addCase(submitBiometricKyc.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || action.error?.message || "KYC submission failed";
      })

      // 🔹 Fetch Job Status
      .addCase(fetchJobStatus.pending, (state) => {
        state.statusLoading = true;
        state.error = null;
      })
      .addCase(fetchJobStatus.fulfilled, (state, action) => {
        state.statusLoading = false;
        state.jobStatus = action.payload.data || action.payload;
        state.error = null;
      })
      .addCase(fetchJobStatus.rejected, (state, action) => {
        state.statusLoading = false;
        state.error =
          action.payload || action.error?.message || "Job status fetch failed";
      })

      // 🔹 Fetch Supported ID Types
      .addCase(fetchSupportedIdTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.supportedIdTypes = [];
      })
      .addCase(fetchSupportedIdTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.supportedIdTypes =
          action.payload.data?.supportedIdTypes ||
          action.payload.supportedIdTypes ||
          [];
        state.error = null;
      })
      .addCase(fetchSupportedIdTypes.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || action.error?.message || "Failed to fetch ID types";
        state.supportedIdTypes = [];
      });
  },
});

export const { resetKyc, clearError, clearKycResult } = kycSlice.actions;
export default kycSlice.reducer;
