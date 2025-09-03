import { useState, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import getUser from '../components/services/users/getUser.js';
import Loader from '../components/tools/Loader';
import { useTranslation } from 'react-i18next';
import getInventory from '../components/services/inventories/getInventory.js';
import LinkBackTo from '../components/tools/LinkBackTo.jsx';
import InventoryInfoBlock from '../components/inventory/InventoryInfoBlock.jsx';
import InventoryForm from '../components/form/InventoryForm.jsx';
const InventoryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [inventory, setInventory] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [invLoading, setInvLoading] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      setIsLoading(true);
      try {
        const userData = await getUser();
        if (!userData) return;
        setUser(userData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    checkUser();
  }, []);

  useEffect(() => {
    const fetchInventory = async () => {
      setInvLoading(true);
      if (!id) return;
      try {
        const data = await getInventory(id);
        setInventory(data);
      } catch (err) {
        console.error(err.message);
      } finally {
        setInvLoading(false);
      }
    };
    fetchInventory();
  }, [id]);

  if (invLoading || isLoading) return <Loader />;

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
        <InventoryInfoBlock inventory={inventory} />
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
