import BaseForm from './BaseForm';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useInventory } from '../context/InventoryContext';
import sendToSupport from '../services/users/sendToSupport';
import { useSnackbar } from '../context/SnackbarContext';

const SupportForm = ({ onClose }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const { inventory } = useInventory();
  const { showSnackbar } = useSnackbar();

  let inventoryTitle = null;
  const isInventory = location.pathname.startsWith('/inventory');
  if (isInventory) {
    inventoryTitle = inventory.title;
  }

  const fields = [
    { name: 'message', label: t('message'), type: 'multiline' },
    {
      name: 'priority',
      label: t('priority'),
      type: 'select',
      options: [
        { value: 'High', label: t('high') },
        { value: 'Medium', label: t('medium') },
        { value: 'Low', label: t('low') },
      ],
    },
  ];

  const initialValues = {
    message: '',
    priority: '',
  };

  const validationSchema = Yup.object({
    message: Yup.string().required(t('required')),
    priority: Yup.string().required(t('required')),
  });

  const getDataToSend = (values) => {
    return {
      link: window.location.href,
      ...(inventoryTitle ? { inventoryTitle } : {}),
      ...values,
    };
  };

  const onSubmit = async (values) => {
    try {
      const payload = getDataToSend(values);
      console.log(payload);
      await sendToSupport(payload);
      onClose();
      showSnackbar(t('message.sent'), 'success');
    } catch (error) {
      showSnackbar(t('message.not.sent'), 'error');
      console.error(error);
    }
  };

  return (
    <BaseForm
      title={t('support.title')}
      fields={fields}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      submitText={t('support.send')}
    />
  );
};

export default SupportForm;
