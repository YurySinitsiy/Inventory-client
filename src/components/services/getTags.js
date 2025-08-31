import apiPublicFetch from './apiPublicFetch';

const getTags = (query = '') => {
  return apiPublicFetch(`/api/tags?query=${encodeURIComponent(query)}`);
};

export default getTags;
