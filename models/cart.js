const rootDir = require("../utils/path");
const path = require("path");
const fs = require("fs");

const dataPath = path.join(rootDir, "data", "cart.json");

module.exports = class Cart {
  static addProduct(id, price) {
    fs.readFile(dataPath, (err, fileContent) => {
      let cart = {
        products: [],
        totalPrice: 0,
      };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      const existingProductIndex = cart.products.findIndex(
        (product) => product.productID === id
      );
      // adding new product
      if (existingProductIndex >= 0) {
        // if already exist in the cart
        const existingProduct = cart.products[existingProductIndex];
        cart.products[existingProductIndex] = {
          productID: id,
          qty: existingProduct.qty + 1,
        };
      } else {
        // if it's new product in the cart
        cart.products = [...cart.products, { productID: id, qty: 1 }];
      }

      cart.totalPrice = cart.totalPrice + +price;

      fs.writeFile(dataPath, JSON.stringify(cart), (err) => console.log(err));
    });
  }

  static deleteProduct(id) {
    fs.readFile(dataPath, (cart) => {
      const updatedCart = cart.filter((product) => product.productID !== id);

      fs.writeFile(dataPath, JSON.stringify(updatedCart), (err) => {
        console.log(err);
      });
    });
  }
};
