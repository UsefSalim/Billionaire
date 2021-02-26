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
const { auth, roleAdmin } = require('../middleware/auth.middleware');

/* ! @Route  : GET => api/admin/
     Desc    : admin profile
     @Access : Private / Admin
*/
router.get('/', roleAdmin, auth, profile);

/* ! @Route  : GET => api/admin/valideuser/:id
     Desc    : valid user account
     @Access : Private / Admin
*/
router.get('/validuser/:id', roleAdmin, auth, validUser);

/* ! @Route  : GET => api/admin/createadmin
     Desc    : create admin account
     @Access : Private / Admin
*/
router.get('/createadmin', roleAdmin, auth, createAdmin);

/// ! QUESTIONS

/* ! @Route  : GET => api/admin/questions
     Desc    : Get all questions 
     @Access : Pubic
*/
router.get('/questions', roleAdmin, auth, getAll);

/* ! @Route  : GET => api/admin/question/:id
     Desc    : Get One  question
     @Access : Pubic
*/
router.get('/question/:id', roleAdmin, auth, getOne);

/* ! @Route  : POST => api/admin/question
     Desc    : Create question
     @Access : Pubic
*/

router.post('/addquestion', roleAdmin, auth, addquestion);

/* ! @Route  : DELETE => api/admin/question/id
     Desc    : Delete One question
     @Access : Pubic
*/
router.delete('/question/:id', roleAdmin, auth, deletquestion);

/* ! @Route  : DELETE => api/admin/questions
     Desc    : Delete All questions
     @Access : Pubic
*/
router.delete('/questions', roleAdmin, auth, deletAllquestions);

/* ! @Route  : PUT => api/admin/question/:id
     Desc    : UPDATE  question
     @Access : Pubic
*/
router.put('/question/:id', roleAdmin, auth, updatequestion);

module.exports = router;
