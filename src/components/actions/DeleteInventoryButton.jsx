import { Button } from '@mui/material';

const DeleteButton = ({ disabled, onClick, t }) => {
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
