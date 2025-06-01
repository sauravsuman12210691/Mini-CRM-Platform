const express = require('express');
const passport = require('passport');
const router = express.Router();

// Start Google OAuth login
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Google OAuth callback
router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/auth/failure',
  successRedirect: '/auth/success',
}));

router.get('/success', (req, res) => {
  res.json({ message: 'Login successful', user: req.user });
});

router.get('/failure', (req, res) => {
  res.status(401).json({ message: 'Login failed' });
});

// Logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.json({ message: 'Logged out' });
  });
});
//check session
router.get('/check-session', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      authenticated: true,
      user: req.user,
      message: "Session is active"
    });
  } else {
    res.json({
      authenticated: false,
      message: "No active session"
    });
  }
});

module.exports = router;
