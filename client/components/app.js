/**
 * Created by fazbat on 5/25/2016.
 */
import React,{Component} from "react";
import Chart from "./chart";
import SearchBar from "./searchbar";
import StockPanelList from "./stock_panel_list";
import TitleBar from "./title_bar";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {fetchStockData,removeStock} from "../actions/index";


class App extends Component{
    constructor(props){
        super(props);
    }
    render(){
        if(!this.props.stocks.data){return null}
        return (
            <div className="app-root">
                <TitleBar title="Chart The Stock Market"
                          description="Enter stock symbol below. See closing prices for the previous year"/>
                <Chart id="stockchart" stocks={this.props.stocks} colors={this.props.colors}/>
                <StockPanelList
                    stocks={this.props.stocks}
                    colors={this.props.colors}
                    removeStock={this.props.removeStock} />
                <SearchBar />
            </div>
            

        );
    }
}

App.propTypes = {
    data: React.PropTypes.array,
    removeStock:React.PropTypes.func,
    fetchStockData:React.PropTypes.func,
    colors: React.PropTypes.object
};

function mapStateToProps(state){
    return {
        stocks: state.stocks,
        colors:state.colors
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchStockData, removeStock }, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(App);