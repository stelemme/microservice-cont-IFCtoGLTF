const express = require("express");
const router = express.Router();


// Importing the controllers
const {
  descriptionGET,
} = require("../controllers/home");

// Assigning a controller to the "/" URI
router.get("/", descriptionGET);

module.exports = router;