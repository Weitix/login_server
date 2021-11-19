const express = require('express');
const router = express.Router();

const questionCtrl = require('./../controllers/questionsController');

router.post('/create', questionCtrl.create);
router.get('/read', questionCtrl.read);
router.put('/update', questionCtrl.update);
router.delete('/delete/:id', questionCtrl.delete);

module.exports = router;