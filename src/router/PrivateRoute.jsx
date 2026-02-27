import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    // 1. LOADING STATE: Prevents flickering/false redirects
    if (loading) {
        return (
            <div className="h-screen w-full flex flex-col items-center justify-center bg-white dark:bg-[#050505]">
                <div className="w-12 h-12 border-4 border-t-[#4f46e5] border-zinc-200 dark:border-zinc-800 rounded-full animate-spin mb-4" />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 animate-pulse">
                    Verifying Access Keys...
                </p>
            </div>
        );
    }

    // 2. AUTHORIZED: Render the Dashboard
    if (user) {
        return children;
    }

    // 3. UNAUTHORIZED: Redirect to login, but save the intended destination
    // "state={location}" allows us to send them back where they were after they login.
    return <Navigate to="/logIn" state={location} replace />;
};

export default PrivateRoute;