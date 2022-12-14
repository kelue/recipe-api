const express = require("express")

const router = express.Router()


const { getAllRecipes,
     getRecipe, 
     saveRecipe, 
     updateRecipe, 
     deleteRecipe 
} = require("../controllers/recipes")

const { authenticate: auth } = require("../middleware/auth")

// router.get("/", getAll)
// router.post("/", save)
// router.get("/:id", get);
// router.put("/:id", update);
// router.delete("/:id", remove);

//Improved routing using router.route()
// GET and POST requests for /api/v1/recipes
router.route("/").get(getAllRecipes).post(auth(), saveRecipe)

// GET, PUT and DELETE requsts for /api/v1/recipes
router.route("/:id").get(getRecipe).put(auth(), updateRecipe).delete(auth(), deleteRecipe)

module.exports = router