const path = require('path');
var router = require('express').Router();
const rootDir = require('../util/path');

const adminRoutes = require('./admin')


const shopController = require('../controllers/shop');



// router.get('/home', (req, res, next) => {
//   console.log('Home', adminRoutes.products);
//   // res.send('<h1>Home</h1>');
//   // res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'))//Working Fine
//   // res.sendFile(path.join(__dirname, '..', 'views', 'shop.html')) //Working Fine


//   // res.sendFile(path.join(rootDir, 'views', 'shop.html'))// to render Static Html Page

//   res.render('shop', {prods: adminRoutes.products, pageTitle: 'Shop', path:'/shop/home', hasProducts: adminRoutes.products.length > 0 ? true : false, activeShop: true, productCSS: true}); //Working Fine FOr Pug But One More Param Added on Next Line


// });



router.get('/home', shopController.getIndex);
router.get('/products', shopController.getProducts);
router.get('/products/:productId', shopController.getProduct);
router.get('/cart', shopController.getCart);
router.post('/cart', shopController.postCart);
router.post('/cart-delete-item', shopController.postCartDeleteProduct);
router.get('/orders', shopController.getOrders);
router.get('/checkout', shopController.getCheckout);



module.exports = router;
