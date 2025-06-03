const express = require('express');
const passport = require('passport');
const router = express.Router();

// Start Google OAuth login
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Google OAuth callback - no redirect, just JSON response
router.get('/google/callback',
  (req, res, next) => {
    passport.authenticate('google', { session: true }, (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        return res.status(401).json({ status: 'error', message: 'Authentication failed' });
      }
      req.logIn(user, err => {
        if (err) return next(err);
        return res.json({ status: 'success', message: 'Login successful', user });
      });
    })(req, res, next);
  }
);

// Logout route
router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.json({ message: 'Logged out' });
  });
});

// Check session route
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
