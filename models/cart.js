const rootDir = require("../utils/path");
const path = require("path");
const fs = require("fs");

const dataPath = path.join(rootDir, "data", "cart.json");

module.exports = class Cart {
  static getCart() {
    return new Promise((res) => {
      fs.readFile(dataPath, (err, fileContent) => {
        if (err) {
          throw new Error();
        }
        res(JSON.parse(fileContent));
      });
    });
  }

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

  static deleteProduct(id, price) {
    fs.readFile(dataPath, (err, fileContent) => {
      if (err) return;

      const cart = JSON.parse(fileContent);

      cart.products = cart.products.filter((product) => {
        if (product.productID === id) {
          cart.totalPrice = cart.totalPrice - product.qty * price;
          return false;
        }
        return true;
      });

      fs.writeFile(dataPath, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }
};
