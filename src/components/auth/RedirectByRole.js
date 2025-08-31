export const redirectByRole = (role, navigate) => {
  const routes = { admin: '/admin', user: '/personal' };
  navigate(routes[role] || '/');
};
