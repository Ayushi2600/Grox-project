import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AUTH_API } from '../../../constants/api';

export const createUser = createAsyncThunk(
  'introduction/createUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${AUTH_API}/users/register`,
        userData
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to create user'
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  'introduction/updateUser',
  async ({ userId, formData }, { rejectWithValue }) => {
    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        countryCode: formData.dialCode,
        nationality: formData.nationality,
      };
      const response = await axios.put(
        `${AUTH_API}/user/${userId}`,
        payload
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to update user'
      );
    }
  }
);