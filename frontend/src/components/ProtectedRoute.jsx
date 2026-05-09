import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/authContext'
// import { Loading } from './ui'

export const ProtectedRoute = React.memo(({ children, redirectTo = "/login" }) => {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <div className="text-center p-10">Authenticating...</div>;
    // return <Loading fullScreen text="Authenticating..." />
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  return children
})

export const PublicRoute = React.memo(({ children }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <div className="text-center p-10">Loading...</div>;
  }

  // If already logged in
  if (isAuthenticated) {

    // Admin → dashboard
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }

    // Normal user → home
    return <Navigate to="/" replace />;
  }

  return children;
});

// export const PublicRoute = React.memo(({ children, redirectTo = "/" }) => {
//   const { isAuthenticated, loading } = useAuth()

//   if (loading) {
//     return <div className="text-center p-10">Loading...</div>;
//   }

//   if (isAuthenticated) {
//     return <Navigate to={redirectTo} replace />
//   }

//   return children
// })
export const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

// export const AdminRoute = React.memo(({ children, redirectTo = "/login" }) => {
//   const { isAuthenticated, user, loading } = useAuth()
//   const location = useLocation()

//   if (loading) {
//     return <div className="text-center p-10">Verifying admin access...</div>;
//     // return <Loading fullScreen text="Verifying admin access..." />
//   }

//   if (!isAuthenticated) {
//     return <Navigate to={redirectTo} state={{ from: location }} replace />
//   }

//   if (user?.role !== 'admin') {
//     return <Navigate to="/" replace />
//   }

//   return children
// })
