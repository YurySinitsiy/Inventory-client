import BaseForm from './BaseForm';
import * as Yup from 'yup';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
//import { useUser } from '../auth/UserContext';
import { useLocation } from 'react-router-dom';
import { useInventory } from '../inventory/InventoryContext';
import sendToSupport from '../services/users/sendToSupport';
const SupportForm = () => {
  const { t } = useTranslation();
  const [isSubmiting, setIsSubmiting] = useState(false);
  //const { user } = useUser();
  const location = useLocation();
  const { inventory } = useInventory();

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
        { value: 'high', label: t('high') },
        { value: 'medium', label: t('medium') },
        { value: 'low', label: t('low') },
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

  const onSubmit = async (values) => {
    const payload = {
      link: window.location.href,
      inventoryTitle,
      ...values,
    };
    try {
      await sendToSupport(payload);
    } catch (error) {
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
