/**
 * Created by fazbat on 5/26/2016.
 */
import {FETCH_STOCK_DATA} from "../actions/index";


export default function (state = {}, action) {
    switch (action.type){
        case FETCH_STOCK_DATA:
            console.log("FETCH_STOCK_DATA>>>>",action.payload);//todo
            return { ...state, data: action.payload };
    }
    return state;
}