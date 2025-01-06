import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../../utils/axios';
import {exportBenifs} from "../benif/benifSlice";

// Define the base API URL
const API_URL = '/api/credits';

// Async thunk to export achats as an Excel file
export const exportCredits = createAsyncThunk(
    'credits/exportCredits',
    async (filters, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${API_URL}/export`, {
                params: filters,
                responseType: 'blob', // Important for handling binary files
            });

            // Create a URL for the file and trigger download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'credits.xlsx'); // Specify the file name
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


// Async thunk to fetch credits with pagination, filtering, and search
export const fetchCredits = createAsyncThunk(
    'credits/fetchCredits',
    async ({page = 1, filters = {}, order, orderBy}, {rejectWithValue}) => {
      try {
        page++;
        const response = await axios.get(API_URL, {
          params: {page, ...filters, order, orderBy},
        });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
);

// Async thunk to create a new credit
export const createCredit = createAsyncThunk(
    'credits/createCredit',
    async (creditData, {rejectWithValue}) => {
      try {
        const response = await axios.post(API_URL, creditData);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
);

// Async thunk to update an existing credit
export const updateCredit = createAsyncThunk(
    'credits/updateCredit',
    async ({id, creditData}, {rejectWithValue}) => {
      try {
        const response = await axios.put(`${API_URL}/${id}`, creditData);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
);

// Async thunk to delete an credit
export const deleteCredit = createAsyncThunk(
    'credits/deleteCredit',
    async (id, {rejectWithValue}) => {
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
  credits: [],
  total: 0,
  loading: false,
  error: null,
};

// Create the slice
const creditSlice = createSlice({
  name: 'credits',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        // Fetch credits
        .addCase(fetchCredits.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchCredits.fulfilled, (state, action) => {
          state.loading = false;
          state.credits = action.payload.data;
          state.total = action.payload.total;
        })
        .addCase(fetchCredits.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || 'Could not fetch credits';
        })
        // Create credit
        .addCase(createCredit.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(createCredit.fulfilled, (state, action) => {
          state.loading = false;
          state.credits.push(action.payload);
        })
        .addCase(createCredit.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || 'Could not create credit';
        })
        // Update credit
        .addCase(updateCredit.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateCredit.fulfilled, (state, action) => {
          state.loading = false;
          const index = state.credits.findIndex(credit => credit.id === action.payload.id);
          if (index !== -1) {
            state.credits[index] = action.payload;
          }
        })
        .addCase(updateCredit.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || 'Could not update credit';
        })
        // Delete credit
        .addCase(deleteCredit.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deleteCredit.fulfilled, (state, action) => {
          state.loading = false;
          state.credits = state.credits.filter(credit => credit.id !== action.payload);
        })
        .addCase(deleteCredit.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || 'Could not delete credit';
        })
        .addCase(exportCredits.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(exportCredits.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(exportCredits.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || 'Could not export achats';
        });
  },
});

// Export the reducer
export default creditSlice.reducer;
