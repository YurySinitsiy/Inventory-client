import { Card, CardContent, Typography} from '@mui/material';
import { useTranslation } from 'react-i18next';

const UserInfo = ({ user }) => {
  const { t } = useTranslation();

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        p: 1,
        width: '100%',
      }}>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          alignItems: 'flex-start',
        }}>
        {Object.entries({
          [t('auth.name')]: user?.name,
          [t('auth.surname')]: user?.surname,
          [t('auth.email')]: user?.email,
        }).map(([label, value]) => (
          <Typography key={label} variant='h6'>
            <b>{label}:</b> {value}
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
};

export default UserInfo;
