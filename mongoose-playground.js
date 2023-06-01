const {mongoose, Schema} = require("mongoose");

const Pizza = require("./models/Pizza.model");



mongoose.connect("mongodb://127.0.0.1:27017/loopeyRestaurant")
    .then((response) => {
        console.log(`Connected! Database Name: "${response.connections[0].name}"`);
        
        const pizzaOne = {
            title: "seafood",
            price: 18,
            dough: "classic"
        };

        //create a new document (a new pizza)
        return Pizza.create(pizzaOne)
    })
    .then( (pizzaFromDB) => {
        console.log("a new pizza was created with id...", pizzaFromDB._id);
        return Pizza.find({title: "margarita"})
    })
    .then( (pizzasArr) => {
        console.log("I currently have this amount of pizzas...", pizzasArr.length);
        console.log(pizzasArr);

        //Model.findByIdAndUpdate(id, update [, options])
        // Pizza.findByIdAndUpdate("6478ab28253a612d34d1b97f", {price: 20}, { returnDocument: 'after' })

        return Pizza.updateMany({price: {$gt: 12} }, {dough: "with garlic"});

    })
    .then( (result) => {
        console.log("luis, your pizzas were updated....")
        console.log(result)
    })
    .catch((err) => console.error("Error connecting to DB", err));

