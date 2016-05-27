/**
 * Created by fazbat on 5/25/2016.
 */
var express = require('express');
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.use(express.static(__dirname + '/client'));

app.get("/",function (req,res){
    res.sendFile("/index.html");
});
/* todo websockets
io.on("connection",function (socket) {
    console.log("a user connected");

    socket.on("disconnect",function () {
        console.log("user has disconnected");
    })
})
*/
app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});