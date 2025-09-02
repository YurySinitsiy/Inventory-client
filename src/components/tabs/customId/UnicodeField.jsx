import { Box, IconButton, TextField, Popover } from '@mui/material';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { useState } from 'react';

const UnicodeField = ({ value, onChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenPicker = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClosePicker = () => setAnchorEl(null);

  const handleSelectEmoji = (emoji) => {
    // emoji.native содержит реальный Unicode символ
    onChange(value + emoji.native);
  };

  return (
    <Box sx={{ display: 'flex', flex: 1, gap: 1 }}>
      <TextField
        size='medium'
        variant='outlined'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        fullWidth
      />
      <IconButton onClick={handleOpenPicker}>
        <InsertEmoticonIcon />
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClosePicker}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
        <Picker data={data} onEmojiSelect={handleSelectEmoji} />
      </Popover>
    </Box>
  );
};

export default UnicodeField;
