import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

export const fetchAttendanceLogs = createAsyncThunk('attendance/fetchAttendanceLogs', async ({ serial_number, page, limit, search, filters }) => {
    const response = await axios.get(`/attendance-logs`, { params: { serial_number, limit, page, search, ...filters } });
    return response.data;
});

const attendanceSlice = createSlice({
    name: 'attendance',
    initialState: {
        logs: [],
        total: 0,
        page: 1,
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAttendanceLogs.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAttendanceLogs.fulfilled, (state, action) => {
                state.loading = false;
                state.logs = action.payload.data;
                state.total = action.payload.total;
                state.page = action.payload.page;
            })
            .addCase(fetchAttendanceLogs.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default attendanceSlice.reducer;