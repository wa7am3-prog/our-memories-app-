import React, { useState } from 'react';
import { registerUser } from '../api';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await registerUser(email, password);
    if (data.error) {
      setMessage(data.error);
      setIsSuccess(false);
    } else {
      setMessage(data.message);
      setIsSuccess(true);
      setTimeout(() => navigate('/login'), 1500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-950 via-gray-900 to-black text-white">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-96 border border-white/20">
        <h2 className="text-3xl font-bold text-center mb-6 text-pink-400">انضمام لقصتنا ✨</h2>
        {message && (
          <p className={`text-sm mb-4 text-center ${isSuccess ? 'text-green-400' : 'text-red-400'}`}>
            {message}
          </p>
        )}
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
          <button type="submit" className="w-full py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:opacity-90 transition rounded-lg font-bold shadow-lg">
            إنشاء الحساب
          </button>
        </form>
        <p className="text-center text-sm mt-4 text-gray-400">
          لديك حساب مسبق؟ <Link to="/login" className="text-pink-400 hover:underline">تسجيل الدخول</Link>
        </p>
      </div>
    </div>
  );
}
