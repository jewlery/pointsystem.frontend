import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

// API URL for the Dashboard resource
const API_URL = '/api/dashboard';

// Async thunk to fetch dashboard data
export const fetchDashboardData = createAsyncThunk(
    'dashboard/fetchDashboardData',
    async (dateRange, { rejectWithValue }) => {
        try {
            const response = await axios.get(API_URL, {
                params: { from: dateRange.from, to: dateRange.to },
            });
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue(error.message);
        }
    }
);

// Initial state
const initialState = {
    data: {
        capital_vendu: 0.00,
        stock_vendu: 0.00,
        capital_benefit: 0.00,
        turnover: 0.00,
        benefit: 0.00,
        turnover_by_vendor: [['anas', 'ather', 'karima', 'ismail'], [0,0,0,0]],
        expenses: 0.00,
        credit: 0.00,
        credit_alpha: 0.00,
        credit_haj: 0.00,
        tpe: 0.00,
        achat_chdaya_total: 0.00,
        achat_chdaya_weight: 0.00,
        achat_neuf_total: 0.00,
        achat_neuf_weight: 0.00,
        cheque: 0.00,
        luise_total: 0.00,
    },
    loading: false,
    error: null,
};

// Slice
const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        // Example of a synchronous reducer
        resetDashboardData(state) {
            state.data = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDashboardData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchDashboardData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// Exporting actions and reducer
export const { resetDashboardData } = dashboardSlice.actions;
export default dashboardSlice.reducer;
