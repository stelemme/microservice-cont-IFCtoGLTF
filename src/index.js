const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// The port on which the Microservice runs
const PORT = 3000;

app.use(bodyParser.json());

// Assigning the routes to the "/" URI
const homeRouter = require("./routes/home");
app.use("/", homeRouter);

// Assigning the routes to the "/cont" URI
const contRouter = require("./routes/cont");
app.use("/cont", contRouter);

app.listen(PORT, () => {
  console.log(`Microservice available at: http://localhost:${PORT}/`);
});
