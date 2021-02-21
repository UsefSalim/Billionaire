const express = require('express');

const router = express.Router();

const { profile, createRoom } = require('../controllers/room.controller');
const { auth } = require('../middleware/auth.middleware');
/// * ------------------------- Room Route

/* ! @Route  : POST => /api/admin/room
     Desc    : profile User
     @Access : Private
*/
router.get('/', auth, profile);

/* ! @Route  : POST => /api/admin/room/createroom
     Desc    : create a room 
     @Access : Pubic
*/
router.get('/createroom', auth, createRoom);

// /* ! @Route  : POST => api/auth/logout
//      Desc    : logout Auth
//      @Access : Pubic
// */
// router.post('/', logout);

module.exports = router;
