import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

// Define the initial state for the slice
const initialState = {
    clients: [],
    loading: false,
    error: null,
};

// Async thunk to fetch clients from the server
export const fetchClients = createAsyncThunk('clients/fetchClients', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('/api/clients');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Create a slice
const clientSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchClients.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchClients.fulfilled, (state, action) => {
                state.loading = false;
                state.clients = action.payload;
            })
            .addCase(fetchClients.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// Export selector for accessing clients from the store
export const selectClients = (state) => state.clientReducer.clients;

// Export the reducer to be included in the store
export default clientSlice.reducer;
