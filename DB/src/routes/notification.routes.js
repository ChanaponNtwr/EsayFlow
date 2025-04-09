const express = require("express");
const router = express.Router();
const {
    getNotifications,
    deleteNotifications,
    addNotification
  } = require("../controller/Notifications.controller");

router.post("/", addNotification);
router.get("/", getNotifications);
router.delete("/", deleteNotifications);

module.exports = router;
