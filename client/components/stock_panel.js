/**
 * Created by fazbat on 5/28/2016.
 */
import React, { Component } from 'react';


class StockPanel extends Component{
    constructor(props){
        super(props);
        this.handleRemoveStockClick = this.handleRemoveStockClick.bind(this);
    }
    

    handleRemoveStockClick(){
        this.props.removeStock(this.props.symbol);
        console.log("handleRemoveStockClick",this.props.symbol);//todo

    };

    render(){
        const styleRemoveGlyphicon = {
            cursor:"pointer"
        };
        return (
            <div className="col-md-4 col-sm-6">
                <div className="panel panel-default" >
                    <div className="panel-heading"
                         style={{backgroundColor: this.props.color}}>
                        {this.props.symbol}
                        <span
                            onClick={this.handleRemoveStockClick}
                            className="glyphicon glyphicon-remove pull-right"
                            style={styleRemoveGlyphicon}
                            aria-hidden="true"></span>
                    </div>
                    <div className="panel-body">
                        {this.props.description}
                    </div>
                </div>
            </div>

        )
    }
}

StockPanel.propTypes = {
    symbol: React.PropTypes.string,
    description:React.PropTypes.string,
    removeStock:React.PropTypes.func
};



export default StockPanel;