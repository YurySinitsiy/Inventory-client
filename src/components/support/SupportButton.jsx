import { Fab, Tooltip } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SupportModal from './SupportModal';
import { useState } from 'react';
const SupportButton = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Tooltip title='Справка'>
        <Fab
          color='primary'
          onClick={() => setOpen(true)}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 1300,
          }}>
          <HelpOutlineIcon />
        </Fab>
      </Tooltip>
      <SupportModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default SupportButton;
