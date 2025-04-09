const express = require("express");
const router = express.Router();
const {
    saveMenuSelection,
    getSelectedMenus
  } = require("../controller/Menu.controller");

router.post("/", saveMenuSelection);
router.get("/", getSelectedMenus);

module.exports = router;
