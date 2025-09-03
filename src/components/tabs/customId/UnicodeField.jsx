import { Box, IconButton, TextField, Popover } from '@mui/material';
import EmojiPicker from 'emoji-picker-react';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { useState } from 'react';

const UnicodeField = ({ value, onChange, errors, touched, index }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenPicker = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClosePicker = () => setAnchorEl(null);

  const handleSelectEmoji = (emojiData) => {
    onChange(value + emojiData.emoji);
  };

  const valueError =
    touched.customIds?.[index]?.value && errors.customIds?.[index]?.value;

  return (
    <Box sx={{ display: 'flex', flex: 1, gap: 1 }}>
      <TextField
        size='medium'
        variant='outlined'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        fullWidth
        error={Boolean(valueError)}
        helperText={valueError || ''}
      />
      <IconButton onClick={handleOpenPicker}>
        <InsertEmoticonIcon />
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClosePicker}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
        <EmojiPicker onEmojiClick={handleSelectEmoji} />
      </Popover>
    </Box>
  );
};

export default UnicodeField;
