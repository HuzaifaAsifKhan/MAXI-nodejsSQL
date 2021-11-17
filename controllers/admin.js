const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
  res.render(
    'admin/edit-product',
    {
      pageTitle:"Add Prodcut",
      path:'admin/add-product',
      editing: false,
      activeProduct: true,
      productCSS: true,
      formsCSS: true
    })
}
exports.postAddProduct =  (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;
  const product = new Product(null, title, imageUrl, description, price)
  // product.save(savedData => {
  //   res.redirect('/shop/home');
  // });

  // New Work
  // product.save().then(() => {
  //   res.redirect('/shop/home');
  // }).catch(err => console.log(err))

  // New Work With Sequelize

  // User.createProduct way
  req.user.createProduct({
    title,
    price,
    imageUrl,
    description,
    userId: req.user.id
  })

  // Prodct.create Way
  // Product.create({
  //   title,
  //   price,
  //   imageUrl,
  //   description,
  //   userId: req.user.id
  // })
  .then(result => {
    console.log(result);
    res.redirect('/admin/products');
  })
  .catch(err => console.log(err))
}



exports.getEditProduct = (req, res, next) => {
  const prodId = req.params.productId;
  const editMode = req.query.edit;
  if(editMode !== 'true'){
    return res.redirect('/shop/home');
  }
  // Product.findById(prodId, product => {
  //   if(!product){
  //     return res.redirect('/shop/home');
  //   }
  //   res.render(
  //     'admin/edit-product',
  //     {
  //       product: product,
  //       pageTitle: 'Edit Product',
  //       path:'admin/edit-product',
  //       editing: editMode,
  //       activeProduct: true,
  //       productCSS: true,
  //       formsCSS: true
  //     })
  // })

  // New Work With Sequelize

  // with UserProduct Way
  req.user.getProducts({where: {id: prodId}})
  .then(products => {
    const product = products[0];


  // With findByPk Way
  // Product.findByPk(prodId)
  // .then(product => {
    if(!product){
      return res.redirect('/shop/home');
    }
    res.render(
      'admin/edit-product',
      {
        product: product,
        pageTitle: 'Edit Product',
        path:'admin/edit-product',
        editing: editMode,
        activeProduct: true,
        productCSS: true,
        formsCSS: true
      })
  })
  .catch(err => console.log(err))
}
exports.postEditProduct =  (req, res, next) => {
  const prodId = req.body.productId
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  const updatedPrice = req.body.price;
  // const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedDesc, updatedPrice)
  // updatedProduct.save();
  Product.findByPk(prodId)
  .then(product => {
    product.title = updatedTitle;
    product.imageUrl = updatedImageUrl;
    product.description = updatedDesc;
    product.price = updatedPrice;
    return product.save();
  })
  .then(result => {
    console.log("UPDATED SUCCESSFULLY");
    res.redirect('/admin/products');
  })
  .catch(err => console.log(err));
  // res.redirect('/admin/products');
}


exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  // Product.deleteById(prodId);
  // res.redirect('/admin/products');

  //  New Work With Sequelize
  Product.findByPk(prodId).then(product => {
    return product.destroy();
  })
  .then(result => {
    console.log('Product Deleted');
    res.redirect('/admin/products');
  })
  .catch(err => console.log(err));
  Product.destroy
}




exports.getProducts = (req, res, next) => {
  // Product.fetchAll((products) => {
  //   res.render(
  //     'admin/products',
  //     {
  //       prods: products,
  //       pageTitle: 'Admin Products',
  //       path:'admin/products',
  //       hasProducts: products.length > 0 ? true : false,
  //       activeShop: true,
  //       productCSS: true
  //     }); //Working Fine FOr Pug But One More Param Added on Next Line
  // });

  // New Work With Sequelize
  // With User getProducts Way
  req.user.getProducts()

  // With findAll Product Way
  // Product.findAll()
  .then(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path:'admin/products',
      hasProducts: products.length > 0 ? true : false,
      activeShop: true,
      productCSS: true
    });
  })
  .catch(err => console.log(err));
}
