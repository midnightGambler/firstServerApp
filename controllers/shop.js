const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getAdminProducts = (req, res) => {
  Product.fetchProducts()
    .then((products) => {
      res.render("admin/products-list", {
        docTitle: "Admin Products",
        path: "/admin/products",
        products,
      });
    })
    .catch((err) => {
      res.render("admin/products-list", {
        docTitle: "Admin Products",
        path: "/admin/products",
        products: [],
      });
    });
};

exports.getProducts = (req, res) => {
  Product.fetchProducts()
    .then((products) => {
      res.render("shop/products-list", {
        docTitle: "Shop",
        path: "/products",
        products,
      });
    })
    .catch((err) => {
      res.render("shop/products-list", {
        docTitle: "Shop",
        path: "/products",
        products: [],
      });
    });
};

exports.getProduct = (req, res, next) => {
  const { productID } = req.params;
  Product.findById(productID)
    .then((product) => {
      console.log(product);
      res.render("shop/product-detail", {
        docTitle: product.title,
        path: "/products",
        ...product,
      });
    })
    .catch((_) => next());
};

exports.getCart = (req, res) => {
  res.render("shop/cart", {
    path: "/cart",
    docTitle: "Cart",
  });
};

exports.postCart = (req, res) => {
  const { productID } = req.body;

  Product.findById(productID).then((product) => {
    const price = product.price;

    Cart.addProduct(productID, price);

    res.render("shop/cart", {
      path: "/cart",
      docTitle: "Cart",
    });
  });
};

exports.getOrders = (req, res) => {
  res.render("shop/orders", {
    path: "/orders",
    docTitle: "Orders",
  });
};

exports.getCheckout = (req, res) => {
  res.render("shop/checkout", {
    docTitle: "Checkout",
    path: "/checkout",
  });
};

exports.getIndex = (req, res) => {
  Product.fetchProducts()
    .then((products) => {
      res.render("shop/products-list", {
        docTitle: "Shop",
        path: "/",
        products,
      });
    })
    .catch((err) => {
      res.render("shop/products-list", {
        docTitle: "Shop",
        path: "/",
        products: [],
      });
    });
};
