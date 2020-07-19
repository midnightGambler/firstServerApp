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
    .then(([rows, fieldsData]) => {
      res.render("shop/products-list", {
        docTitle: "Shop",
        path: "/products",
        products: rows,
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
    .then(([product]) => {
      res.render("shop/product-detail", {
        docTitle: product.title,
        path: "/products",
        ...product[0],
      });
    })
    .catch((err) => {
      next();
    });
};

exports.getCart = (req, res) => {
  Cart.getCart().then((cart) => {
    Product.fetchProducts().then((products) => {
      const cartProducts = cart.products.map((cartProduct) => {
        const productInfo = products.find(
          (product) => product.productID === cartProduct.productID
        );
        return { ...cartProduct, ...productInfo };
      });
      res.render("shop/cart", {
        path: "/cart",
        docTitle: "Cart",
        cartProducts,
        totalPrice: cart.totalPrice,
      });
    });
  });
};

exports.postCart = (req, res) => {
  const { productID } = req.body;

  Product.findById(productID).then((product) => {
    const price = product.price;

    Cart.addProduct(productID, price);

    res.redirect("/cart");
  });
};

exports.postCartDeleteItem = (req, res) => {
  const { productID } = req.body;

  Product.findById(productID).then((product) => {
    Cart.deleteProduct(productID, product.price);
    res.redirect("/cart");
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
    .then(([rows, fieldData]) => {
      res.render("shop/products-list", {
        docTitle: "Shop",
        path: "/",
        products: rows,
      });
    })
    .catch((err) => {
      console.log(err);
      res.render("shop/products-list", {
        docTitle: "Shop",
        path: "/",
        products: [],
      });
    });
};
