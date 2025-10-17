import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';

import Login from './pages/Landing/Login';
import StudentDashboard from './pages/Dashboard/StudentDashboard';
import FacultyDashboard from './pages/Dashboard/FacultyDashboard';
import StaffDashboard from './pages/Dashboard/StaffDashboard';
import AdminDashboard from './pages/Dashboard/AdminDashboard';

const App: React.FC = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      {/* If no user, allow login page */}
      <Route
        path="/login"
        element={user ? <Navigate to={`/${user.role}`} replace /> : <Login />}
      />

      {/* Protected routes */}
      <Route
        path="/student"
        element={user?.role === 'student' ? <StudentDashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/faculty"
        element={user?.role === 'faculty' ? <FacultyDashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/staff"
        element={user?.role === 'staff' ? <StaffDashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/admin"
        element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />}
      />

      {/* Default redirect */}
      <Route
        path="*"
        element={<Navigate to={user ? `/${user.role}` : '/login'} replace />}
      />
    </Routes>
  );
};

export default App;
