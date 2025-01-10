import React from 'react';
import { Box, Typography } from '@mui/material';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import EmployeesTableList from '../../components/apps/employees/TableList/EmployeeTableList';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Employees',
  },
];

const EmployeesPage = () => {
  return (
    <PageContainer title="Employees" description="this is Employees page">
      {/* breadcrumb */}
      <Breadcrumb title="List of Employees" items={BCrumb} />
      {/* end breadcrumb */}
      <Box>
        <EmployeesTableList />
      </Box>
    </PageContainer>
  );
};

export default EmployeesPage;