import apiFetch from '../apiFetch';

const getUserById = (id) => {
  return apiFetch(`/api/users/${id}`);
};

export default getUserById;
