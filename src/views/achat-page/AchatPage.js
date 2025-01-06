import React from 'react';
import {Box, Typography} from '@mui/material';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import AchatTableList from "../../components/apps/achat/TableList/AchatTableList";

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Sample Page',
  },
];

const AchatPage = () => {
  return (

      <PageContainer title="Search Table" description="this is Search Table page">
          {/* breadcrumb */}
          <Breadcrumb title="Liste des achats"  />
          {/* end breadcrumb */}
          <Box>
              <AchatTableList />
          </Box>
      </PageContainer>
  );
};

export default AchatPage;
