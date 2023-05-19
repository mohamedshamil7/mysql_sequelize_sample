var express = require('express');
var router = express.Router();

let { 
  userLogin,
  createUser ,

} = require("../controller/userController");

/* GET users listing. */
router.post('/signup',createUser );
router.post('/login',userLogin );

module.exports = router;
