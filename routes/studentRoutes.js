const express = require('express');
const c = require('../controllers/studentController');
const apiKey = require('../middleware/apiKey');

const router = express.Router();

router.route('/').get(c.getStudents).post(apiKey, c.createStudent);
router.route('/:id').get(c.getStudent).put(apiKey, c.updateStudent).delete(apiKey, c.deleteStudent);

module.exports = router;
