import React, { useState } from 'react';
import { loginUser } from '../api';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await loginUser(email, password);
    if (data.error) {
      setMessage(data.error);
    } else {
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-950 via-gray-900 to-black text-white">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-96 border border-white/20">
        <h2 className="text-3xl font-bold text-center mb-6 text-pink-400">عالمنا الخاص ❤️</h2>
        {message && <p className="text-red-400 text-sm mb-4 text-center">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">البريد الإلكتروني</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-black/40 border border-white/20 focus:outline-none focus:border-pink-500"
              required 
            />
          </div>
          <div>
            <label className="block text-sm mb-1">كلمة المرور</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-black/40 border border-white/20 focus:outline-none focus:border-pink-500"
              required 
            />
          </div>
          <button type="submit" className="w-full py-3 bg-pink-600 hover:bg-pink-700 transition rounded-lg font-bold shadow-lg">
            دخول للذكريات
          </button>
        </form>
        <p className="text-center text-sm mt-4 text-gray-400">
          ليس لديك حساب؟ <Link to="/register" className="text-pink-400 hover:underline">انضم الآن</Link>
        </p>
      </div>
    </div>
  );
}
