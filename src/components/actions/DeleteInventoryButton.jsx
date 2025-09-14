import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

const DeleteButton = ({ disabled, onClick}) => {
    const { t } = useTranslation();
  
  return (
    <Button
      variant='outlined'
      color='error'
      sx={{ my: 1 }}
      disabled={disabled}
      onClick={onClick}>
      {t('inventory.delete')}
    </Button>
  );
};

export default DeleteButton;
