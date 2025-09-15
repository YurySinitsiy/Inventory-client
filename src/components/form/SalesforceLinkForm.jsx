import { useTranslation } from 'react-i18next';
import handleSalesforceLink from '../services/users/salesforce/handleSalesforceLink';
import BaseForm from './BaseForm';
import * as Yup from 'yup';
import apiFetch from '../services/apiFetch';
import { useSnackbar } from '../context/SnackbarContext';
const SalesforceLinkForm = ({ user, setSfData }) => {
  const { t } = useTranslation();
  const { showSnackbar } = useSnackbar();
  const fields = [
    { name: 'accountName', label: t('account.name'), type: 'text' },
    {
      name: 'phone',
      label: t('auth.phone'),
      type: 'text',
      helperText: t('phone.format'),
    },
  ];

  const validationSchema = Yup.object({
    accountName: Yup.string().required(t('required')),
    phone: Yup.string()
      .required(t('required'))
      .matches(/^(\+?\d{1,3}[- ]?)?\d{10,14}$/, t('invalid.phone')),
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
      const sfUserData = await handleSalesforceLink(dataToSend(values));
      setSfData(sfUserData);
      showSnackbar(t('connection.success'), 'success');
    } catch (error) {
      showSnackbar(error, 'error');
      console.error(error);
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
