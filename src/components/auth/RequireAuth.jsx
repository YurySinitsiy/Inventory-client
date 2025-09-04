import RedirectByRole from './RedirectByRole';
import Loader from '../../components/tools/Loader';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import getUser from '../services/users/getUser';

const RequireAuth = ({ allowedRoles, children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  const navigate = useNavigate();

  const checkAccess = async () => {
    setIsLoading(true);
    try {
      const user = await getUser();
      handleAccess(user);
    } catch {
      navigate('/login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccess = (user) => {
    if (!user?.role) return navigate('/login');
    if (!allowedRoles.includes(user.role))
      return RedirectByRole(user.role, navigate);
    setHasAccess(true);
  };

  useEffect(() => {
    checkAccess();
  }, [allowedRoles, navigate]);

  if (isLoading) return <Loader />;
  if (!hasAccess) return null;

  return children;
};

export default RequireAuth;
