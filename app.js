//importing libraries
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const rootDir = require("./utils/path");

// importing routes
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// importing controlles
const { get404 } = require("./controllers/error");
const sequelize = require("./utils/database");

// importing models
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

// configuring relations between models
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
Product.belongsToMany(Cart, { through: CartItem });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });

// configuring server & express
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// setting up html-template generator
app.set("view engine", "pug");
app.set("views", "views"); // it's views by default tho

// serving statis folder (css)
app.use(express.static(path.join(rootDir, "public")));

// setting user info to request
app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

// registering routes
app.use("/admin", adminRoutes);
app.use(shopRoutes);

// handling 404
app.use(get404);

// Creating database
sequelize
  .sync()
  .then(() => {
    return User.findByPk(1);
  })
  .then((res) => {
    if (!res) {
      console.log("creating user");
      return User.create({ name: "Ashur", email: "ashur@gmail.com" });
    }
    return res;
  })
  // .then((user) => {

  //   return user.createCart();
  // })
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log("ERROR");
    console.log(err);
  });
