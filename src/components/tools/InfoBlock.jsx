import { Card, Box } from '@mui/material';
import BlockLoader from './BlockLoader';

const InfoBlock = ({ isLoading, children }) => {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        p: 2,
        position: 'relative',
        width: '100%',
      }}>
      {isLoading && <BlockLoader />}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          alignItems: 'center',
          width: '100%',
          justifyContent: 'space-between',
          flexWrap: 'wrap'
        }}>
        {children}
      </Box>
    </Card>
  );
};

export default InfoBlock;
