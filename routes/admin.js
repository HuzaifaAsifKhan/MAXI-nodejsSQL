const { truncate } = require('fs');
const path = require('path');
var router = require('express').Router();
const rootDir = require('../util/path');



const adminController = require('../controllers/admin');
// const products = [];




// router.get('/add-product', (req, res, next) => {
//   // res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html')) //Working Fine
//   // res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html')) //Working Fine



//   // res.sendFile(path.join(rootDir, 'views', 'add-product.html')) //Working Fine With HTML File
//   res.render('add-product',{pageTitle:"Add Prodcut", path:'/admin/add-product', activeProduct: true, productCSS: true, formsCSS: true})




//   // res.send('<form action="/admin/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
// });

// get Add Product Page
router.get('/add-product', adminController.getAddProduct);
// Get All Products & its Page
router.get('/products', adminController.getProducts);
// Post Product Data to Storage
router.post('/add-product', adminController.postAddProduct);
// Edit Product Page
router.get('/edit-product/:productId', adminController.getEditProduct);
// Post Edit Product
router.post('/edit-product', adminController.postEditProduct);
// Delete Product
router.post('/delete-product', adminController.postDeleteProduct);


module.exports = router;
// exports.routes = router;
// exports.products = products;
