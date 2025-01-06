import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

// Define the base API URL
const API_URL = '/api/achats';

// Async thunk to export achats as an Excel file
export const exportAchats = createAsyncThunk(
    'achats/exportAchats',
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
            link.setAttribute('download', 'achats.xlsx'); // Specify the file name
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


// Async thunk to fetch achats with pagination, filtering, and search
export const fetchAchats = createAsyncThunk(
    'achats/fetchAchats',
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

// Async thunk to create a new achat
export const createAchat = createAsyncThunk(
    'achats/createAchat',
    async (achatData, {rejectWithValue}) => {
        try {
            const formData = new FormData();
            Object.keys(achatData).forEach((key) => {
                if (achatData[key])
                    formData.append(key, achatData[key]);
            });

            const response = await axios.post(API_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


// Async thunk to update an existing achat
export const updateAchat = createAsyncThunk(
    'achats/updateAchat',
    async ({id, achatData}, {rejectWithValue}) => {
        try {
            const formData = new FormData();
            Object.keys(achatData).forEach((key) => {
                if (achatData[key])
                    formData.append(key, achatData[key]);
            });

            const response = await axios.post(`${API_URL}/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


// Async thunk to delete an achat
export const deleteAchat = createAsyncThunk(
    'achats/deleteAchat',
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
    achats: [],
    total: 0,
    loading: false,
    error: null,
};

// Create the slice
const achatSlice = createSlice({
    name: 'achats',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch achats
            .addCase(fetchAchats.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAchats.fulfilled, (state, action) => {
                state.loading = false;
                state.achats = action.payload.data;
                state.total = action.payload.total;
            })
            .addCase(fetchAchats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Could not fetch achats';
            })
            // Create achat
            .addCase(createAchat.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createAchat.fulfilled, (state, action) => {
                state.loading = false;
                state.achats.push(action.payload);
            })
            .addCase(createAchat.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Could not create achat';
            })
            // Update achat
            .addCase(updateAchat.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateAchat.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.achats.findIndex(achat => achat.id === action.payload.id);
                if (index !== -1) {
                    state.achats[index] = action.payload;
                }
            })
            .addCase(updateAchat.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Could not update achat';
            })
            // Delete achat
            .addCase(deleteAchat.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAchat.fulfilled, (state, action) => {
                state.loading = false;
                state.achats = state.achats.filter(achat => achat.id !== action.payload);
            })
            .addCase(deleteAchat.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Could not delete achat';
            })
            .addCase(exportAchats.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(exportAchats.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(exportAchats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Could not export achats';
            });
    },
});

// Export the reducer
export default achatSlice.reducer;
