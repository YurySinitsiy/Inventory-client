import AppBox from '../components/tools/AppBox.jsx';
import { Box, Typography, Tab, Container } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Title from '../components/tools/Title.jsx';
import { useEffect, useState } from 'react';
import AppBar from '../components/tools/AppBar.jsx';
import { useUserData } from '../components/services/hooks/useUserData.jsx';
import RenderUserInventory from '../components/inventory/RenderUserInventory.jsx';
import checkUserRole from '../components/auth/CheckUserRole.jsx';
import Loader from '../components/tools/Loader.jsx';
import AccessWriteInventories from '../components/inventory/AccessWriteInventories.jsx';
import i18n from '../components/tools/i18n.js';
import { useTranslation } from 'react-i18next';

const RenderCreatorPage = () => {
  const [value, setValue] = useState('1');
  const { userName, user } = useUserData('');
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (!user?.id) return; // если пользователя нет, выходим

    const fetchUserRole = async () => {
      setIsLoading(true);
      try {
        const role = await checkUserRole(user.id);
        setUserRole(role);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserRole();
  }, [user?.id]);

  if (!user || isLoading) return <Loader />;
  return (
    <AppBox>
      <AppBar userName={userName} path={'logout'} />
      <Container maxWidth='xl'>
        <Title variant='h4' sx={{ marginBlock: '30px', fontWeight: '700' }}>
          {t('profiles.my')}
        </Title>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label='inventories tabs'>
                <Tab label={t('invenotories.my')} value='1' />
                <Tab label={t('invenotories.users')} value='2' />
              </TabList>
            </Box>
            <TabPanel value='1'>
              <RenderUserInventory />
            </TabPanel>
            <TabPanel value='2'>
              <AccessWriteInventories />
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
    </AppBox>
  );
};

export default RenderCreatorPage;
