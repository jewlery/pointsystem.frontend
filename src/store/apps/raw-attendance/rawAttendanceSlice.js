import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

// Thunks
export const fetchRawAttendances = createAsyncThunk(
  'rawAttendance/fetchByCompanyAndWorkDay',
  async ({ companyId, workDayId }) => {
    const response = await axios.get(`/raw-attendances/by-company/${companyId}/work-day/${workDayId}`);
    return response.data;
  }
);

export const updateRawAttendance = createAsyncThunk(
  'rawAttendance/update',
  async ({ id, data }) => {
    const response = await axios.put(`/raw-attendances/${id}`, data);
    return response.data;
  }
);

export const deleteRawAttendance = createAsyncThunk(
  'rawAttendance/delete',
  async (id) => {
    await axios.delete(`/raw-attendances/${id}`);
    return id;
  }
);

const rawAttendanceSlice = createSlice({
  name: 'rawAttendance',
  initialState: {
    attendances: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRawAttendances.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRawAttendances.fulfilled, (state, action) => {
        state.loading = false;
        state.attendances = action.payload || [];
      })
      .addCase(fetchRawAttendances.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default rawAttendanceSlice.reducer;