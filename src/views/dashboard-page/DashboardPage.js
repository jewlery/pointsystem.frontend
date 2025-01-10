import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Box, Button, Grid, Stack} from '@mui/material';
import {CalendarToday, Event} from '@mui/icons-material';
import moment from 'moment';

// Component Imports
import TopCards from '../../components/dashboards/modern/TopCards';
import LuiseTeen from '../../components/dashboards/modern/LuiseTeen';
import WeeklyStats from '../../components/dashboards/modern/WeeklyStats';
import EmployeeSalary from '../../components/dashboards/modern/EmployeeSalary';
import TopPerformers from '../../components/dashboards/modern/TopPerformers';
import FilterDashboardDialog from '../../components/modals/dashboard/FilterDashboardDialog/FilterDashboardDialog';

// Import Redux actions
import {fetchDashboardData} from 'src/store/apps/dashboard/dashboardSlice';
import Social from "../../components/dashboards/modern/Social";

const DashboardPage = () => {
    const dispatch = useDispatch();
    const dashboardData = useSelector((state) => state.dashboardReducer.data);
    const loading = useSelector((state) => state.dashboardReducer.loading);
    const error = useSelector((state) => state.dashboardReducer.error);

    // State for managing dialog and selected date range
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedRange, setSelectedRange] = useState({
        startDate: moment().startOf('month').startOf('day').toDate(), // Default to undefined
        endDate: moment().endOf('month').startOf('day').toDate(),   // Default to undefined
        key: 'selection',
    });

    // Effect to fetch dashboard data when component mounts
    useEffect(() => {
        if (selectedRange.startDate && selectedRange.endDate) {
            const startdate = moment(selectedRange.startDate).utc().add(1, 'day').startOf('day').toISOString();
            const endDate = moment(selectedRange.endDate).utc().add(1, 'day').endOf('day').toISOString();
            dispatch(fetchDashboardData({from: startdate, to: endDate}));
        }
    }, [dispatch, selectedRange]);

    // Handlers for dialog open/close
    const handleOpenDialog = () => setIsDialogOpen(true);
    const handleCloseDialog = () => setIsDialogOpen(false);

    // Apply filter with selected date range
    const handleApplyFilter = (range) => {
        setSelectedRange(range);
    };

    // Determine button text and styles based on date selection
    const buttonText = selectedRange.startDate && selectedRange.endDate
        ? `Période sélectionnée (${moment(selectedRange.startDate).format('YYYY-MM-DD')} - ${moment(selectedRange.endDate).format('YYYY-MM-DD')})`
        : 'Choisir une période';

    const buttonStyles = {
        textTransform: 'none',
        fontSize: '16px',
        padding: '8px 16px',
        backgroundColor: selectedRange.startDate && selectedRange.endDate ? '#f0f0f0' : 'transparent',
        color: selectedRange.startDate && selectedRange.endDate ? '#333' : 'primary.main',
        borderColor: selectedRange.startDate && selectedRange.endDate ? '#ccc' : 'primary.main',
    };

    return (
        <Box>
            <Grid container spacing={3}>
                {/* Main Button for Date Filter */}
                <Grid item xs={12}>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleOpenDialog}
                        startIcon={selectedRange.startDate && selectedRange.endDate ? <Event/> : <CalendarToday/>}
                        sx={buttonStyles}
                    >
                        {buttonText}
                    </Button>

                    {/* Dialog for Date Filter */}
                    <FilterDashboardDialog
                        open={isDialogOpen}
                        onClose={handleCloseDialog}
                        onApply={handleApplyFilter}
                    />
                </Grid>

                {/* Display loading and error states */}
                {loading && (
                    <Grid item xs={12}>
                        <p>Loading...</p>
                    </Grid>
                )}
                {error && (
                    <Grid item xs={12}>
                        <p>Error: {error}</p>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};

export default DashboardPage;
