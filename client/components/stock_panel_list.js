/**
 * Created by fazbat on 5/28/2016.
 */
import React, { Component } from 'react';
import StockPanel from "./stock_panel";

class StockPanelList extends Component{

    handleFetchStockError(message){
        console.log("Error in StockPanelList",message);
        window.alert(message);
    }

    render(){
        if(this.props.stocks.error.state === true){this.handleFetchStockError(this.props.stocks.error.message)}
        return (
            <div>
                {this.props.stocks.data.map((stock)=>{
                    return <StockPanel 
                        symbol={stock.symbol}
                        description={stock.description}
                        color={this.props.colors[stock.symbol]}
                        removeStock = {this.props.removeStock}
                        key={stock.symbol}/>
                })}
            </div>
        );
    }
}

StockPanelList.propTypes = {
    stocks:React.PropTypes.object,
    removeStock:React.PropTypes.func,
    colors: React.PropTypes.object
};

export default StockPanelList;