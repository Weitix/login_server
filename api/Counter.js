
const express = require('express');
const router = express.Router();

const counterCtrl = require('./../controllers/counterController');


router.post('/create', counterCtrl.create);
router.get('/read', counterCtrl.read);
router.get('/read/:id', counterCtrl.readOne);
router.put('/update', counterCtrl.update);

module.exports = router;