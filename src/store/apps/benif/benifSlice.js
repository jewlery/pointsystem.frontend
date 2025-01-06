import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';
import {exportAchats} from "../achat/achatSlice";

// Define the base API URL
const API_URL = '/api/benifs';

// async thunk to export benifs  as an excel file
export const exportBenifs = createAsyncThunk(
    'benifs/exportBenifs',
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
            link.setAttribute('download', 'benifs.xlsx'); // Specify the file name
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to fetch benifs with pagination, filtering, and search
export const fetchBenifs = createAsyncThunk(
    'benifs/fetchBenifs',
    async ({ page = 1, filters = {}, search = '', order, orderBy }, { rejectWithValue }) => {
        try {
            const response = await axios.get(API_URL, {
                params: { page, ...filters, search, order, orderBy },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to create a new benif
export const createBenif = createAsyncThunk(
    'benifs/createBenif',
    async (benifData, { rejectWithValue }) => {
        try {
            const response = await axios.post(API_URL, benifData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to update an existing benif
export const updateBenif = createAsyncThunk(
    'benifs/updateBenif',
    async ({ id, benifData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, benifData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to delete a benif
export const deleteBenif = createAsyncThunk(
    'benifs/deleteBenif',
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
    benifs: [],
    total: 0,
    loading: false,
    error: null,
};

// Create the slice
const benifSlice = createSlice({
    name: 'benifs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch benifs
            .addCase(fetchBenifs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBenifs.fulfilled, (state, action) => {
                state.loading = false;
                state.benifs = action.payload.data;
                state.total = action.payload.total;
            })
            .addCase(fetchBenifs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Could not fetch benifs';
            })
            // Create benif
            .addCase(createBenif.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createBenif.fulfilled, (state, action) => {
                state.loading = false;
                state.benifs.push(action.payload);
            })
            .addCase(createBenif.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Could not create benif';
            })
            // Update benif
            .addCase(updateBenif.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateBenif.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.benifs.findIndex(benif => benif.id === action.payload.id);
                if (index !== -1) {
                    state.benifs[index] = action.payload;
                }
            })
            .addCase(updateBenif.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Could not update benif';
            })
            // Delete benif
            .addCase(deleteBenif.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteBenif.fulfilled, (state, action) => {
                state.loading = false;
                state.benifs = state.benifs.filter(benif => benif.id !== action.payload);
            })
            .addCase(deleteBenif.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Could not delete benif';
            })
            .addCase(exportBenifs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(exportBenifs.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(exportBenifs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Could not export achats';
            });
    },
});

// Export the reducer
export default benifSlice.reducer;
