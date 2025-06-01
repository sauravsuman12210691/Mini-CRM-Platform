const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const { ensureAuth } = require('./middleware/authMiddleware');
const User = require('./models/User');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key',
  resave: false,
  saveUninitialized: false,
}));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// CORS and JSON parsing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

// Passport Google OAuth strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
},
async (accessToken, refreshToken, profile, done) => {
  try {
    const existingUser = await User.findOne({ googleId: profile.id });

    if (existingUser) {
      return done(null, existingUser);
    }

    const newUser = await User.create({
      googleId: profile.id,
      displayName: profile.displayName,
      email: profile.emails[0].value,
      photo: profile.photos[0].value,
    });

    done(null, newUser);
  } catch (err) {
    done(err, null);
  }
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// Routes
app.use('/auth', require('./routes/authRoutes')); // Google login/logout
app.use('/api/customers', ensureAuth, require('./routes/customerRoutes'));
app.use('/api/orders', ensureAuth, require('./routes/orderRoutes'));
app.use('/api/campaigns', ensureAuth, require('./routes/campaignRoutes'));
app.use('/api/delivery', ensureAuth, require('./routes/deliveryRoutes'));

// Health check
app.get('/', (req, res) => res.send('Xeno Mini CRM Backend Running'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
