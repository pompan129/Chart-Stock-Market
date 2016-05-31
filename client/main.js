/**
 * Created by fazbat on 5/26/2016.
 */
import React,{Component} from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from "./reducers/index";
import ReduxThunk from "redux-thunk";
import App from "./components/app";
import Socket,{stockMiddleware} from "./socket";




const createStoreWithMiddleware = applyMiddleware(ReduxThunk,stockMiddleware)(createStore);
const store=createStoreWithMiddleware(reducers);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('main'));

Socket(store);