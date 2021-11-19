const express = require('express');
const router = express.Router();

const quizCtrl = require('./../controllers/quizController');
const counterCtrl = require('./../controllers/counterController');

router.post('/create', quizCtrl.create, counterCtrl.create);
router.get('/read', quizCtrl.read);
router.delete('/delete/:id', quizCtrl.delete);

module.exports = router;