/**
 * Created by fazbat on 5/31/2016.
 */
var io = require('socket.io');

let stock_symbols = ["AAPL","MMM","ENTG"];//todo

module.exports = function(server) {
    const socketServer = io(server);
    const connections = [];
    var userId = 0;

    socketServer.on('connection', (socket) => {

        connections.push(socket);
        userId += 1;

        console.log("connection made",userId);//todo
        socket.emit('update-stocks', stock_symbols);
        console.log("stocks emited:",userId,stock_symbols);//todo
        socket.on('newStockSymbol', (symbol) => {
            stock_symbols.push(symbol);
            console.log("new newStockSymbol recieved on server",symbol);//todo
            connections.forEach((connectedSocket) => {
                if (connectedSocket !== socket) {
                    connectedSocket.emit('update-stocks', stock_symbols);//todo
                }
            });
        });

        socket.on('removeStockSymbol', (symbol) => {
            stock_symbols = stock_symbols.filter((sym)=>{
                return symbol !== sym;
            });
            console.log("removeStockSymbol recieved on server",symbol);//todo
            connections.forEach((connectedSocket) => {
                if (connectedSocket !== socket) {
                    connectedSocket.emit('update-stocks', stock_symbols);//todo
                }
            });
        });

        socket.on('disconnect', () => {
            const index = connections.indexOf(socket);
            connections.splice(index, 1);
            console.log(userId,"has disconnected");//todo
        });
    });
};
