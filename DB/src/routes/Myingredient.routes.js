const express = require("express");
const router = express.Router();
const {
    getIngredients,
    addIngredient,
    updateIngredient,
    deleteIngredient,
    updateStockAfterCooking,
  } = require("../controller/Myingredient.controller");

router.get("/", getIngredients);
router.post("/", addIngredient);
router.put("/:id", updateIngredient);
router.delete("/:id", deleteIngredient);
router.post("/update-stock", updateStockAfterCooking);

module.exports = router;
