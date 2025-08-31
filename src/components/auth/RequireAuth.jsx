import { redirectByRole } from './RedirectByRole';
import Loader from '../../components/tools/Loader';
import { supabase } from '../../lib/supabaseClient';
import CheckUserRole from '../auth/CheckUserRole';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const RequireAuth = ({ allowedRoles, children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkAccess = async () => {
      setIsLoading(true);
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          navigate('/login');
          return;
        }

        const userRole = await CheckUserRole(user.id);
        if (!userRole) {
          navigate('/login');
          return;
        }

        if (!allowedRoles.includes(userRole)) {
          redirectByRole(userRole, navigate);
          return;
        }

        setHasAccess(true);
      } catch (err) {
        console.error(err);
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAccess();
  }, [allowedRoles, navigate]);

  if (isLoading) return <Loader />;
  if (!hasAccess) return null;

  return children;
};

export default RequireAuth;
