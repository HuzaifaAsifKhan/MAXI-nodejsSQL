// // const products = [];

// const db = require('../util/database');

// const fs  = require('fs');
// const path  = require('path');
// const Cart = require('./cart');

// const p = path.join(
//   path.dirname(require.main.filename),
//   'data',
//   'products.json'
// );

// const getProductsFromFile = (cb) => {
//   fs.readFile(p, (err, data)=>{
//     if(err){
//       cb([]);
//     } else {
//       cb(JSON.parse(data));
//     }
//   });
// }


// module.exports = class Product {
//   constructor(id, title, imageUrl, description, price){
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//     this.id = id;
//   }



//   save(cb){
//     // getProductsFromFile(products => {
//     //   if(this.id) {
//     //     const existingProductIndex = products.findIndex(prod => prod.id === this.id);
//     //     const updatedProducts = [...products];
//     //     updatedProducts[existingProductIndex] = this;
//     //     fs.writeFile(p, JSON.stringify(updatedProducts), (err) =>{
//     //       console.log(err, 'Write Error')
//     //     })
//     //   } else {
//     //     this.id = Math.random().toString();
//     //     products.push(this);
//     //     fs.writeFile(p, JSON.stringify(products), (err) =>{
//     //       console.log(err, 'Write Error')
//     //       cb(true);
//     //     });
//     //   }
//     // });

//     // New Work
//     return db.execute(
//       'INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
//       [this.title, this.price, this.imageUrl, this.description]
//     );
//   }


//   static deleteById(id){
//     getProductsFromFile(products => {
//       const product = products.find(p => p.id === id);
//       console.log(product, 'deleteProduct')
//       if(!product){
//         return;
//       }
//       const updatedProducts = products.filter(p => p.id !== id);
//       fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
//         console.log(err, 'Write Error');
//         if(!err){
//           Cart.deleteProduct(id, product.price)
//         }
//       })
//     });
//   }



//   static fetchAll(cb){
//     // getProductsFromFile(cb);

//     // new Work
//     return db.execute('SELECT * FROM products');
//   }

//   static findById(id, cb){
//     // getProductsFromFile(products => {
//     //   const product = products.find(p => p.id === id);
//     //   cb(product);
//     // });
//     // New Work

//     return db.execute('SELECT * FROM products WHERE products.id = ?', [id])

//   }
// }











// New Work With Sequelize
const Sequelize = require('sequelize');
const sequelize = require('../util/database');


const Product = sequelize.define('product', {
  id:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }

})


module.exports = Product;
