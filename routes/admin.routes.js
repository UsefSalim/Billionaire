const express = require('express');

const router = express.Router();

const { createAdmin, profile } = require('../controllers/admin.controller');
const { adminAuth } = require('../middleware/auth.middleware');

/* ! @Route  : POST => api/admin/
     Desc    : admin profile
     @Access : Private / Admin
*/
router.get('/', adminAuth, profile);

/* ! @Route  : POST => api/admin/createadmin
     Desc    : create admin account
     @Access : Private / Admin
*/
router.get('/createadmin', adminAuth, createAdmin);

module.exports = router;
