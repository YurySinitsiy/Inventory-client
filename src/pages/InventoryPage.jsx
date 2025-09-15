import { Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/tools/Loader';
import { useTranslation } from 'react-i18next';
import LinkBackTo from '../components/tools/LinkBackTo';
import InventoryInfoBlock from '../components/inventory/InventoryInfoBlock';
import InventoryForm from '../components/form/InventoryForm';
import { useUser } from '../components/context/UserContext';
import { useInventory } from '../components/context/InventoryContext';
import { useState, useEffect } from 'react';
import getInventory from '../components/services/inventories/getInventory';
import { useParams } from 'react-router-dom';

const InventoryPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id } = useParams();
  const { user, isLoading } = useUser();
  const { inventory, setInventory } = useInventory();
  const [invLoading, setInvLoading] = useState(true);

  useEffect(() => {
    const fetchInventory = async () => {
      setInvLoading(true);
      try {
        const data = await getInventory(id);
        setInventory(data);
      } catch (e) {
        console.error(e);
      } finally {
        setInvLoading(false);
      }
    };
    fetchInventory();
  }, [id]);

  const handleBackClick = () => {
    navigate(user?.role ? '/personal' : '/', { replace: true });
  };
  if (isLoading || invLoading) return <Loader />;

  return (
    <Container maxWidth='xl'>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
        <InventoryInfoBlock inventory={inventory}/>
        <LinkBackTo
          onClick={handleBackClick}
          text={t('inventories.back')}></LinkBackTo>
      </Box>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <InventoryForm inventory={inventory} user={user}/>
      </Box>
    </Container>
  );
};

export default InventoryPage;
