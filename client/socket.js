/**
 * Created by fazbat on 5/30/2016.
 */
import io from 'socket.io-client';
import {ADD_NEW_STOCK,REMOVE_STOCK,fetchStockData} from "./actions/index";

var socket = null;


export function stockMiddleware(store) {
    return (next) => (action) => {
        if (socket && action.type === ADD_NEW_STOCK) {
            socket.emit('newStockSymbol', action.payload.symbol);
        }

        if (socket && action.type === REMOVE_STOCK) {
            socket.emit('removeStockSymbol', action.payload);
        }
        
        return next(action);
    };
}


export default function (store) {
    socket = io.connect(`${location.protocol}//${location.host}`);

    socket.on('start', data => {
        console.log("started:", data);//todo
    });

    socket.on('message', data => {
        console.log( data, "received from server");//todo
    });

    socket.on('update-stocks', (stocks) => {
        store.dispatch(fetchStockData(stocks));
        console.log("in client/update-stocks",stocks);//todo
    });
}
