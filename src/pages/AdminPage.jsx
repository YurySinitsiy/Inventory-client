import { Container } from '@mui/material';
import Title from '../components/tools/Title.jsx';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import UserInventories from '../components/inventory/UserInventories.jsx';
import { Box, Tab, useTheme, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import AllUsersAdminActions from '../components/table/users/AllUsersAdminActions.jsx';
import AllUsersInventories from '../components/inventory/AllUsersInventories.jsx';
import { useTranslation } from 'react-i18next';

const renderAdminPage = () => {
  const [value, setValue] = useState('1');
  const { t } = useTranslation();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container maxWidth='xl'>
      <Title variant='h4' sx={{ marginBlock: '30px', fontWeight: '700' }}>
        {t('profiles.my')}
      </Title>
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

export default renderAdminPage;
