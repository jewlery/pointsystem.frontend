import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

// Define the base API URL
const API_URL = '/workdays';

// Async thunk to fetch workdays with pagination and search
export const fetchWorkDays = createAsyncThunk(
  'workdays/fetchWorkDays',
  async ({ page = 1, rowsPerPage = 5, search = '' }, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL, {
        params: { page, rowsPerPage, search },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to create a new workday
export const createWorkDay = createAsyncThunk(
  'workdays/createWorkDay',
  async (workdayData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, workdayData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to update an existing workday
export const updateWorkDay = createAsyncThunk(
  'workdays/updateWorkDay',
  async ({ id, workdayData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, workdayData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to delete a workday
export const deleteWorkDay = createAsyncThunk(
  'workdays/deleteWorkDay',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// The initial state
const initialState = {
  workdays: [],
  total: 0,
  loading: false,
  error: null,
};

// Create the slice
const workdaySlice = createSlice({
  name: 'workdays',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch workdays
      .addCase(fetchWorkDays.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkDays.fulfilled, (state, action) => {
        state.loading = false;
        state.workdays = action.payload;
        state.total = action.payload.length;
      })
      .addCase(fetchWorkDays.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Could not fetch workdays';
      })
      // Create workday
      .addCase(createWorkDay.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createWorkDay.fulfilled, (state, action) => {
        state.loading = false;
        state.workdays.push(action.payload.data);
      })
      .addCase(createWorkDay.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Could not create workday';
      })
      // Update workday
      .addCase(updateWorkDay.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWorkDay.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.workdays.findIndex(workday => workday.id === action.payload.id);
        if (index !== -1) {
          state.workdays[index] = action.payload;
        }
      })
      .addCase(updateWorkDay.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Could not update workday';
      })
      // Delete workday
      .addCase(deleteWorkDay.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteWorkDay.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action);
        state.workdays = state.workdays.filter(workday => workday.ID !== action.payload);
      })
      .addCase(deleteWorkDay.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Could not delete workday';
      });
  },
});

// Export the reducer
export default workdaySlice.reducer;