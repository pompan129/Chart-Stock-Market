/**
 * Created by fazbat on 5/26/2016.
 */
import d3 from "d3";
import axios from "axios";
import Promise from "promise";

const YEAR_IN_MILLS = 1000 * 60 * 60 * 24 * 365;
const START_DATE = new Date(Date.now() - YEAR_IN_MILLS);
const format = d3.time.format("%Y-%m-%d");
const DATE_STRING = format(START_DATE);
const API_KEY = "sYi4d9dzZTKWgPhLdxsg";
const BASE_URL ="https://www.quandl.com/api/v3/datasets/WIKI/";
const URL_PARAMS  = `.json?start_date=${DATE_STRING}&api_key=${API_KEY}`;

//Actions
export const ADD_STOCK_DATA = "ADD_STOCK_DATA";
export const ERROR_FETCHING_STOCK_DATA = "ERROR_FETCHING_STOCK_DATA";
export const FETCHING_STOCK_DATA = "FETCHING_STOCK_DATA";
export const ADD_NEW_STOCK = "ADD_NEW_STOCK";
export const REMOVE_STOCK = "REMOVE_STOCK";

//Action creators

//fetchStockData
export function fetchStockData(stockSymbols){
    return (dispatch)=>{//rteurn redux-thunk function
        dispatch({//set state to fetching data. Spinner?
            type:FETCHING_STOCK_DATA
        });

        Promise.all(
            stockSymbols.map(function(stockSymbol){
                return axios.get(BASE_URL + stockSymbol + URL_PARAMS).then(function(resp){
                    return {
                        symbol:resp.data.dataset.dataset_code.toUpperCase(),
                        description: resp.data.dataset.name,
                        data: resp.data.dataset.data.map(function(stock_day){
                            return {
                                date:stock_day[0],
                                closing:stock_day[4]
                            }
                        })
                    }
                });
            })
        ).then((data)=>{//give state array of stock information
            dispatch({
                type:ADD_STOCK_DATA,
                payload:data
            })

        })
    }
}

//addNewStock
export function addNewStock(symbol) {
    return (dispatch)=>{
        dispatch({//set state to fetching data. Spinner?
            type:FETCHING_STOCK_DATA
        });

        axios.get(BASE_URL + symbol.trim() + URL_PARAMS).then(function(resp){
            console.log("axios.get/resp",resp);
            const data = {
                symbol:resp.data.dataset.dataset_code,
                description: resp.data.dataset.name,
                data: resp.data.dataset.data.map(function(stock_day){
                    return {
                        date:stock_day[0],
                        closing:stock_day[4]
                    }

                })
            };

            dispatch( {
                type:ADD_NEW_STOCK,
                payload: data
            })
        }).catch(function (response) {
            console.log("catch:",response);//todo
            if(response.data && response.data.quandl_error.code == "QECx02"){
                dispatch({
                    type:ERROR_FETCHING_STOCK_DATA,
                    message: symbol + " is not a valid Stock symbol. Please \n" +
                        "check and try again."
                })
            }else{
                dispatch({
                    type:ERROR_FETCHING_STOCK_DATA,
                    message:"symbol: " + symbol + "\n" + response
                })
            }
        });
    }



}

//removeStock
export function removeStock(symbol){
    return {
        type:REMOVE_STOCK,
        payload: symbol.trim().toUpperCase()
    }
}
