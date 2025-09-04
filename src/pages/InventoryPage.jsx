import { useState, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import getUser from '../components/services/users/getUser';
import Loader from '../components/tools/Loader';
import { useTranslation } from 'react-i18next';
import getInventory from '../components/services/inventories/getInventory';
import LinkBackTo from '../components/tools/LinkBackTo';
import InventoryInfoBlock from '../components/inventory/InventoryInfoBlock';
import InventoryForm from '../components/form/InventoryForm';

const InventoryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [inventory, setInventory] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, invData] = await Promise.all([
          getUser(),
          getInventory(id),
        ]);
        if (userData) setUser(userData);
        if (invData) setInventory(invData);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (isLoading) return <Loader />;

  const handleBackClick = () => {
    navigate(user?.role ? '/personal' : '/', { replace: true });
  };

  return (
    <Container maxWidth='xl'>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <InventoryInfoBlock inventory={inventory} t={t} />
        <LinkBackTo
          onClick={handleBackClick}
          text={t('inventories.back')}></LinkBackTo>
      </Box>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <InventoryForm inventory={inventory} user={user} t={t} />
      </Box>
    </Container>
  );
};

export default InventoryPage;
