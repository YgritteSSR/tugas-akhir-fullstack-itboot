import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from "./components/Navbar"
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import Home from './pages/Home';
import RegisterPage from './pages/RegisterPage';
import ItemsPage from './pages/ItemPage';

// Protected Route — redirect ke /login jika belum login
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={
            <ProtectedRoute><DashboardPage /></ProtectedRoute>
          } />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/items" element={
            <ProtectedRoute><ItemsPage /></ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}