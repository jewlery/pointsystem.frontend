import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

export const fetchDevices = createAsyncThunk('devices/fetchDevices', async ({ page, limit, search }) => {
    const response = await axios.get('/devices', { params: { page, limit, search } });
    return response.data;
});

export const updateDevice = createAsyncThunk('devices/updateDevice', async ({ id, deviceData }) => {
    const response = await axios.put(`/devices/${id}`, deviceData);
    return response.data;
});

export const deleteDevice = createAsyncThunk('devices/deleteDevice', async (id) => {
    await axios.delete(`/devices/${id}`);
    return id;
});

const deviceSlice = createSlice({
    name: 'devices',
    initialState: {
        devices: [],
        total: 0,
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDevices.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchDevices.fulfilled, (state, action) => {
                state.loading = false;
                state.devices = action.payload.data || [];
                state.total = action.payload.total;
            })
            .addCase(fetchDevices.rejected, (state) => {
                state.loading = false;
            })
            .addCase(updateDevice.fulfilled, (state, action) => {
                const index = state.devices.findIndex((device) => device.ID === action.payload.ID);
                if (index !== -1) {
                    state.devices[index] = action.payload;
                }
            })
            .addCase(deleteDevice.fulfilled, (state, action) => {
                state.devices = state.devices.filter((device) => device.ID !== action.payload);
            });
    },
});

export default deviceSlice.reducer;