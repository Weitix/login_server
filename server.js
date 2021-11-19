// mongodb
require("./config/db");

const app = require("express")();
const port = process.env.PORT || 3000;

const morgan = require("morgan")
const expressJwt = require('express-jwt');
app.use(morgan('combined'));

const UserRouter = require("./api/User");
const apiRouter = require("./api/FirstApi");



const quiz = require('./api/Quiz');
const counter = require('./api/Counter');
const questions = require('./api/Questions');

// For accepting post form data
const bodyParser = require("express").json;
app.use(bodyParser());


//cors
const cors = require("cors");
app.use(cors());

app.use("/user", UserRouter);
app.use("/apir", apiRouter);

app.use("/questions", questions);
app.use("/quiz", quiz);
app.use("/counter", counter);




app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if(req.method === 'OPTIONS'){
    res.writeHead(200);
    res.end()
  }else{
    next();    	
  }
});