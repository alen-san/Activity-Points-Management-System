import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { currentStudent } = useAuth();

  if (!currentStudent) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
