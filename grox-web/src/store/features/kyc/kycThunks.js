import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AUTH_API } from "../../../constants/api";

// 1. Submit biometric KYC
export const submitBiometricKyc = createAsyncThunk(
  "kyc/submitBiometricKyc",
  async (kycData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${AUTH_API}/kyc/biometric-kyc`, kycData);
      return res.data; // always return backend response as-is
    } catch (error) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message || "KYC submission failed");
    }
  }
);

// 2. Get job status
export const fetchJobStatus = createAsyncThunk(
  "kyc/fetchJobStatus",
  async (jobId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${AUTH_API}/kyc/job-status/${jobId}`);
      return res.data;
    } catch (error) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message || "Failed to fetch job status");
    }
  }
);

// 3. Get supported ID types
export const fetchSupportedIdTypes = createAsyncThunk(
  "kyc/fetchSupportedIdTypes",
  async (countryCode, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${AUTH_API}/kyc/supported-id-types/${countryCode}`);
      return res.data;
    } catch (error) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message || "Failed to fetch supported ID types");
    }
  }
);
