const Product = require("../models/product");

exports.getAddProduct = (req, res) => {
  res.render("admin/add-product", {
    docTitle: "Add Product",
    path: "/admin/add-product",
    product: {},
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, description, price } = req.body;
  req.user
    .createProduct({ title, imageUrl, description, price })
    .then((_) => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const { id } = req.params;
  req.user
    .getProducts({ where: { id } })
    .then(([product]) => {
      res.render("admin/add-product", { product, isEdit: true });
    })
    .catch((_) => next());
};

exports.postEditProduct = (req, res, next) => {
  const { title, imageUrl, description, price, id } = req.body;
  Product.findByPk(id)
    .then((product) => {
      return product.update({ title, imageUrl, description, price });
    })
    .then((_) => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const { id } = req.body;
  Product.destroy({ where: { id } })
    .then((_) => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.getAdminProducts = (req, res) => {
  req.user
    .getProducts()
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
