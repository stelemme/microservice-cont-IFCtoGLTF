const express = require("express");

const app = express();

// The port on which the Microservice runs
const PORT = 4000;

// Assigning the routes to the "/" URI
const homeRouter = require("./routes/home");
app.use("/", homeRouter);

// Assigning the routes to the "/cnt" URI
const cntRouter = require("./routes/cnt");
app.use("/cnt", cntRouter);

app.listen(PORT, () => {
  console.log(`Microservice available at: http://localhost:${PORT}/`);
});
