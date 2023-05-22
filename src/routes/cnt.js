const express = require("express");
const router = express.Router();


// Importing the controllers
const {
  descriptionGET,
  someOperationGET,
} = require("../controllers/controller");

// Assigning a controller to the "/op/" URI
router.get("/", descriptionGET);

// Assigning controllers to the "/op/some-operation" URI
router.get("/some-operation", someOperationGET);

module.exports = router;
