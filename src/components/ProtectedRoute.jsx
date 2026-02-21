import { Navigate, useLocation } from 'react-router-dom';
import { useAppStore } from '../store/UseAppStore';

export function ProtectedRoute({ children }) {
  const user = useAppStore((s) => s.user);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/signup" state={{ from: location }} replace />;
  }

  return children;
}
