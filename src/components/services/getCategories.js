import apiPublicFetch from './apiPublicFetch';
const getCategories = (query = '') => {
  return apiPublicFetch(`/api/category?query=${encodeURIComponent(query)}`);
};

export default getCategories;
