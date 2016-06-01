/**
 * Created by fazbat on 5/28/2016.
 */
import {ADD_NEW_STOCK,ADD_STOCK_DATA,REMOVE_STOCK} from "../actions/index";
const COLORS = ["#DD75DD","#4AE371","#06DCFB","yellow","#A095EE","orange",
    "#FF7575","#2DC800","#7BCAE1","#B6BA18","#AD8BFE","#CDD11B","#FF2626",
    "#A5D3CA","#A8A8FF","#FFE920","#D881ED","#FFCB2F","#FFA8FF","#67C7E2"];

export default function (state={}, action) {
    switch (action.type) {
        case ADD_STOCK_DATA:
            const newStockSymbols = {};
            action.payload.forEach((stock,index,arr)=>{
                if(!state.hasOwnProperty(stock.symbol)){
                    newStockSymbols[stock.symbol]=COLORS.shift();
                }
            });
            return Object.assign({},state,newStockSymbols);
        case ADD_NEW_STOCK:
            return {...state,[action.payload.symbol]:COLORS.shift()};
        case REMOVE_STOCK:
            COLORS.push(state[action.payload]);
            const newState = {};
            for(let sym in state){
                if(sym != action.payload){
                    newState[sym] = state[sym];
                }
            }
            return newState;
    }
    return state
}