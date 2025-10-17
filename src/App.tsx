import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';

import Login from './pages/Landing/Login';
import StudentDashboard from './pages/Dashboard/StudentDashboard';
import FacultyDashboard from './pages/Dashboard/FacultyDashboard';
import StaffDashboard from './pages/Dashboard/StaffDashboard';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import UploadDocument from './pages/UploadDocument'; // Faculty upload page
import UploadDocumentStudents from './pages/UploadDocumentStudents'; // Student upload page

const App: React.FC = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      {/* Login page */}
      <Route
        path="/login"
        element={user ? <Navigate to={`/${user.role}`} replace /> : <Login />}
      />

      {/* Protected dashboard routes */}
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

      {/* Upload document pages */}
      <Route
        path="/upload-document"
        element={user?.role === 'faculty' ? <UploadDocument /> : <Navigate to="/login" />}
      />
      <Route
        path="/upload-document-students"
        element={user?.role === 'student' ? <UploadDocumentStudents /> : <Navigate to="/login" />}
      />

      {/* Catch all redirect */}
      <Route
        path="*"
        element={<Navigate to={user ? `/${user.role}` : '/login'} replace />}
      />
    </Routes>
  );
};

export default App;
