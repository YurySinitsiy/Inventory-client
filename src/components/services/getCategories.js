import apiPublicFetch from './apiPublicFetch';
const getCategories = (query = '') => {
  return apiPublicFetch(`/api/categories?query=${encodeURIComponent(query)}`);
};

export default getCategories;
