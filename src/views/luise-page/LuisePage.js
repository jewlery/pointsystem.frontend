import React from 'react';
import {Box, Typography} from '@mui/material';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import LuiseTableList from "../../components/apps/luise/TableList/LuiseTableList";

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Sample Page',
  },
];

const LuisePage = () => {
  return (

      <PageContainer title="Search Table" description="this is Search Table page">
          {/* breadcrumb */}
          <Breadcrumb title="Liste des luise"  />
          {/* end breadcrumb */}
          <Box>
              <LuiseTableList />
          </Box>
      </PageContainer>
  );
};

export default LuisePage;
