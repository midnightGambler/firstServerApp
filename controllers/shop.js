const Product = require("../models/product");

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
  Product.findAll()
    .then((products) => {
      res.render("shop/products-list", {
        docTitle: "Shop",
        path: "/products",
        products,
      });
    })
    .catch((err) => {
      console.log(err);
      res.render("shop/products-list", {
        docTitle: "Shop",
        path: "/products",
        products: [],
      });
    });
};

exports.getProduct = (req, res, next) => {
  const { productID } = req.params;
  Product.findByPk(productID)
    .then((product) => {
      res.render("shop/product-detail", {
        docTitle: product.title,
        path: "/products",
        product,
      });
    })
    .catch((err) => {
      next();
    });
};

exports.getCart = (req, res) => {
  req.user
    .getCart()
    .then((cart) => cart.getProducts())
    .then((products) => {
      res.render("shop/cart", {
        path: "/cart",
        docTitle: "Cart",
        cartProducts: products,
        totalPrice: 0,
      });
    })
    .catch((err) => {
      res.render("shop/cart", {
        path: "/cart",
        docTitle: "Cart",
        cartProducts: [],
        totalPrice: 0,
      });
    });
};

exports.postCart = (req, res) => {
  const { id } = req.body;

  let userCart;
  let newQuantity;

  req.user
    .getCart()
    .then((cart) => {
      userCart = cart;
      return cart.getProducts({ where: { id } });
    })
    .then((products) => {
      let product;
      newQuantity = 1;

      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        newQuantity = product.cartItem.quantity + 1;
        return product;
      }

      return Product.findByPk(id);
    })
    .then((product) => {
      return userCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then((_) => {
      res.redirect("/cart");
    })
    .catch((err) => console.log("ADDING PRODUCT TO CART ERROR: ", err));
};

exports.postCartDeleteItem = (req, res) => {
  const { id } = req.body;

  req.user
    .getCart()
    .then((cart) => cart.getProducts({ where: { id } }))
    .then(([product]) => product.cartItem.destroy())
    .then((_) => {
      res.redirect("/cart");
    })
    .catch((err) => console.log("ERROR WHILE DELETING CART ITEM: ", err));
};

exports.getOrders = (req, res) => {
  req.user
    .getOrders({ include: ["products"] })
    .then((orders) => {
      console.log(orders);
      res.render("shop/orders", {
        path: "/orders",
        docTitle: "Orders",
        orders,
      });
    })
    .catch((err) => console.log("ERROR WHILE FETCHING ORDERS: ", err));
};

exports.postOrder = (req, res) => {
  console.log("creating order");
  let cartProducts;
  let userCart;
  req.user
    .getCart()
    .then((cart) => {
      userCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      cartProducts = products;
      return req.user.createOrder();
    })
    .then((order) =>
      order.addProducts(
        cartProducts.map((product) => {
          console.log(product.cartItem.quantity);
          product.orderItem = { quantity: product.cartItem.quantity };
          return product;
        })
      )
    )
    .then((_) => userCart.setProducts(null))
    .then(() => res.redirect("/orders"))
    .catch((err) => {
      console.log("ERROR WHILE CREATING ORDER: ", err);
    });
};

exports.getCheckout = (req, res) => {
  res.render("shop/checkout", {
    docTitle: "Checkout",
    path: "/checkout",
  });
};

exports.getIndex = (req, res) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/products-list", {
        docTitle: "Shop",
        path: "/",
        products,
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
