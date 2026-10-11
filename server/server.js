const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

// اتصال قاعدة البيانات (يمكنك وضع رابط MongoDB Atlas أو المحلي)
mongoose.connect('mongodb://localhost:27017/couple-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB')).catch(err => console.log(err));

// نموذج المستخدم (User Schema)
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
const User = mongoose.model('User', UserSchema);

// مسار تسجيل حساب جديد (Register)
app.api/register = app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'تم إنشاء الحساب بنجاح ❤️' });
  } catch (err) {
    res.status(400).json({ error: 'البريد الإلكتروني مستخدم مسبقاً' });
  }
});

// مسار تسجيل الدخول (Login)
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'المستخدم غير موجود' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'كلمة المرور غير صحيحة' });

    const token = jwt.sign({ id: user._id }, 'YOUR_JWT_SECRET', { expiresIn: '1d' });
    res.json({ token, message: 'مرحباً بكما في عالمكما الخاص' });
  } catch (err) {
    res.status(500).json({ error: 'حدث خطأ ما' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
