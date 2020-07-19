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

// configuring server & express
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// setting up html-template generator
app.set("view engine", "pug");
app.set("views", "views"); // it's views by default tho

// serving statis folder (css)
app.use(express.static(path.join(rootDir, "public")));

// registering routes
app.use("/admin", adminRoutes);
app.use(shopRoutes);

// handling 404
app.use(get404);

// Creating database
sequelize
  .sync()
  .then((_) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
