import * as Yup from 'yup';
import BaseForm from '../form/BaseForm';
import { useTranslation } from 'react-i18next';

const SignIn = ({ onSubmit }) => {
  const { t } = useTranslation();

  return (
    <BaseForm
      title={t('nav.login')}
      submitText={t('auth.login')}
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email('Invalid email format')
          .required('Required field'),
        password: Yup.string()
          .min(6, 'Minimum of 6 characters')
          .required('Required field'),
      })}
      fields={[
        { name: 'email', label: t('auth.email'), type: 'email' },
        { name: 'password', label: t('auth.password'), type: 'password' },
      ]}
      onSubmit={onSubmit}
    />
  );
};

export default SignIn;
