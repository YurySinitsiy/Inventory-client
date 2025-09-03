import { Container } from '@mui/material';
import Title from '../components/tools/Title';
import { useTranslation } from 'react-i18next';
import RenderAllUsersInventories from '../components/inventory/AllUsersInventories';
import getUser from '../components/services/users/getUser';
import { useState, useEffect } from 'react';
import Loader from '../components/tools/Loader';
import RedirectByRole from '../components/auth/RedirectByRole';
import { useNavigate } from 'react-router-dom';

const RenderMainPage = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const checkUser = async () => {
    setIsLoading(true);
    try {
      await redirectUser();
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const redirectUser = async () => {
    const user = await getUser();
    if (!user) return;
    RedirectByRole(user.role, navigate);
  };

  useEffect(() => {
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
