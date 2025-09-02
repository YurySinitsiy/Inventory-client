import FastRewindIcon from '@mui/icons-material/FastRewind';
import { Link } from '@mui/material';

const LinkBackTo = ({onClick, text}) => {
  return (
    <Link
      component='button'
      variant='body2'
      onClick={onClick}
      sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      <FastRewindIcon />
      {text}
    </Link>
  );
};

export default LinkBackTo;
