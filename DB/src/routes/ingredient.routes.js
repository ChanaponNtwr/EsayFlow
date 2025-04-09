const express = require('express');
const router = express.Router();
const { addIngredientToJson } = require('../controller/Ingredient.controller');
const {uploadImage }= require('../middleware/validateImage.middleware');  // ใช้ middleware สำหรับอัปโหลดภาพ

// Route สำหรับเพิ่มวัตถุดิบ
router.post('/add', uploadImage, addIngredientToJson);

module.exports = router;
