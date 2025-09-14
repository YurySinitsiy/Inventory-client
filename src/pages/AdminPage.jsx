import { Container } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import UserInventories from '../components/inventory/UserInventories';
import { Box, Tab, useTheme, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import AllUsersAdminActions from '../components/table/users/AllUsersAdminActions';
import AllUsersInventories from '../components/inventory/AllUsersInventories';
import { useTranslation } from 'react-i18next';
import LinkToProfile from '../components/tools/LinkToProfile';
import Loader from '../components/tools/Loader';
import { useUser } from '../components/context/UserContext';

const AdminPage = () => {
  const [value, setValue] = useState('1');
  const { user, isLoading } = useUser();
  const { t } = useTranslation();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const userId = user?.id;
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
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
              <Tab label={t('users.all')} value='3' />
            </TabList>
          </Box>
          <TabPanel value='1'>
            <UserInventories t={t} />
          </TabPanel>
          <TabPanel value='2'>
            <AllUsersInventories isAdmin={true} t={t} />
          </TabPanel>
          <TabPanel value='3'>
            <AllUsersAdminActions t={t} />
          </TabPanel>
        </TabContext>
      </Box>
    </Container>
  );
};

export default AdminPage;
