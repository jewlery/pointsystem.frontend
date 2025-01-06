import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Box } from '@mui/material';
import DashboardCard from '../../shared/DashboardCard';
import { IconGridDots } from '@tabler/icons';
import Icon13 from '../../../assets/images/svgs/LoanIcon.svg';


const WeeklyStats = ({data}) => {
    
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = theme.palette.primary.light;
  const error = theme.palette.error.main;
  const errorlight = theme.palette.error.light;
  const secondary = theme.palette.success.main;
  const secondarylight = theme.palette.success.light;

  const stats = [
    {
      title: 'Alpha Avance',
      subtitle: data['credit_alpha'] + " DH",
      color: primary,
      lightcolor: primarylight,
      icon: <IconGridDots width={18} />,
    },
    {
      title: 'Beta Avance',
      subtitle: data['credit_haj'] + " DH",
      color: secondary,
      lightcolor: secondarylight,
      icon: <IconGridDots width={18} />,
    },
    {
      title: 'Client avance',
      subtitle: data['credit_client'] + " DH",
      color: theme.palette.warning.main,
      lightcolor: theme.palette.warning.light,
      icon: <IconGridDots width={18} />,
    }
  ];

  return (
    <DashboardCard title="Credit de patron" subtitle="credit de alpha et de beta">
      <>
        <Stack spacing={3} mt={3}>
          {stats.map((stat, i) => (
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              alignItems="center"
              key={i}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar
                  variant="rounded"
                  sx={{ bgcolor: stat.lightcolor, color: stat.color, width: 40, height: 40 }}
                >
                  {stat.icon}
                </Avatar>
                <Box>
                  <Typography variant="h6" mb="4px">
                    {stat.title}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    <b>{stat.subtitle}</b>
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </>
    </DashboardCard>
  );
};

export default WeeklyStats;
