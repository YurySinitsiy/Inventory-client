import { Typography, Button } from '@mui/material';
import getSalesforceId from '../../services/users/salesforce/getSalesforceId';
import handleSalesforceUnlink from '../../services/users/salesforce/handleSalesforceUnlink';
import { useState, useEffect } from 'react';
import Modal from '../../tools/Modal';
import SalesforceLinkForm from '../../form/SalesforceLinkForm';
import UserSalesforceInfo from './UserSalesforceInfo';
import { useTranslation } from 'react-i18next';
import InfoBlock from '../../tools/InfoBlock';
import { useSnackbar } from '../../context/SnackbarContext';

const UserSalesforceBlock = ({ user, isOwner }) => {
  const [unlinking, setUnlinking] = useState(false);
  const [salesforceId, setSalesforceId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { showSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const sfData = await getSalesforceId(user.id);
      setSalesforceId(sfData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user?.id]);
  const profileId = user?.id;

  const handleUnlink = async () => {
    setUnlinking(true);
    try {
      await handleSalesforceUnlink(profileId);
      setSalesforceId(null);
      showSnackbar(t('unlink.success'), 'success');
    } catch (error) {
      console.error(error);
      showSnackbar(t('unlink.error'), 'error');
    } finally {
      setUnlinking(false);
    }
  };

  const renderContent = () => {
    if (salesforceId) {
      return (
        <UserSalesforceInfo
          salesforceId={salesforceId}
          handleUnlink={handleUnlink}
          unlinking={unlinking}
        />
      );
    }

    if (isOwner) {
      return (
        <>
          <Button variant='outlined' onClick={() => setOpenModal(true)}>
            {t('account.add')}
          </Button>
          <Modal open={openModal} onClose={() => setOpenModal(false)}>
            <SalesforceLinkForm user={user} setSalesforceId={setSalesforceId}/>
          </Modal>
        </>
      );
    } else {
      return (
        <Typography color='textSecondary'>{t('sf.account.not')}</Typography>
      );
    }
  };

  return (
    <InfoBlock isLoading={isLoading}>
      <Typography variant='h6'>
        {' '}
        <b>{'Salesforce'} </b>
      </Typography>
      {renderContent()}
    </InfoBlock>
  );
};

export default UserSalesforceBlock;
