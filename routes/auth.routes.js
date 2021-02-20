const express = require('express');

const router = express.Router();

const { register, login, logout } = require('../controllers/auth.controller');
// const { auth } = require('../middleware/Auth.middleware');
/// * ------------------------- Auth Route

/* ! @Route  : POST => api/auth/register
     Desc    : Register the Auth
     @Access : Pubic
*/
router.post('/register', register);

/* ! @Route  : POST => api/auth/login
     Desc    : login Auth
     @Access : Pubic  
*/
router.post('/login', login);

/* ! @Route  : POST => api/auth/logout
     Desc    : logout Auth
     @Access : Pubic
*/
router.post('/logout', logout);

module.exports = router;
