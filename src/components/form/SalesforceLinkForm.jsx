import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import BaseForm from './BaseForm';
import * as Yup from 'yup';
import apiFetch from '../services/apiFetch';
import { useSnackbar } from '../context/SnackbarContext';
const SalesforceLinkForm = ({ user, setSalesforceId }) => {
  const { t } = useTranslation();
  const { showSnackbar } = useSnackbar();
  const fields = [
    { name: 'accountName', label: t('account.name'), type: 'text' },
    { name: 'phone', label: t('auth.phone'), type: 'text' },
  ];

  const validationSchema = Yup.object({
    accountName: Yup.string().required(t('required')),
    phone: Yup.string().required(t('required')),
  });

  const initialValues = {
    accountName: '',
    phone: '',
  };

  const dataToSend = (values) => {
    return {
      ...user,
      ...values,
    };
  };

  const handleSubmit = async (values) => {
    try {
      const salesforceId = await apiFetch('/api/salesforce/start', {
        method: 'POST',
        body: JSON.stringify(dataToSend(values)),
      });
      setSalesforceId(salesforceId);
      showSnackbar('connection.success', 'success');
    } catch (error) {
      showSnackbar(error, 'error');
      console.error(error);
    } finally {
    }
  };

  return (
    <BaseForm
      title={t('sf.account.add')}
      submitText={t('sf.account.add')}
      initialValues={initialValues}
      validationSchema={validationSchema}
      fields={fields}
      onSubmit={handleSubmit}
    />
  );
};

export default SalesforceLinkForm;
