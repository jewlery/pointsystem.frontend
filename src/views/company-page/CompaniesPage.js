import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import CompaniesTableList from '../../components/apps/company/TableList/CompaniesTableList'; // Assuming you have a CompaniesTableList component
import CreateCompanyDialog from '../../components/modals/company/CreateCompanyDialog/CreateCompanyDialog'; // Assuming you have a CreateCompanyDialog component
import { IconPlus } from '@tabler/icons'; // Import the IconPlus for consistency

const CompaniesPage = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleOpenDialog = () => setIsDialogOpen(true);
    const handleCloseDialog = () => setIsDialogOpen(false);

    // Breadcrumb items
    const BCrumb = [
        {
            to: '/',
            title: 'Home',
        },
        {
            title: 'Companies',
        },
    ];

    return (
        <PageContainer title="Companies" description="this is Companies page">
            {/* Breadcrumb */}
            <Breadcrumb title="List of Companies" items={BCrumb} />

            {/* Create Company Button */}
            <Box sx={{ mb: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOpenDialog}
                    startIcon={<IconPlus />}
                    sx={{
                        width: { xs: 'auto', md: '175px' },
                        '& .MuiButton-startIcon': {
                            marginRight: { xs: 0, sm: 0, md: '8px' },
                        },
                    }}
                >
                    <Box
                        component="span"
                        sx={{
                            display: { xs: 'none', md: 'inline' },
                            whiteSpace: 'nowrap',
                        }}
                    >
                        Create Company
                    </Box>
                </Button>
            </Box>

            {/* Companies Table List */}
            <Box>
                <CompaniesTableList />
            </Box>

            {/* Create Company Dialog */}
            <CreateCompanyDialog open={isDialogOpen} onClose={handleCloseDialog} />
        </PageContainer>
    );
};

export default CompaniesPage;