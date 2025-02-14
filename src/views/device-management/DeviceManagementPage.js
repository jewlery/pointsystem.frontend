import React from 'react';
import { Box, Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DeviceTableList from 'src/components/apps/device/DeviceTableList';

const DeviceManagementPage = () => {
    return (
        <PageContainer title="Device Management" description="Manage your devices here">
            <Box>
                <Typography variant="h4" gutterBottom>
                    Device Management
                </Typography>
                <DeviceTableList />
            </Box>
        </PageContainer>
    );
};

export default DeviceManagementPage;