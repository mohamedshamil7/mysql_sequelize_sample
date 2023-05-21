var express = require('express');
var router = express.Router();

let { 
  userLogin,
  createUser ,
  getAllProducts,
  newProduct,
  getProductWithId

} = require("../controller/userController");

/* GET users listing. */
router.post('/signup',createUser );
router.post('/login',userLogin );
router.get('/products',getAllProducts );
router.get('/products/:id',getProductWithId );
router.post('/products',newProduct);

module.exports = router;
