const express = require("express");
const router = express.Router();
const {
    getMembers,
    addMember,
    deleteMember,
  } = require("../controller/Member.controller");

router.get("/", getMembers);
router.post("/add", addMember);
router.delete("/:id", deleteMember);

module.exports = router;
