import { Box, Tab, Container, useTheme, useMediaQuery } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Title from '../components/tools/Title.jsx';
import { useState } from 'react';
import UserInventories from '../components/inventory/UserInventories.jsx';
import AccessWriteInventories from '../components/inventory/AccessWriteInventories.jsx';
import { useTranslation } from 'react-i18next';

const RenderCreatorPage = () => {
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
            </TabList>
          </Box>
          <TabPanel value='1'>
            <UserInventories t={t} />
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
