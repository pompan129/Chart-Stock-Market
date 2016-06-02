/**
 * Created by fazbat on 5/31/2016.
 */
var io = require('socket.io');
var mongoose = require ("mongoose");
var Stock = require("./models/stocks");//Stock model for mongodb/mongoose

mongoose.connect("mongodb://fazbat:" + process.env.DB_PASS + "@ds019482.mlab.com:19482/kj-db");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));//check connection for errors
db.once('open', function() {
    console.log("connected to mongoLab")
});

module.exports = function(server) {
    const socketServer = io(server);
    const connections = [];
    var userId = 0;

    socketServer.on('connection', (socket) => {
        connections.push(socket);
        userId += 1;

        //send initial stock information to clients
        refreshStocksOnClients([socket]);

        socket.on('newStockSymbol', (symbol) => {
            const newStock = new Stock({name:symbol});

            newStock.save((err,stock)=>{//save new stock to DB
                if(err){console.log("ERROR saveing stock",symbol,err);}
                else{refreshStocksOnClients(connections,socket)}
            })
        });

        socket.on('removeStockSymbol', (symbol) => {
            Stock.remove({ name: symbol.toUpperCase() }, function (err) {
                if (err) {console.log("Error removing stock from DB:",err);}
                else{refreshStocksOnClients(connections,socket)}
            });
        });

        socket.on('disconnect', () => {
            const index = connections.indexOf(socket);
            connections.splice(index, 1);
        });
    });
};

function refreshStocksOnClients(connections,excludedConnection){
    Stock.find({},{name:1,_id:0},(err,docs)=>{
        if(err){console.log("Error retrieving stocks from DB:",err);}//todo: more robust error handing
        else{
            const stock_symbols = docs.map((obj)=>{return obj.name;});
            connections.forEach((connectedSocket) => {
                if (connectedSocket !== excludedConnection) {
                    connectedSocket.emit('update-stocks', stock_symbols);
                }
            });
        }
    });
}
