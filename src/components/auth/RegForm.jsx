import * as Yup from 'yup';
import BaseForm from '../form/BaseForm';
import { useTranslation } from 'react-i18next';

const SignUp = ({ onSubmit, isSubmitting }) => {
  const { t } = useTranslation();

  return (
    <BaseForm
      title={t('nav.signup')}
      submitText={t('auth.signup')}
      initialValues={{ email: '', name: '', surname: '', password: '' }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email(t('auth.email.invalid'))
          .required(t('required')),
        name: Yup.string().required(t('required')),
        surname: Yup.string().required(t('required')),
        password: Yup.string()
          .min(6, t('auth.min.symbols'))
          .required(t('required')),
      })}
      fields={[
        { name: 'email', label: t('auth.email'), type: 'email' },
        { name: 'name', label: t('auth.name'), type: 'text' },
        { name: 'surname', label: t('auth.surname'), type: 'text' },
        { name: 'password', label: t('auth.password'), type: 'password' },
      ]}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
    />
  );
};

export default SignUp;
