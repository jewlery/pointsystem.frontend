import React from 'react';
import { Box, Typography } from '@mui/material';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import WorkDayTableList from '../../components/apps/workday/TableList/WorkDayTableList';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'WorkDay',
  },
];

const WorkDayPage = () => {
  return (
    <PageContainer title="WorkDay" description="this is WorkDay page">
      {/* breadcrumb */}
      <Breadcrumb title="List of WorkDays" items={BCrumb} />
      {/* end breadcrumb */}
      <Box>
        <WorkDayTableList />
      </Box>
    </PageContainer>
  );
};

export default WorkDayPage;