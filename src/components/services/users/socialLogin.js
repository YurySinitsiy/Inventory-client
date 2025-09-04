import apiFetch from '../apiFetch';

const socialLogin = async (session) => {
  return apiFetch('/api/auth/social-login', {
    method: 'PUT',
    body: JSON.stringify({ user: session.user }),
  });
};
export default socialLogin;
