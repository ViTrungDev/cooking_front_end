import React from 'react';
import { Navigate } from 'react-router-dom';

function RouterPrivate({ children, requiredRole }) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const isAdmin = JSON.parse(localStorage.getItem('isAdmin')) === true;

    if (!currentUser) {
        return <Navigate to="/404" />;
    }
    if (requiredRole === 'admin' && !isAdmin) {
        return <Navigate to="/404" />;
    }
    return children;
}
export default RouterPrivate;
