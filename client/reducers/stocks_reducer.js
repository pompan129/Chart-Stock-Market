/**
 * Created by fazbat on 5/28/2016.
 */

import {FETCHING_STOCK_DATA,
    ADD_STOCK_DATA,
    ERROR_FETCHING_STOCK_DATA,
    ADD_NEW_STOCK,
    REMOVE_STOCK} from "../actions/index";


export default function (state={}, action) {
    switch (action.type){
        case ADD_STOCK_DATA:
            return { ...state, 
                data: action.payload,
                error:{message:"",is:false},
                fetchingstock:false                
                };
        case ADD_NEW_STOCK:
            return {...state,
                data:[...state.data,action.payload],
                error:{message:"",is:false},
                fetchingstock:false};
        case FETCHING_STOCK_DATA:
            return {...state,
                error:{message:"",is:false},
                fetchingstock:true};
        case ERROR_FETCHING_STOCK_DATA:
            return {...state,
                error:{message:action.message,is:true},
                fetchingstock:false};
        case REMOVE_STOCK:
            return {...state,data:state.data.filter((stock)=>{
                return !(action.payload == stock.symbol)
            })};
    }
    return state;
}
