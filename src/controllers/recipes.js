const service = require("../services/recipes")

const recipeExist = async (req, res, next) => {
    const recipe = await service.get(req.params.id)

    if (recipe === undefined) {
        const err = new Error("Recipe not found");
        err.statusCode = 404
        next(err)
      }else{
        res.local.recipe = recipe
        next()
      }
}

const getAllRecipes = async (req, res, next) => {
    try{
        res.json({data: await service.getAll()})
    }catch (error){
        next(error)
    }
}

const getRecipe = async (req, res, next) => {
    try {
      res.json({ data: res.local.recipe });
    } catch (error) {
      next(error);
    }
  };


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

  const updateRecipe = async (req, res, next) => {
    try {
       await service.get(req.params.id);

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

  const deleteRecipe = async (req, res, next) => {
    try {
       await service.get(req.params.id);
  
      await service.remove(req.params.id);
      res.sendStatus(204)
    } catch (error) {
      next(error);
    }
  };

module.exports = {
    getAllRecipes,
    getRecipe: [recipeExist, getRecipe], 
    updateRecipe: [recipeExist, updateRecipe], 
    saveRecipe, 
    deleteRecipe: [recipeExist, deleteRecipe], 
}