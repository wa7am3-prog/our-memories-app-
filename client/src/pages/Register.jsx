import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../api';

function Register() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await registerUser(formData);
    if (result.message && !result.error) {
      setMessage('تم إنشاء الحساب بنجاح! جاري التوجيه...');
      setTimeout(() => navigate('/login'), 1500);
    } else {
      setMessage(result.message || 'حدث خطأ أثناء الإنشاء');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
      <h2>إنشاء حساب جديد</h2>
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
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>تسجيل</button>
      </form>
      {message && <p>{message}</p>}
      <p>لديك حساب بالفعل؟ <Link to="/login">سجل الدخول</Link></p>
    </div>
  );
}

export default Register;
