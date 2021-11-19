const express = require("express");
const router = express.Router();

const Quiz = require("./../models/Quiz");


router.get("/kirill", (req,res) => {
  res.send('First Api')
});

module.exports = router;