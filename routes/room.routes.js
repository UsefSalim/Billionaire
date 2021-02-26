const express = require('express');

const router = express.Router();

const {
  profile,
  createRoom,
  rejoindreRoom,
} = require('../controllers/room.controller');

const { auth, roleUser } = require('../middleware/auth.middleware');
/// * ------------------------- Room Route

/* ! @Route  : GET => /api/admin/room
     Desc    : profile User
     @Access : Private
*/
router.get('/', roleUser, auth, profile);

/* ! @Route  : GET => /api/admin/room/createroom
     Desc    : create a room 
     @Access : Private
*/
router.get('/createroom', roleUser, auth, createRoom);

/* ! @Route  : GET => /api/admin/room/rejoindreroom/:id
     Desc    : rejoindre room
     @Access : Private
*/
router.get('/rejoindreroom/:id', roleUser, auth, rejoindreRoom);

module.exports = router;
