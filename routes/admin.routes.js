const express = require('express');

const router = express.Router();

const {
  createAdmin,
  profile,
  validUser,
} = require('../controllers/admin.controller');
const {
  getAll,
  addquestion,
  deletquestion,
  deletAllquestions,
  getOne,
  updatequestion,
} = require('../controllers/question.controller');
const { adminAuth } = require('../middleware/auth.middleware');

/* ! @Route  : GET => api/admin/
     Desc    : admin profile
     @Access : Private / Admin
*/
router.get('/', adminAuth, profile);

/* ! @Route  : GET => api/admin/valideuser/:id
     Desc    : valid user account
     @Access : Private / Admin
*/
router.get('/validuser/:id', adminAuth, validUser);

/* ! @Route  : GET => api/admin/createadmin
     Desc    : create admin account
     @Access : Private / Admin
*/
router.get('/createadmin', adminAuth, createAdmin);

/// ! QUESTIONS
/* ! @Route  : GET => api/admin/questions
     Desc    : Get all questions 
     @Access : Pubic
*/
router.get('/questions', adminAuth, getAll);

/* ! @Route  : GET => api/admin/question/:id
     Desc    : Get One  question
     @Access : Pubic
*/
router.get('/:id', adminAuth, getOne);

/* ! @Route  : POST => api/admin/question
     Desc    : Create question
     @Access : Pubic
*/

router.post('/addquestion', adminAuth, addquestion);

/* ! @Route  : DELETE => api/admin/question/id
     Desc    : Delete One question
     @Access : Pubic
*/
router.delete('/:id', adminAuth, deletquestion);

/* ! @Route  : DELETE => api/admin/questions
     Desc    : Delete All questions
     @Access : Pubic
*/
router.delete('/', adminAuth, deletAllquestions);

/* ! @Route  : PUT => api/admin/question/:id
     Desc    : UPDATE  question
     @Access : Pubic
*/
router.put('/:id', adminAuth, updatequestion);

module.exports = router;
