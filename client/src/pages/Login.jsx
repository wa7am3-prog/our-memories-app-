import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from '../api';

function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await loginUser(formData);
    if (result.token) {
      localStorage.setItem('token', result.token);
      setMessage('تم تسجيل الدخول بنجاح! ❤️');
    } else {
      setMessage(result.message || 'حدث خطأ في تسجيل الدخول');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
      <h2>تسجيل الدخول</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="اسم المستخدم"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          required
          style={{ display: 'block', width: '100%', margin: '10px 0', padding: '10px' }}
        />
        <input
          type="password"
          placeholder="كلمة المرور"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
          style={{ display: 'block', width: '100%', margin: '10px 0', padding: '10px' }}
        />
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>دخول</button>
      </form>
      {message && <p>{message}</p>}
      <p>ليس لديك حساب؟ <Link to="/register">أنشئ حساباً جديداً</Link></p>
    </div>
  );
}

export default Login;
