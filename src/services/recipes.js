const fs = require("fs").promises;
const path = require("path");

const recipesFilePath = path.join(__dirname, "../../db/recipes.json"); // Contruct the path to the recipes data

//get all the data in the db file
const getAll = async () => JSON.parse(await fs.readFile(recipesFilePath));

const get = async (id) => {
    const recipes = await getAll();
    return recipes.find((recipe) => recipe.id === parseInt(id));
};

const save = async (recipe) => {

    //get all the recipes from the data, this return a json format
    const recipes = await getAll()

    //new recipe id is length of the data array plus 1
    recipe.id = recipes.length + 1

    recipes.push(recipe)

    await fs.writeFile(recipesFilePath, JSON.stringify(recipes))

    return recipe
}

const update = async (id, updated) => {
    const recipes = await getAll()
  
    //sets the update body property id to the param id
    updated.id = parseInt(id)
  
    //if there's an element with an id property whose value matches the param id, replace it with the updated object
    const updatedRecipes = recipes.map((recipe) => {
      return recipe.id === parseInt(id) ? updated : recipe
    });
  
    //overwrite the file with the new data
    await fs.writeFile(recipesFilePath, JSON.stringify(updatedRecipes))
  
    return updated
  };

  const remove = async (id) => {
    const recipes = await getAll()

    //remove any element whose property id matches param id
    const newRecipes = recipes
    .map((recipe) => {
      return recipe.id === parseInt(id) ? null : recipe;
    })
    .filter((recipe) => recipe !== null);

  await fs.writeFile(recipesFilePath, JSON.stringify(newRecipes));
  }

module.exports = {
 getAll, get, save, update, remove
};