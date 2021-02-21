const express = require('express');

const router = express.Router();

const {
  profile,
  createRoom,
  rejoindreRoom,
} = require('../controllers/room.controller');

const { auth } = require('../middleware/auth.middleware');
/// * ------------------------- Room Route

/* ! @Route  : GET => /api/admin/room
     Desc    : profile User
     @Access : Private
*/
router.get('/', auth, profile);

/* ! @Route  : GET => /api/admin/room/createroom
     Desc    : create a room 
     @Access : Private
*/
router.get('/createroom', auth, createRoom);

/* ! @Route  : GET => /api/admin/room/createroom
     Desc    : rejoindre room
     @Access : Private
*/
router.post('/', auth, rejoindreRoom);

module.exports = router;
