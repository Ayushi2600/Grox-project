import { createSlice } from "@reduxjs/toolkit";
import { createUser, updateUser } from "./introductionThunks";

const initialState = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  dialCode: '',
  nationality: '',
  referralCode: '',
  email: '',
  userId: null,
  loading: false,
  error: null,
};

const introductionSlice = createSlice({
  name: 'introduction',
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetIntroduction: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // CREATE USER
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userId = action.payload.id;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE USER
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateField, resetIntroduction } = introductionSlice.actions;
export default introductionSlice.reducer;
