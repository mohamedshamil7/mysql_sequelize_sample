var express = require('express');
var router = express.Router();

let { 
  userLogin,
  createUser ,
  getAllProducts,
  newProduct

} = require("../controller/userController");

/* GET users listing. */
router.post('/signup',createUser );
router.post('/login',userLogin );
router.get('/products',getAllProducts );
router.post('/products',newProduct);

module.exports = router;
