import RedirectByRole from './RedirectByRole';
import Loader from '../../components/tools/Loader';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';

const RequireAuth = ({ allowedRoles, children }) => {
  const { user, isLoading } = useUser();
  const [hasAccess, setHasAccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    if (!user?.role) {
      navigate('/login');
    } else if (!allowedRoles.includes(user.role)) {
      RedirectByRole(user.role, navigate);
    } else {
      setHasAccess(true);
    }
  }, [user, isLoading, allowedRoles, navigate]);

  if (isLoading) return <Loader />;
  if (!hasAccess) return null;

  return children;
};

export default RequireAuth;
