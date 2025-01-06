import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';

import DashboardWidgetCard from '../../shared/DashboardWidgetCard';

const EmployeeSalary = ({data}) => {
    // chart color
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const primarylight = theme.palette.grey[100];

    // chart
    const optionscolumnchart = {
        chart: {
            type: 'bar',
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: '#adb0bb',
            toolbar: {
                show: false,
            },
            height: 280,
        },
        colors: [primarylight, primarylight, primary, primary],
        plotOptions: {
            bar: {
                borderRadius: 4,
                columnWidth: '45%',
                distributed: true,
                endingShape: 'rounded',
            },
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        grid: {
            yaxis: {
                lines: {
                    show: false,
                },
            },
        },
        xaxis: {
            categories: data['turnover_by_vendor'][0],
            axisBorder: {
                show: false,
            },
        },
        yaxis: {
            labels: {
                show: false,
            },
        },
        tooltip: {
            theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
        },
    };
    const seriescolumnchart = [
        {
            name: '',
            data: data['turnover_by_vendor'][1],
        },
    ];

    return (
        <DashboardWidgetCard
            title="Employee Chiffre d'Affaire"
            subtitle="par Employee"
        >
            <>
                <Chart options={optionscolumnchart} series={seriescolumnchart} type="bar" height="280px" />
            </>
        </DashboardWidgetCard>
    );
};

export default EmployeeSalary;
