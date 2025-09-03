import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Tooltip, IconButton, InputAdornment } from '@mui/material';
const Helper = ({ value }) => {
  const helper = value ? (
    <InputAdornment position='end'>
      <Tooltip title={value}>
        <IconButton size='small'>
          <InfoOutlinedIcon fontSize='small' />
        </IconButton>
      </Tooltip>
    </InputAdornment>
  ) : null;

  return helper;
};

export default Helper;
