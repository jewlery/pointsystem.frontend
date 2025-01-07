import React from 'react';
import { Box, Typography } from '@mui/material';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import UsersTableList from '../../components/apps/users/TableList/UsersTableList';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Users',
  },
];

const UsersPage = () => {
  return (
    <PageContainer title="Users" description="this is Users page">
      {/* breadcrumb */}
      <Breadcrumb title="List of Users" items={BCrumb} />
      {/* end breadcrumb */}
      <Box>
        <UsersTableList />
      </Box>
    </PageContainer>
  );
};

export default UsersPage;