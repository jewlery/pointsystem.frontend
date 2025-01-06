import React from 'react';
import {Box, Typography} from '@mui/material';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import BenifTableList from "../../components/apps/benif/TableList/BenifTableList";

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Sample Page',
  },
];

const BenifPage = () => {
  return (

      <PageContainer title="Search Table" description="this is Search Table page">
          {/* breadcrumb */}
          <Breadcrumb title="Liste des benif"  />
          {/* end breadcrumb */}
          <Box>
              <BenifTableList />
          </Box>
      </PageContainer>
  );
};

export default BenifPage;
