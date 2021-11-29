const http = require('http');
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const path = require('path');



app.set('view engine', 'ejs');


// const expressHbs = require('express-handlebars');
// app.engine('handlebars', expressHbs({
//   extname: "hbs",
//   defaultLayout: false
// }));
// app.engine('handlebars', expressHbs({
//   extname: "handlebars",
//   defaultLayout: 'main-layout',
//   layoutsDir: 'views/layout/'
// }))
// app.set('view engine', 'handlebars');



// app.set('view engine', 'pug');
app.set('views', 'views');



app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorsController = require('./controllers/error');


// const db = require('./util/database');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');



app.use((req, res, next) => {
  User.findByPk(1).then((user) => {
    req.user = user;
    next();
  }).catch(err => console.log(err));
});

// app.use('/admin', adminRoutes.routes);
app.use('/admin', adminRoutes);
app.use('/shop', shopRoutes);


// db.execute('SELECT * FROM products')
// .then(result => {
//   console.log(result[0], result[1]);
// })
// .catch(err => {
//   console.log(err);
// });

// app.use(require('./routes'));





// app.use((req, res, next) => {
//   // res.status(404).send('<h1>404 Page Not Found</h1>')
//   // res.status(404).sendFile(path.join(__dirname, 'views','404.html')) // Working Fine With HTML file

//   res.status(404).render('404', {pageTitle: 'Page Not Found', path:'/'})
// });
app.use(errorsController.get404);




// const server = http.createServer(app);
// server.listen(3001);


Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});
User.hasMany(Order);
Order.belongsToMany(Product, {through: OrderItem});


sequelize
.sync()
// .sync({force: true})
.then(result => {
  return User.findByPk(1);
})
.then(user =>{
  if(!user){
    User.create({name:"Huzaifa", email:"huzaifa@gmail.com"});
  }
  return user;
})
.then(user => {
  return user.createCart();
  // console.log(user);
})
.then(cart => {
  app.listen(3001);
})
.catch(err => console.log(err));
