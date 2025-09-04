import apiFetch from '../apiFetch';

const handleRegistration = async (authData, values) => {
  return apiFetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({
      userId: authData.user.id,
      data: values,
    }),
  });
};

export default handleRegistration;
