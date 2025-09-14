import { Container, Button, Box } from '@mui/material';
import getUserById from '../components/services/users/getUserById';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/tools/Loader';
import Title from '../components/tools/Title';
import { useTranslation } from 'react-i18next';
import UserSalesforceBlock from '../components/integrations/salesforce/UserSalesforceBlock';
import { useNavigate } from 'react-router-dom';
import UserInfo from '../components/tools/UserInfo';
import UserOdooBlock from '../components/integrations/odoo/UserOdooBlock';
import { useUser } from '../components/context/UserContext';
const UserPage = () => {
  const { id } = useParams();
  const { user, isLoading } = useUser();
  const [userDataLoad, setUserDataLoad] = useState(false);
  const [userData, setUserData] = useState(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const fetchUserData = async (id) => {
    setUserDataLoad(true);
    try {
      const data = await  getUserById(id);
      setUserData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setUserDataLoad(false);
    }
  };

  useEffect(() => {
    if (id) fetchUserData(id);
  }, [id]);

  const isOwner = user?.id === userData?.id;
  if (isLoading || userDataLoad) return <Loader />;
  return (
    <Container maxWidth='md'>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}>
        <Title variant='h4' p={2}>
          {t('profile.info')}
        </Title>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
          }}>
          <Button variant='outlined' onClick={() => navigate(-1)}>
            {t('back')}
          </Button>
          <Button variant='outlined' onClick={() => navigate('/')}>
            {t('to.main')}
          </Button>
        </Box>
        {userData && <UserInfo user={userData} />}
        <Title variant='h4' p={1}>
          {t('profile.other.info')}
        </Title>
        {userData && <UserSalesforceBlock user={userData} isOwner={isOwner} />}
        {userData && <UserOdooBlock isOwner={isOwner} />}
      </Box>
    </Container>
  );
};

export default UserPage;
