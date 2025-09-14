import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import BaseForm from './BaseForm';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import apiFetch from '../services/apiFetch';
import { Typography } from '@mui/material';
const SalesforceLinkForm = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  const [isSubmiting, setIsSubmiting] = useState(false);

  const fields = [
    { name: 'name', label: t('auth.name'), type: 'text' },
    { name: 'surname', label: t('auth.surname'), type: 'text' },
    { name: 'phone', label: t('auth.phone'), type: 'text' },
    { name: 'accountName', label: t('account.name'), type: 'text' },
    { name: 'email', label: t('auth.email'), type: 'email' },
  ];

  const validationSchema = Yup.object({
    name: Yup.string().required(t('required')),
    surname: Yup.string().required(t('required')),
    phone: Yup.string().required(t('required')),
    accountName: Yup.string().required(t('required')),
    email: Yup.string().email(t('auth.email.invalid')).required(t('required')),
  });

  const initialValues = {
    email: '',
    name: '',
    surname: '',
    phone: '',
    accountName: '',
  };

  const handleSubmit = async (values) => {
    const { oauthUrl } = await apiFetch('/api/salesforce/start', {
      method: 'POST',
      body: JSON.stringify({ profileId: id, profileData: values }),
    });
    setIsSubmiting(true);
    window.location.href = oauthUrl;
  };

  if (isSubmiting) return <Typography>Redirecting....</Typography>;
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
