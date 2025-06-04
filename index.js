// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const connectDB = require('./config/db');

// dotenv.config();
// connectDB();

// const app = express();
// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://product-managment-frontend.vercel.app"
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
// }));

// // Routes
// app.use('/api/auth', require('./routes/UserRouter')); // Your auth routes
// app.use('/api/products', require('./routes/ProductRouter'));

// // 🔒 PROTECTED TEST ROUTE 
// const protect = require('./middleware/authMiddleware');
// app.get('/api/protected', protect, (req, res) => {
//   res.json({ message: `Hello ${req.user.username}, you're authorized!` });
// });

// // Server start
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });




// backend/index.js (or whatever your main file is)
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db'); // Assuming this is correct

dotenv.config(); // Make sure this is at the top
connectDB(); // Call this to establish DB connection

const app = express();

// --- MIDDLEWARE ---
// CORS Configuration
const allowedOrigins = [
  "http://localhost:5173", // For local dev
  "https://product-managment-frontend.vercel.app" // Your frontend
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));

// Body Parser Middleware (if you're sending JSON data)
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: false })); // For parsing application/x-www-form-urlencoded

// --- ROUTES ---
app.use('/api/auth', require('./routes/UserRouter'));
app.use('/api/products', require('./routes/ProductRouter'));

// --- PROTECTED TEST ROUTE ---
const protect = require('./middleware/authMiddleware'); // Assuming this path is correct
app.get('/api/protected', protect, (req, res) => {
  // Ensure req.user is populated by your 'protect' middleware
  if (!req.user || !req.user.username) {
    return res.status(401).json({ message: "User data not found in token or token invalid" });
  }
  res.json({ message: `Hello ${req.user.username}, you're authorized!` });
});

// --- TEST ROOT ROUTE (Highly Recommended for Vercel debugging) ---
app.get('/', (req, res) => {
  res.send('Hello from Backend API!');
});

// --- VERCEL EXPORT ---
// Remove app.listen()
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

module.exports = app; // Export the app for Vercel