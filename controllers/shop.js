
// const products = [];

const Product = require('../models/product');



exports.getProducts = (req, res, next) => {
  // Product.fetchAll((products) => {
  //   res.render(
  //     'shop/product-list',
  //     {
  //       prods: products,
  //       pageTitle: 'Products',
  //       path:'/shop/products',
  //       hasProducts: products.length > 0 ? true : false,
  //       activeShop: true,
  //       productCSS: true
  //     });
  // });

  // New Work
  // Product.fetchAll()
  // .then(([rows, feildData]) => {
  //   res.render(
  //     'shop/product-list',
  //     {
  //       prods: rows,
  //       pageTitle: 'Products',
  //       path:'/shop/products',
  //       hasProducts: rows.length > 0 ? true : false,
  //       // activeShop: true,
  //       // productCSS: true
  //     });
  // })
  // .catch(err => console.log(err));

  // New Work With Sequelize
  Product.findAll().then(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'Shop',
      path:'/shop/product-list',
      hasProducts: products.length > 0 ? true : false,
    });
  })
  .catch(err => console.log(err));

}


// One Product from ID
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;

  // Product.findById(prodId, product => {
  //   res.render('shop/product-detail', {
  //     product: product,
  //     pageTitle: product.title,
  //     path:'/shop/products',
  //   })
  // });

  // New Work
  // Product.findById(prodId).then(([product]) => {
  //   res.render('shop/product-detail', {
  //     product: product[0],
  //     pageTitle: product[0].title,
  //     path:'/shop/products',
  //   })
  // })
  // .catch(err => console.log(err));

  // New Work With Sequelize

  // With Find All
  // Product.findAll({where : {id: prodId}}).then(products => {
  //   res.render('shop/product-detail', {
  //     product: products[0],
  //     pageTitle: products[0].title,
  //     path:'/shop/products',
  //   })
  // })
  // .catch(err => console.log(err));

  // With FindById/findByPk
  Product.findByPk(prodId).then((product) => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path:'/shop/products',
    })
  })
  .catch(err => console.log(err));
}


exports.getIndex = (req, res, next) => {
  // Product.fetchAll((products) => {
  //   res.render(
  //     'shop/index',
  //     {
  //       prods: products,
  //       pageTitle: 'Shop',
  //       path:'/shop/home',
  //       hasProducts: products.length > 0 ? true : false,
  //       activeShop: true,
  //       productCSS: true
  //     });
  // });


  // New Work
  // Product.fetchAll()
  // .then(([rows, feildData]) => {
  //   res.render(
  //     'shop/index',
  //     {
  //       prods: rows,
  //       pageTitle: 'Shop',
  //       path:'/shop/home',
  //       hasProducts: rows.length > 0 ? true : false,
  //       // activeShop: true,
  //       // productCSS: true
  //     });
  // })
  // .catch(err => console.log(err));

  // New Work With Sequelize
  Product.findAll().then(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path:'/shop/home',
      hasProducts: products.length > 0 ? true : false,
    });
  })
  .catch(err => console.log(err));

}

exports.getCart = (req, res, next) => {
  // Cart.getCart(cart => {
  //   Product.fetchAll(products => {
  //     const cartProducts = [];
  //     for(product of products){
  //       const cartProductData = cart.products.find(prod => prod.id === product.id);
  //       if(cartProductData){
  //         cartProducts.push({productData: product, qty: cartProductData.qty});
  //       }
  //     }
  //     res.render('shop/cart',{
  //         pageTitle: 'Cart',
  //         path:'/shop/cart',
  //         products: cartProducts,
  //         activeShop: true,
  //         productCSS: true
  //     });
  //   });
  // });


  req.user.getCart()
  .then(cart => {
   return cart.getProducts()
   .then(products => {
    res.render('shop/cart',{
      pageTitle: 'Cart',
      path:'/shop/cart',
      products: products,
      activeShop: true,
      productCSS: true
    });
   }).catch(err => console.log(err));
  }).catch(err => console.log(err));
}

exports.postCart = (req, res, next) => {
  // const prodId = req.body.productId;
  // Product.findById(prodId, (product) => {
  //   Cart.addProduct(prodId, +product.price)
  // });
  // console.log(prodId);
  // res.redirect('/shop/cart');
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user.getCart()
  .then(cart => {
    fetchedCart = cart;
    return cart.getProducts({where: { id: prodId }})
  })
  .then(products => {
    let product;
    if(products.length > 0){
      product = products[0];
    }
    if(product){
      const oldQuantity = product.cartItem.quantity;
      newQuantity = 1 + oldQuantity;
      return product;
    }
    return Product.findByPk(prodId);
  })
  .then(product => {
    return fetchedCart.addProduct(product, { through : { quantity: newQuantity }})
  })
  .then(() => {
    res.redirect('/shop/cart');
  })
  .catch(err => console.log(err));
}

exports.postCartDeleteProduct = (req, res, next) => {
  // const prodId = req.body.productId;
  // Product.findById(prodId , product => {
  //   Cart.deleteProduct(prodId, product.price);
  //   res.redirect('/shop/cart');
  // })


  const prodId = req.body.productId;
  req.user.getCart()
  .then(cart => {
    return cart.getProducts({ where : { id: prodId } })
  })
  .then(products => {
    const product = products[0];
    return product.cartItem.destroy();
  })
  .then(result => {
    res.redirect('/shop/cart');
  })
  .catch(err => console.log(err));
}

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user.getCart()
  .then(cart => {
    fetchedCart = cart;
    return cart.getProducts()
  })
  .then(products => {
    return req.user.createOrder()
    .then(order => {
      return order.addProducts(products.map(product => {
        product.orderItem = { quantity : product.cartItem.quantity };
        return product;
      }));
    })
    .catch(err => console.log(err));
  })
  .then(result => {
    return fetchedCart.setProducts(null);
  })
  .then(result => {
    res.redirect('/shop/orders');
  })
  .catch(err => console.log(err))
}

exports.getCheckout = (req, res, next) => {
  res.render(
    'shop/checkout',
    {
      pageTitle: 'Checkout',
      path:'/shop/checkout',
      activeShop: true,
      productCSS: true
    }); //Working Fine FOr Pug But One More Param Added on Next Line
}


exports.getOrders = (req, res, next) => {
  req.user.getOrders({include: ['products']})
  .then(orders => {
    res.render(
      'shop/orders',
      {
        pageTitle: 'Orders',
        path:'/shop/orders',
        activeShop: true,
        productCSS: true,
        orders: orders
      }
    ); //Working Fine FOr Pug But One More Param Added on Next Line
  })
  .catch(err => console.log(err));

}
