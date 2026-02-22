import { Navigate } from 'react-router-dom';
import { useAppStore } from '../../store/UseAppStore';
import { Home } from './Home';


export const HomeRoute = () => {
    const user = useAppStore((s) => s.user);

    if (user) {
    return <Navigate to="/feed" replace />;
    }

    return <Home />;
};