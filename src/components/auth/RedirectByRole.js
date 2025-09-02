const redirectByRole = (role, navigate) => {

  const routes = { admin: '/admin', user: '/personal' };
  navigate(routes[role] || '/');
};

export default redirectByRole;
