import apiFetch from '../apiFetch.js';

const getUser = () => {
  return apiFetch('/api/users/me');
};

export default getUser;
