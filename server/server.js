const express = require('express');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = process.source || 5000;
const JWT_SECRET = 'our_secret_romantic_key_123'; // مفتاح سري للتوكن
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(express.json());
app.use(cors());

// دالة لقراءة البيانات من ملف JSON
const readData = () => {
  if (!fs.existsSync(DATA_FILE)) {
    // إذا لم يكن الملف موجوداً، ننشئ بنية أولية فارغة
    const initialData = { users: [], memories: [] };
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
    return initialData;
  }
  const fileData = fs.readFileSync(DATA_FILE, 'utf8');
  return JSON.parse(fileData);
};

// دالة لحفظ البيانات في ملف JSON
const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// --- مسارات المصادقة (Authentication Routes) ---

// تسجيل حساب جديد
app.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const data = readData();

    // التحقق مما إذا كان المستخدم موجوداً مسبقاً
    const existingUser = data.users.find((u) => u.username === username);
    if (existingUser) {
      return res.status(400).json({ message: 'اسم المستخدم مستخدم بالفعل!' });
    }

    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: Date.now().toString(), username, password: hashedPassword };

    data.users.push(newUser);
    writeData(data);

    res.status(201).json({ message: 'تم إنشاء الحساب بنجاح!' });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ في السيرفر', error: error.message });
  }
});

// تسجيل الدخول
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const data = readData();

    const user = data.users.find((u) => u.username === username);
    if (!user) {
      return res.status(400).json({ message: 'اسم المستخدم أو كلمة المرور غير صحيحة' });
    }

    // مطابقة كلمة المرور المشفرة
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'اسم المستخدم أو كلمة المرور غير صحيحة' });
    }

    // إنشاء توكن الدخول
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ message: 'تم تسجيل الدخول بنجاح', token });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ في السيرفر', error: error.message });
  }
});

// تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
