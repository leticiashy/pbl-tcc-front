var express = require("express");
var path = require("path");
var serveStatic = require("serve-static");
var morgan = require("morgan");

var app = express();

app.use(serveStatic(__dirname + "/../dist"));
app.use(morgan("tiny"));

var port = process.env.PORT || 8000;

app.listen(port);

console.log("server started " + port);

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "/../dist/index.html"), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});
