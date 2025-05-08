import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // ✅ import cors
import oddsRoutes from './routes/odds';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors()); // ✅ enable CORS (you can customize the origin if needed)
app.use(express.json());

// --- Login Route ---
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const validEmail = process.env.USER_EMAIL;
  const validPassword = process.env.USER_PASSWORD;

  if (email === validEmail && password === validPassword) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    return res.json({ token });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
});

// --- Authentication Middleware ---
app.use((req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token required' });

  try {
    jwt.verify(token, process.env.JWT_SECRET as string);
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
});

app.use('/odds', oddsRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
