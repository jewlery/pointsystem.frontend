import React from 'react';
import {Box, Typography} from '@mui/material';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import TpeTableList from "../../components/apps/tpe/TableList/TpeTableList";

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Sample Page',
  },
];

const TpePage = () => {
  return (

      <PageContainer title="Search Table" description="this is Search Table page">
          {/* breadcrumb */}
          <Breadcrumb title="Liste des tpe"  />
          {/* end breadcrumb */}
          <Box>
              <TpeTableList />
          </Box>
      </PageContainer>
  );
};

export default TpePage;
