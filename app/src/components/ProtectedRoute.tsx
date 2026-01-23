import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { UserRole } from '../contexts/AuthContext';

interface ProtectedRouteProps {
    children: ReactNode;
    requiredRole?: UserRole;
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
    const { user, loading, role } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center space-y-4">
                    <div className="inline-block w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-600 font-medium">Carregando...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Check role if required
    if (requiredRole && role !== requiredRole) {
        // Redirect non-admin users trying to access admin pages
        if (requiredRole === 'admin') {
            return <Navigate to="/area-do-cliente" replace />;
        }
        // Redirect admin users trying to access user-only pages
        if (requiredRole === 'user') {
            return <Navigate to="/admin" replace />;
        }
    }

    return <>{children}</>;
}

