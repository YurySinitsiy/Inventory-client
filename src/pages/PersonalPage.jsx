import { Box, Tab, Container, useTheme, useMediaQuery } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useState, useEffect } from 'react';
import UserInventories from '../components/inventory/UserInventories.jsx';
import AccessWriteInventories from '../components/inventory/AccessWriteInventories.jsx';
import { useTranslation } from 'react-i18next';
import LinkToProfile from '../components/tools/LinkToProfile';
import Loader from '../components/tools/Loader';
import { useUser } from '../components/context/UserContext.jsx';

const RenderCreatorPage = () => {
  const [value, setValue] = useState('1');
  const { t } = useTranslation();
  const { user, isLoading } = useUser();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  const userId = user?.id;
  if (isLoading) return <Loader />;

  return (
    <Container maxWidth='xl'>
      <LinkToProfile userId={userId} />

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList
              onChange={handleChange}
              aria-label='inventories tabs'
              variant={isSmall ? 'scrollable' : 'standard'}
              scrollButtons={isSmall ? 'auto' : false}
              allowScrollButtonsMobile>
              <Tab label={t('invenotories.my')} value='1' />
              <Tab label={t('invenotories.users')} value='2' />
            </TabList>
          </Box>
          <TabPanel value='1'>
            <UserInventories/>
          </TabPanel>
          <TabPanel value='2'>
            <AccessWriteInventories />
          </TabPanel>
        </TabContext>
      </Box>
    </Container>
  );
};

export default RenderCreatorPage;
