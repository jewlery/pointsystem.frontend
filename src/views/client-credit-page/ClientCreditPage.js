import React from 'react';
import {Box, Typography} from '@mui/material';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import ClientCreditTableList from "../../components/apps/client-credit/TableList/ClientCreditTableList";

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Sample Page',
  },
];

const ClientCreditPage = () => {
  return (

      <PageContainer title="Search Table" description="this is Search Table page">
          {/* breadcrumb */}
          <Breadcrumb title="Liste des crédits client"  />
          {/* end breadcrumb */}
          <Box>
              <ClientCreditTableList />
          </Box>
      </PageContainer>
  );
};

export default ClientCreditPage;
