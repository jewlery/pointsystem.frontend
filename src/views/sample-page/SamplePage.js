import React from 'react';
import {Box, Typography} from '@mui/material';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import CreditTableList from "../../components/apps/credit/TableList/CreditTableList";

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Sample Page',
  },
];

const SamplePage = () => {
  return (

      <PageContainer title="Search Table" description="this is Search Table page">
          {/* breadcrumb */}
          <Breadcrumb title="Liste des crédits"  />
          {/* end breadcrumb */}
          <Box>
              <CreditTableList />
          </Box>
      </PageContainer>
  );
};

export default SamplePage;
