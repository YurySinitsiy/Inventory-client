import apiFetch from '../../apiFetch';

const getToken = async () => {
  return await apiFetch('/api/odoo/token/get');
};

export default getToken;
