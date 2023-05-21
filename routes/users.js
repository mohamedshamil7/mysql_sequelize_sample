var express = require('express');
var router = express.Router();

let { 
  userLogin,
  createUser ,
  getAllProducts,
  newProduct,
  getProductWithId,
  // newOrder,
  // getOrders

} = require("../controller/userController");

/* GET users listing. */
router.post('/signup',createUser );
router.post('/login',userLogin );
router.get('/products',getAllProducts );
router.get('/products/:id',getProductWithId );
router.post('/products',newProduct);
// router.post('/order',newOrder);
// router.get('/orders',getOrders);

module.exports = router;
