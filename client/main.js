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



const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <App />
    </Provider>
    , document.getElementById('main'));