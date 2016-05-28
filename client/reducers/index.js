/**
 * Created by fazbat on 5/26/2016.
 */
import {FETCH_STOCK_DATA,ADD_NEW_STOCK} from "../actions/index";


export default function (state = {}, action) {
    switch (action.type){
        case FETCH_STOCK_DATA:
            return { ...state, data: action.payload };
        case ADD_NEW_STOCK:
            return {...state,data:[...state.data,action.payload]}
    }
    return state;
}