const service = require("../services/recipes")

//middleware for check if recipe exists
const recipeExist = async (req, res, next) => {
    const recipe = await service.get(req.params.id)
    if (recipe === undefined) {
        const err = new Error("Recipe not found");
        err.statusCode = 404
        next(err)
      }else{
        res.locals.recipe = recipe
        next()
      }
}

//gets all recipes
const getAllRecipes = async (req, res, next) => {
    try{
        res.json({data: await service.getAll()})
    }catch (error){
        next(error)
    }
}

//get a single recipe
const getRecipe = async (req, res, next) => {
    try {
      res.json({ data: res.locals.recipe }); //this is the recipe received from the middleware
    } catch (error) {
      next(error);
    }
  };

//add a recipe and save it
const saveRecipe = async (req, res, next) => {
    try {
      
      const {
        name,
        healthLabels,
        cookTimeMinutes,
        prepTimeMinutes,
        ingredients,
      } = req.body;
  
      const newRecipe = {
        name,
        healthLabels: [...healthLabels], 
        cookTimeMinutes,
        prepTimeMinutes,
        ingredients: [...ingredients], 
      };
  
      res.status(201).json({ data: await service.save(newRecipe) });
    } catch (error) {
      next(error);
    }
  };

  //update a recipe and re save the entire file
  const updateRecipe = async (req, res, next) => {
    try {

      const {
        id,
        name,
        healthLabels,
        cookTimeMinutes,
        prepTimeMinutes,
        ingredients,
      } = req.body;
  
      const updated = await service.update(req.params.id, {
        id,
        name,
        healthLabels: [...healthLabels],
        cookTimeMinutes,
        prepTimeMinutes,
        ingredients: [...ingredients],
      });
  
      res.json({ data: updated });
    } catch (error) {
      next(error);
    }
  };

  //delete the recipe
  const deleteRecipe = async (req, res, next) => {
    try {

      await service.remove(req.params.id);
      res.sendStatus(204)
    } catch (error) {
      next(error);
    }
  };

  //all the functions that have array use the recipe exists middle ware checker before they run
module.exports = {
    getAllRecipes,
    getRecipe: [recipeExist, getRecipe], 
    updateRecipe: [recipeExist, updateRecipe], 
    saveRecipe, 
    deleteRecipe: [recipeExist, deleteRecipe], 
}