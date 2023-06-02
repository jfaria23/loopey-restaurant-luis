const express = require("express");
const hbs = require("hbs");
const Pizza = require("./models/Pizza.model");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public")); // Make everything inside of public/ available

app.set("views", __dirname + "/views"); //tells our Express app where to look for our views
app.set("view engine", "hbs"); //sets HBS as the template engine

hbs.registerPartials(__dirname + "/views/partials"); //tell HBS which directory we use for partials
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://127.0.0.1/loopeyRestaurant")
  .then((x) => {
    console.log(`Connected! Database name: "${x.connections[0].name}"`);
  })
  .catch((e) => console.log("error connecting to DB", e));

// GET /
app.get("/", (req, res, next) => {
  res.render("home-page");
});

// GET /contact
app.get("/contact", (req, res, next) => {
  res.render("contact-page");
});

// // GET /pizzas/margarita
// app.get("/pizzas/margarita", (req, res, send) => {
//   Pizza.findOne({ title: "margarita" })
//     .then((pizzaFromDB) => {
//       console.log(pizzaFromDB);
//       res.render("product", pizzaFromDB);
//     })
//     .catch((e) => console.log("error getting pizza from db"));
// });

// // GET /pizzas/veggie
// app.get("/pizzas/veggie", (req, res, send) => {
//   Pizza.findOne({ title: "veggie" })
//     .then((pizzaFromDB) => {
//       console.log(pizzaFromDB);
//       res.render("product", pizzaFromDB);
//     })
//     .catch((e) => {
//       console.log("error getting veggie from DB", e);
//     });
// });

// // GET /pizzas/seafood
// app.get("/pizzas/seafood", (req, res, send) => {
//   Pizza.findOne({ title: "seafood" })
//     .then((pizzaFromDB) => {
//       console.log(pizzaFromDB);
//       res.render("product", pizzaFromDB);
//     })
//     .catch((e) => {
//       console.log("error getting seafood from DB", e);
//     });
// });

// app.get("/pizzas/hawaiian", (req, res, send) => {
//   Pizza.findOne({ title: "hawaiian" })
//     .then((pizzaFromDB) => {
//       console.log(pizzaFromDB);
//       res.render("product", pizzaFromDB);
//     })
//     .catch((e) => {
//       console.log(pizzaFromDB, e);
//     });
// });

////// ROUTE PARAMS
app.get("/pizzas/:pizzaName", (req, res, next) => {
  Pizza.findOne({ title: req.params.pizzaName })
    .then((pizzaFromDB) => {
      console.log(pizzaFromDB);
      res.render("product", pizzaFromDB);
    })
    .catch((e) => console.log("error getting pizza from db"));
});

app.get("/drinks/:drinkName", (req, res, next) => {
  console.log(req.params);
  res.send(`display info about.... ${req.params.drinkName}`);
});

//GET /pizzas
app.get("/pizzas", (req, res, next) => {
  // console.log(req.query); // req.query is an object
  // console.log(typeof req.query.maxPrice); // we will receive a string
  console.log(req.query.maxPrice);
  let maximumPrice = req.query.maxPrice;
  maximumPrice = Number(req.query.maxPrice);

  let filter = {};
  if (maximumPrice) {
    filter = { price: { $lte: maximumPrice } };
  }

  Pizza.find(filter)
    .then((pizzas) => {
      const data = {
        pizzasArr: pizzas,
      };

      res.render("products-list", data);
    })
    .catch((e) => console.log("error", e));
});

// app.get("/drinks/beer", (req, res, next) => {
//     res.send("display info about beer")
// });

// app.get("/drinks/wine", (req, res, next) => {
//     res.send("display info about wine")
// });

// app.get("/drinks/gintonic", (req, res, next) => {
//     res.send("display info about gintonic")
// });

app.post("/login", req, res, (next) => {
  console.log("Luis is trying to log in");
  console.log(req.body);

  const email = req.body.emailaddress;
  const pwd = req.body.pwd;

  if (pwd === "1234") {
    res.send("welcome!");
  } else {
    res.send("wrong password");
  }
});

app.listen(3000, () => {
  console.log("server listening on port 3000...");
});
