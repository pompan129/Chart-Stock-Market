/**
 * Created by fazbat on 6/2/2016.
 */
import React, { Component } from 'react';


class StockPanel extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="title-bar">
              <h1 className="title-bar-banner">{this.props.title}</h1>
                <div className="title-bar-description">{this.props.description}</div>
            </div>

        )
    }
}

StockPanel.propTypes = {
    title: React.PropTypes.string,
    description:React.PropTypes.string
};



export default StockPanel;