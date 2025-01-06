import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../../utils/axios';
import {exportLuises} from "../luise/luiseSlice";

// Define the initial state with `total`
const initialState = {
    tpes: [],
    tpe: null,
    total: 0, // Added total to initial state
    status: 'idle',
    error: null,
};

// Define API URL
const API_URL = '/api/tpes';

// async thunk to export tpes  as an excel file
export const exportTpes = createAsyncThunk(
    'tpes/exportTpes',
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
            link.setAttribute('download', 'tpes.xlsx'); // Specify the file name
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


// Thunks for API calls
export const fetchTpes = createAsyncThunk('tpes/fetchTpes', async ({page = 1, filters = {}, order, orderBy}) => {
    const response = await axios.get(API_URL, {
        params: {
            page: page + 1,
            ...filters, order, orderBy
        }
    });
    return response.data;
});

export const fetchTpeById = createAsyncThunk('tpes/fetchTpeById', async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
});

export const createTpe = createAsyncThunk('tpes/createTpe', async (newTpe) => {
    const response = await axios.post(API_URL, newTpe);
    return response.data;
});

export const updateTpe = createAsyncThunk('tpes/updateTpe', async ({id, updatedTpe}) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedTpe);
    return response.data;
});

export const deleteTpe = createAsyncThunk('tpes/deleteTpe', async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
});

// Slice
const tpeSlice = createSlice({
    name: 'tpes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTpes.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTpes.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tpes = action.payload.data;
                state.total = action.payload.total; // Update total
            })
            .addCase(fetchTpes.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchTpeById.fulfilled, (state, action) => {
                state.tpe = action.payload;
            })
            .addCase(createTpe.fulfilled, (state, action) => {
                state.tpes.push(action.payload);
            })
            .addCase(updateTpe.fulfilled, (state, action) => {
                const index = state.tpes.findIndex((tpe) => tpe.id === action.payload.id);
                if (index !== -1) {
                    state.tpes[index] = action.payload;
                }
            })
            .addCase(deleteTpe.fulfilled, (state, action) => {
                state.tpes = state.tpes.filter((tpe) => tpe.id !== action.payload);
            })
            .addCase(exportTpes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(exportTpes.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(exportTpes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Could not export achats';
            });
    },
});

export default tpeSlice.reducer;
