/**
 * Created by fazbat on 5/26/2016.
 */
import d3 from "d3";
import axios from "axios";


const YEAR_IN_MILLS = 1000 * 60 * 60 * 24 * 365;
const START_DATE = new Date(Date.now() - YEAR_IN_MILLS);
const format = d3.time.format("%Y-%m-%d");
const DATE_STRING = format(START_DATE);
const API_KEY = "sYi4d9dzZTKWgPhLdxsg";
const BASE_URL ="https://www.quandl.com/api/v3/datasets/WIKI/";
const URL_PARAMS  = `.json?start_date=${DATE_STRING}&api_key=${API_KEY}`;

//Action types
export const FETCH_STOCK_DATA = "FETCH_STOCK_DATA";
export const ADD_NEW_STOCK = "ADD_NEW_STOCK";


//Action creators

//fetchStockData
export function fetchStockData(stockSymbols){
    const request = Promise.all(
        stockSymbols.map(function(stockSymbol){
            return axios.get(BASE_URL + stockSymbol + URL_PARAMS).then(function(resp){
                return {
                    symbol:resp.data.dataset.dataset_code,
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
    );

    return {
        type:FETCH_STOCK_DATA,
        payload: request
    }
}


//addNewStock
export function addNewStock(symbol) {
    const request = axios.get(BASE_URL + symbol + URL_PARAMS).then(function(resp){
                return {
                    symbol:resp.data.dataset.dataset_code,
                    description: resp.data.dataset.name,
                    data: resp.data.dataset.data.map(function(stock_day){
                        return {
                            date:stock_day[0],
                            closing:stock_day[4]
                        }
                    })
                }
            });

    return {
        type:ADD_NEW_STOCK,
        payload: request
    }
}
