const express = require("express");
const router = express.Router();

// Importing the controllers
const {
  ifcToGltfGET,
  ifcToGltfPOST,
} = require("../controllers/ifcToGltf");

// Assigning controllers to the "/cont/ifc-to-gltf" URI
router.get("/ifc-to-gltf", ifcToGltfGET);
router.post("/ifc-to-gltf", ifcToGltfPOST);

module.exports = router;
