const fs = require("fs");
const rootDir = require("../utils/path");
const path = require("path");
const Cart = require("./cart");
const productsPath = path.join(rootDir, "data", "products.json");

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    this.productID = Math.random().toString();
    fs.readFile(productsPath, (err, fileContent) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileContent);
      }
      products.push(this);
      fs.writeFile(productsPath, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static updateProduct(id, updatedFields) {
    return this.fetchProducts().then((products) => {
      const updatedProducts = products.map((product) => {
        if (product.productID === id) {
          return { productID: id, ...updatedFields };
        }
        return product;
      });
      fs.writeFile(productsPath, JSON.stringify(updatedProducts), (err) =>
        console.log(err)
      );
    });
  }

  static fetchProducts() {
    return new Promise((res, rej) => {
      fs.readFile(productsPath, (err, fileContent) => {
        err ? rej() : res(JSON.parse(fileContent));
      });
    });
  }

  static findById(id) {
    return this.fetchProducts().then((products) => {
      const searchedProduct = products.find(
        (product) => product.productID === id
      );
      if (!searchedProduct) {
        throw new Error();
      }
      return searchedProduct;
    });
  }

  static remove(id) {
    return this.fetchProducts().then((products) => {
      let productPrice;

      const updatedProducts = products.filter((product) => {
        if (product.productID === id) {
          productPrice = product.price;
          return false;
        }
        return true;
      });
      fs.writeFile(productsPath, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
          Cart.deleteProduct(id, productPrice);
        }
      });
    });
  }
};
