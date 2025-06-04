const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "https://product-managment-frontend.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// Routes
app.use('/api/auth', require('./routes/UserRouter')); // Your auth routes
app.use('/api/products', require('./routes/ProductRouter'));

// 🔒 PROTECTED TEST ROUTE 
const protect = require('./middleware/authMiddleware');
app.get('/api/protected', protect, (req, res) => {
  res.json({ message: `Hello ${req.user.username}, you're authorized!` });
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
