const path = require("path");

const descriptionGET = (req, res) => {
  var options = {
    root: path.join(__dirname, "..", "..", "public"),
    headers: {
      "Server": "My Node.js Server",
      "Content-Type": "text/html",
    },
  };
  res.status(200).sendFile("home.html", options);
};

module.exports = {
  descriptionGET,
};
