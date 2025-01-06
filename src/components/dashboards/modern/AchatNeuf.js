import React from 'react';
import Chart from 'react-apexcharts';
import {useTheme} from '@mui/material/styles';
import {Grid, Stack, Typography, Avatar, Box} from '@mui/material';
import {IconArrowUpLeft} from '@tabler/icons';

import DashboardCard from '../../shared/DashboardCard';
import icon8 from "../../../assets/images/svgs/gold.svg";

const topcard =
    {
        href: '/apps/contacts',
        icon: icon8,
        title: 'Chèque',
        digits: '48K DH',
        bgcolor: 'warning',
    };
const AchatNeuf = () => {
    // chart color
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const primarylight = theme.palette.primary.light;
    const successlight = theme.palette.success.light;

    // chart
    const optionscolumnchart = {
        chart: {
            type: 'donut',
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: '#adb0bb',
            toolbar: {
                show: false,
            },
            height: 155,
        },
        colors: [primary, primarylight, '#F9F9FD'],
        plotOptions: {
            pie: {
                startAngle: 0,
                endAngle: 360,
                donut: {
                    size: '75%',
                    background: 'transparent',
                },
            },
        },
        tooltip: {
            enabled: false,
        },
        stroke: {
            show: false,
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        responsive: [
            {
                breakpoint: 991,
                options: {
                    chart: {
                        width: 120,
                    },
                },
            },
        ],
    };
    const seriescolumnchart = [38, 40, 25];

    return (
        <DashboardCard title="Achat or neuf">
            <Grid container spacing={3}>
                {/* column */}
                <Grid item xs={7} sm={7}>
                    <Box  alignItems="center">
                        <Typography variant="h3" fontWeight="700">
                            36,358 MAD
                        </Typography>
                    </Box>
                </Grid>
                {/* column */}
                <Grid item xs={5} sm={5}>
                    <Stack direction="row" alignItems="center" justifyContent={"center"}>
                        <img src={topcard.icon} alt={topcard.icon} width="100"/>
                    </Stack>
                </Grid>
            </Grid>
        </DashboardCard>
    );
};

export default AchatNeuf;
