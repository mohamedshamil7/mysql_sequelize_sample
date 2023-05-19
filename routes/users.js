var express = require('express');
var router = express.Router();

let { 
  userLoginSubmit,
  createUser ,

} = require("../controller/userController");

/* GET users listing. */
router.post('/signup',createUser );

module.exports = router;
