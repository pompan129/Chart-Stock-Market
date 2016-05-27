/**
 * Created by fazbat on 5/25/2016.
 */
import React,{Component} from "react";
import Chart from "./chart";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {fetchStockData} from "../actions/index";


let stock_symbols = ["AAPL","MMM","GOOG"];//todo


class App extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.fetchStockData(stock_symbols);
    }

    render(){
        return <Chart id="stockchart" data={this.props.data}/>;
    }
}

function mapStateToProps(state){
    return {data: state.data}
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchStockData }, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(App);