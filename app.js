const express = require("express");
const hbs = require("hbs");

const app = express();

app.use(express.static('public')); // Make everything inside of public/ available

app.set("views", __dirname + "/views"); //tells our Express app where to look for our views
app.set("view engine", "hbs"); //sets HBS as the template engine

hbs.registerPartials(__dirname + "/views/partials"); //tell HBS which directory we use for partials



// GET /
app.get("/", (req, res, next) => {
    res.render("home-page");
});


// GET /contact
app.get("/contact", (req, res, next) => {
    res.render("contact-page");
});



// GET /pizzas/margarita
app.get("/pizzas/margarita", (req, res, send) => {

    const pizzaDetails = {
        title: 'Pizza Margarita',
        price: 12,
        recommendedDrink: 'beer',
        imageFile: 'pizza-margarita.jpg',
        ingredients: ['mozzarella', 'tomato sauce', 'basilicum'],
    };

    res.render("product", pizzaDetails);
});



// GET /pizzas/veggie
app.get("/pizzas/veggie", (req, res, send) => {

    const pizzaDetails = {
        title: 'Veggie Pizza',
        price: 15,
        recommendedDrink: 'power smoothie',
        imageFile: 'pizza-veggie.jpg',
        ingredients: ['cherry tomatoes', 'basilicum', 'Olives'],
    };

    res.render("product", pizzaDetails)
});




// GET /pizzas/seafood
app.get("/pizzas/seafood", (req, res, send) => {

    const pizzaDetails = {
        title: 'Seafood Pizza',
        recommendedDrink: 'white wine',
        imageFile: 'pizza-seafood.jpg',
        ingredients: ['tomato sauce', 'garlic', 'prawn'],
    };

    res.render("product", pizzaDetails);
});


app.listen(3000, () => { console.log("server listening on port 3000...")});