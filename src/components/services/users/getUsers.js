import apiFetch from '../apiFetch';

const getUsers = async () => {
  return apiFetch('/api/users');
};

export default getUsers;
