import { Container } from '@mui/material';
import Title from '../components/tools/Title.jsx';
import { useTranslation } from 'react-i18next';
import getColumns from '../components/table/InventoriesColumns.jsx';
import RenderAllUsersInventories from '../components/inventory/AllUsersInventories.jsx';

const RenderMainPage = () => {
  const { t } = useTranslation();
  const columns = getColumns();
  return (
    <Container maxWidth='xl'>
      <Title variant='h4' sx={{ marginBlock: '30px', fontWeight: '700' }}>
        {t('inventories.all')}
      </Title>
      <RenderAllUsersInventories extraColumns={columns} />
    </Container>
  );
};

export default RenderMainPage;
