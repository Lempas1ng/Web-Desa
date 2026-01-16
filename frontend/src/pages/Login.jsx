import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/login', { email, password });
      
      // Simpan token & user ke LocalStorage
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user_name', response.data.user.name);

      // Redirect ke Dashboard
      navigate('/admin-dashboard'); 
    } catch (err) {
      setError('Login Gagal! Periksa email dan password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-6 text-slate-800">Admin Login</h1>
        
        {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Email</label>
            <input 
              type="email" 
              className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              value={email} onChange={(e) => setEmail(e.target.value)} required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Password</label>
            <input 
              type="password" 
              className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              value={password} onChange={(e) => setPassword(e.target.value)} required 
            />
          </div>
          <button 
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:bg-slate-400">
            {loading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>
      </div>
    </div>
  );
}