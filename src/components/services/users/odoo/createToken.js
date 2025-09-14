import apiFetch from '../../apiFetch';

const createToken = async () => {
  return await apiFetch('/api/odoo/token/add', {
    method: 'POST',
  });
};

export default createToken