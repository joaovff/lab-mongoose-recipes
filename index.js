const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");
const { insertMany } = require("./models/Recipe.model");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

//Method 1 : Using Async Await

const manageRecipes = async () => {
  try {
    // Connection to the database "recipe-app"
    const dbConnection = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${dbConnection.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones

    await Recipe.deleteMany();

    const newRecipe = await Recipe.create({
      title: "Rice",
      level: "Amateur Chef",
      ingredients: ["1 cup of rice", "2 cups of water", "salt to taste"],
      cuisine: "International",
      dishType: "other",
      image: "https://images.media-allrecipes.com/images/75131.jpg",
      duration: 15,
      creator: "Joao",
    });
    console.log(newRecipe.title);

    const insertMany = await Recipe.insertMany([...data]);

    insertMany.forEach((index) => {
      console.log(index.title);
    });

    const title = { title: "Rigatoni alla Genovese" };
    const updated = await Recipe.findOneAndUpdate(title, { duration: 100 });
    console.log("Updated!");

    await Recipe.deleteOne({ title: "Carrot Cake" });

    // Run your code here, after you have insured that the connection was made
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.connection.close();
    console.log("Connection closed");
  }
};

manageRecipes();
