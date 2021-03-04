// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const isAuthenticated = require("../config/middleware/isAuthenticated.js");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // console.log(req.User);
    if (req.user) {
      return res.redirect("/packages");
    }
    res.render("login");
  });

  // Route for rendering delivered page
  app.get("/delivered", (req, res) => {
    // console.log(req.User);
    if (req.user) {
      return res.render("delivered");
    }
    res.redirect("/delivered");
  });

  app.get("/signup", (req, res) => {
    if (req.user) {
      return res.redirect("/packages");
    }
    res.render("signup");
  });

  // Route to render newpackage page
  app.get("/newpackage", (req, res) => {
    if (req.user) {
      return res.render("newpackage");
    }
    res.redirect("/");
  });

  // Route to get user's pending packages
  app.get("/packages/:id", isAuthenticated, async (req, res) => {
    const shipments = await db.shipments.findAll({
      where: {
        user: req.params.id
      },
      raw: true
    });
    console.log(shipments);
    const trackShipments = shipments.map(shipment => {
      return {
        ...shipment,
        trackingLink: `https://www.google.com/search?q=${shipment.tracking}`
      };
    });
    console.log(trackShipments);
    res.render("index", { shipments: trackShipments });
  });

  // Route for getting orders in delivered tab
  app.get("/delivered/:id", isAuthenticated, async (req, res) => {
    const shipments = await db.shipments.findAll({
      where: {
        user: req.params.id
      },
      raw: true
    });
    const trackShipments = shipments.map(shipment => {
      return {
        ...shipment,
        trackingLink: `https://www.google.com/search?q=${shipment.tracking}`
      };
    });
    console.log(trackShipments);
    res.render("delivered", { shipments: trackShipments });
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

  // Post route for creating user
  app.post("/api/signup", (req, res) => {
    // console.log(req.body.email);
    db.User.create({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    })
      .then(() => {
        res.send(true);
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out and taking them to login page
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // For future functionality, Route for getting some data about our user to be used client side
  // app.get("/api/user_data", (req, res) => {
  //   if (!req.user) {
  //     res.json({});
  //   } else {
  //     res.json({
  //       email: req.user.email,
  //       id: req.user.id
  //     });
  //   }
  // });

  // ----- Start of Shipments Routes -----

  // Route for adding new package to the database
  app.post("/api/newpackage", (req, res) => {
    // console.log(req.body.delivered);
    db.shipments
      .create({
        user: req.body.user,
        title: req.body.title,
        description: req.body.description,
        tracking: req.body.tracking,
        carrier: req.body.carrier,
        delivered: req.body.delivered
      })
      .then(dbShipments => res.json(dbShipments));
  });

  // Route for deleting Shipment/ **Not yet implemented**
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
