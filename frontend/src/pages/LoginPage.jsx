import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [form, setForm] = useState({email:'',password:''});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return setError('Isi semua field!');
    setLoading(true); setError('');
    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch(err) {
      setError(err.response?.data?.error || 'Login gagal');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-xl w-full max-w-sm space-y-4">
        <h1 className="text-white text-2xl font-bold">Login</h1>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <input type="email" value={form.email}
          onChange={e => setForm({...form, email: e.target.value})}
          className="w-full bg-gray-700 text-white p-3 rounded-lg"
          placeholder="Email" />
        <input type="password" value={form.password}
          onChange={e => setForm({...form, password: e.target.value})}
          className="w-full bg-gray-700 text-white p-3 rounded-lg"
          placeholder="Password" />
        <button type="submit" disabled={loading}
          className="w-full bg-gray-700 text-white p-3 rounded-lg disabled:opacity-50">
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </div>
  );
}