import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';
import {exportCredits} from "../credit/creditSlice";

// API URL for the Luise resource
const API_URL = '/api/luises';

// async thunk to export luises  as an excel file
export const exportLuises = createAsyncThunk(
    'luises/exportLuises',
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
            link.setAttribute('download', 'luises.xlsx'); // Specify the file name
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Thunks for asynchronous operations
export const fetchLuises = createAsyncThunk(
    'luises/fetchLuises',
    async (params = {}) => {
        const response = await axios.get(API_URL, { params });
        return response.data;
    }
);

export const fetchLuiseById = createAsyncThunk(
    'luises/fetchLuiseById',
    async (id) => {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    }
);

export const createLuise = createAsyncThunk(
    'luises/createLuise',
    async (luiseData) => {
        const response = await axios.post(API_URL, luiseData);
        return response.data;
    }
);

export const updateLuise = createAsyncThunk(
    'luises/updateLuise',
    async ({ id, luiseData }) => {
        const response = await axios.put(`${API_URL}/${id}`, luiseData);
        return response.data;
    }
);

export const deleteLuise = createAsyncThunk(
    'luises/deleteLuise',
    async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        return id;
    }
);

// Slice
const luiseSlice = createSlice({
    name: 'luises',
    initialState: {
        luises: [],
        selectedLuise: null,
        total: 0,
        status: 'idle',
        error: null,
    },
    reducers: {
        setSelectedLuise: (state, action) => {
            state.selectedLuise = action.payload;
        },
        clearSelectedLuise: (state) => {
            state.selectedLuise = null;
        },
        setTotal: (state, action) => {
            state.total = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLuises.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLuises.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.luises = action.payload.data;
                state.total = action.payload.total;
            })
            .addCase(fetchLuises.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchLuiseById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLuiseById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedLuise = action.payload;
            })
            .addCase(fetchLuiseById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createLuise.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createLuise.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.luises.push(action.payload);
            })
            .addCase(createLuise.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(updateLuise.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateLuise.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.luises.findIndex(luise => luise.id === action.payload.id);
                if (index !== -1) {
                    state.luises[index] = action.payload;
                }
            })
            .addCase(updateLuise.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteLuise.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteLuise.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.luises = state.luises.filter(luise => luise.id !== action.payload);
            })
            .addCase(deleteLuise.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(exportLuises.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(exportLuises.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(exportLuises.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Could not export achats';
            });
    },
});

export const { setSelectedLuise, clearSelectedLuise, setTotal } = luiseSlice.actions;

export default luiseSlice.reducer;
