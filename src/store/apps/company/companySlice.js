import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'src/utils/axios';

// Define the base API URL for companies
const API_URL = '/companies';

// Async thunk to fetch clients from the server
export const selectCompanies = async () => {
    try {
        const response = await axios.get(`${API_URL}/select`);
        return response.data || [];
    } catch (error) {
        throw error.response.data;
    }
};


// Async thunk to fetch companies with pagination, filtering, and search
export const fetchCompanies = createAsyncThunk(
    'companies/fetchCompanies',
    async ({ page = 1, limit = 5, search = '', order, orderBy }, { rejectWithValue }) => {
        try {
            const response = await axios.get(API_URL, {
                params: { page, limit, search, order, orderBy },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to create a new company
export const createCompany = createAsyncThunk(
    'companies/createCompany',
    async (companyData, { rejectWithValue }) => {
        try {
            const response = await axios.post(API_URL, companyData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to update an existing company
export const updateCompany = createAsyncThunk(
    'companies/updateCompany',
    async ({ id, companyData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, companyData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to delete a company
export const deleteCompany = createAsyncThunk(
    'companies/deleteCompany',
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
    companies: [], // List of companies
    total: 0, // Total number of companies (for pagination)
    loading: false, // Loading state
    error: null, // Error state
};

// Create the slice
const companySlice = createSlice({
    name: 'companies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Companies
            .addCase(fetchCompanies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCompanies.fulfilled, (state, action) => {
                state.loading = false;
                if (!action.payload.data) {
                    action.payload = []
                }

                state.companies = action.payload.data;
                state.total = action.payload.total;
            })
            .addCase(fetchCompanies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Could not fetch companies';
            })

            // Create Company
            .addCase(createCompany.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCompany.fulfilled, (state, action) => {
                state.loading = false;
                if (!state.companies) {
                    state.companies = []
                }
                state.companies.push(action.payload.data)

            })
            .addCase(createCompany.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Could not create company';
            })

            // Update Company
            .addCase(updateCompany.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCompany.fulfilled, (state, action) => {
                state.loading = false;
                console.log(action.payload)
                const index = state.companies.findIndex(company => company.ID === action.payload.data.ID);
                if (index !== -1) {
                    state.companies[index] = action.payload.data;
                }
            })
            .addCase(updateCompany.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Could not update company';
            })

            // Delete Company
            .addCase(deleteCompany.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCompany.fulfilled, (state, action) => {
                state.loading = false;
                state.companies = state.companies.filter(company => company.ID !== action.payload);
            })
            .addCase(deleteCompany.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Could not delete company';
            });
    },
});

// Export the reducer
export default companySlice.reducer;