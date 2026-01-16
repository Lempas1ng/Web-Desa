import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem('token');

  // Jika tidak ada token, paksa pindah ke halaman Login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Jika ada, boleh lanjut akses halaman anak (Outlet)
  return <Outlet />;
};

export default ProtectedRoute;