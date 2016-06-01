/**
 * Created by fazbat on 5/26/2016.
 */

import { combineReducers } from 'redux';
import StocksReducer from './stocks_reducer';
import ColorReducer from "./color_reducer";

const rootReducer = combineReducers({
    stocks: StocksReducer,
    colors: ColorReducer
});

export default rootReducer;