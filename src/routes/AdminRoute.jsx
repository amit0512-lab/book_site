import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/ui/Spinner';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

const AdminRoute = ({ children }) => {
  const { user, userProfile, loading, isAdmin } = useAuth();

  useEffect(() => {
    if (!loading && user && !isAdmin()) {
      toast.error('Access denied. Admin privileges required.');
    }
  }, [user, userProfile, loading, isAdmin]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin()) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;