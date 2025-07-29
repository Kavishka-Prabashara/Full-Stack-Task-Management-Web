/*
// src/components/ProtectedRoute.tsx
import React from 'react';
import { useAppSelector } from '../redux/hook'; // For accessing Redux state
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute: React.FC = () => {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn); // Get login status from Redux

    if (!isLoggedIn) {
        // If not logged in, redirect to the login page
        return <Navigate to="/" replace />;
    }

    // If logged in, render the child routes
    return <Outlet />;
};

export default ProtectedRoute;
*/
