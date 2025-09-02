import { Container, Link } from '@mui/material';
import Title from '../components/tools/Title.jsx';
import { useTranslation } from 'react-i18next';
import RenderAllUsersInventories from '../components/inventory/AllUsersInventories.jsx';
import getUser from '../components/services/users/getUser.js';
import { useState, useEffect } from 'react';
import Loader from '../components/tools/Loader';
import redirectByRole from '../components/auth/redirectByRole';
import { useNavigate } from 'react-router-dom';

const RenderMainPage = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      setIsLoading(true);
      try {
        const userData = await getUser();
        if (!userData) return;
        redirectByRole(userData.role, navigate);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    checkUser();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <Container maxWidth='xl'>
      <Title variant='h4' sx={{ marginBlock: '30px', fontWeight: '700' }}>
        {t('inventories.all')}
      </Title>

      <RenderAllUsersInventories checkboxSelection={false} />
    </Container>
  );
};

export default RenderMainPage;
