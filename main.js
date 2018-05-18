/**
 * Created by fazbat on 5/25/2016.
 */

var express = require("express");
var app = express();
var http = require("http").Server(app);
var socketServer = require("./server/socket_server");
var cors = require("cors");

app.use(express.static(__dirname + "/client"));
app.use(cors());

app.get("/", function(req, res) {
  res.sendFile("/index.html");
});

app.set("port", process.env.PORT || 5000);

const webServer = app.listen(app.get("port"), function() {
  console.log("Node app is running on port", app.get("port"));
});

socketServer(webServer);
