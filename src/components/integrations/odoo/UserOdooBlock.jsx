import { Typography, Button, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import UserOdooInfo from './UserOdooInfo';
import InfoBlock from '../../tools/InfoBlock';
import createToken from '../../services/users/odoo/createToken';
import getToken from '../../services/users/odoo/getToken';

const UserOdooBlock = ({ isOwner }) => {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const fetchToken = async () => {
    setIsLoading(true);
    try {
      const data = await getToken();
      if (data) setToken(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateToken = async () => {
    setIsLoading(true);
    try {
      const data = await createToken();
      setToken(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOwner) fetchToken();
  }, [isOwner]);

  const renderContent = () => {
    if (!isOwner) {
      return (
        <Typography color='textSecondary'>{t('token.view.info')}</Typography>
      );
    }

    if (token) {
      return (
        <>
          <UserOdooInfo token={token} />
          <Typography sx={{ mt: 1, mb: 2 }} color='text.secondary'>
            {t('odoo.link')}
            <a
              href='https://my-odoo-app.odoo.com/'
              target='_blank'
              rel='noopener noreferrer'>
              https://my-odoo-app.odoo.com/
            </a>
            {t('odoo.link.paste')}
          </Typography>
        </>
      );
    }

    return (
      <Button variant='outlined' onClick={generateToken}>
        {t('token.generate')}
      </Button>
    );
  };

  return (
    <InfoBlock isLoading={isLoading}>
      <Typography variant='h6'>
        <b>Odoo</b>
      </Typography>
      {renderContent()}
    </InfoBlock>
  );
};

export default UserOdooBlock;
