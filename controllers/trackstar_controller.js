// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const isAuthenticated = require("../config/middleware/isAuthenticated.js");

module.exports = function(app) {
  app.get("/", (req, res) => {
    if (req.user) {
      return res.redirect("/packages");
    }
    res.render("login");
  });

  app.get("/signup", (req, res) => {
    if (req.user) {
      return res.redirect("/packages");
    }
    res.render("signup");
  });

  app.get("/newpackage", (req, res) => {
    if (req.user) {
      return res.render("newpackage");
    }
    res.redirect("/");
  });

  app.get("/packages", isAuthenticated, (req, res) => {
    res.render("index");
  });

  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.json(req.user);
  });

  app.get("/api/user/:email", async (req, res) => {
    // console.log(req.params.email);
    const username = await db.User.findOne({
      where: { email: req.params.email }
    });
    // console.log(username.username);
    res.send(username.username);
  });

  app.post("/api/signup", (req, res) => {
    // console.log(req.body.email);
    db.User.create({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    })
      .then(() => {
        // res.redirect(307, "/");
        res.send(true);
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      res.json({});
    } else {
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  // ----- Start of Shipments Routes -----

  // Route for adding new package to the database
  app.post("/api/newpackage", (req, res) => {
    db.shipments
      .create({
        title: req.body.title,
        description: req.body.description,
        tracking: req.body.tracking,
        carrier: req.body.carrier
      })
      .then(dbShipments => res.json(dbShipments));
  });

  // Route for getting user's pending packages
  app.get("/api/shipments/:id", async (req, res) => {
    const request = await db.shipment.findAll({
      where: {
        id: req.params.id,
        delivered: false
      },
      order: [["expDelivery", "DESC"]]
    });
    // return the result to the user with res.json
    // console.log(request);
    return res.json(request);
  });

  // Route for getting user's delivered packages
  app.get("/api/archive/:id", async (req, res) => {
    const request = await db.shipment.findAll({
      where: {
        id: req.params.id,
        delivered: true
      },
      order: [["expDelivery", "DESC"]]
    });
    // return the result to the user with res.json
    // console.log(request);
    return res.json(request);
  });

  // Route for deleting Shipment
  app.delete("/api/shipments/:id", (req, res) => {
    db.shipments
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(dbPost => res.json(dbPost));
  });
};
