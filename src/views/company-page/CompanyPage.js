import React from 'react';
import { Box, Typography } from '@mui/material';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import CompaniesTableList from '../../components/apps/company/TableList/CompaniesTableList';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Companies',
  },
];

const CompanyPage = () => {
  return (
    <PageContainer title="Companies" description="this is Companies page">
      {/* breadcrumb */}
      <Breadcrumb title="List of Companies" items={BCrumb} />
      {/* end breadcrumb */}
      <Box>
        <CompaniesTableList />
      </Box>
    </PageContainer>
  );
};

export default CompanyPage;