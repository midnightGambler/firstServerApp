const Product = require("../models/product");

exports.getAddProduct = (req, res) => {
  res.render("admin/add-product", {
    docTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, description, price } = req.body;
  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect("/");
};

exports.getEditProduct = (req, res, next) => {
  const { id } = req.params;
  Product.findById(id).then((product) =>
    res.render("admin/add-product", { ...product, isEdit: true })
  );
};

exports.postEditProduct = (req, res, next) => {
  const { title, imageUrl, description, price, productID } = req.body;
  Product.updateProduct(productID, {
    title,
    imageUrl,
    description,
    price,
  });
  res.redirect("/admin/products");
};

exports.postDeleteProduct = (req, res, next) => {
  const { productID } = req.body;
  Product.remove(productID);
  res.redirect("/admin/products");
};

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
