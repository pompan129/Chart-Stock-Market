/**
 * Created by fazbat on 5/25/2016.
 */

import React, { Component, PropTypes } from 'react';
import D3Chart from "../utilies/d3_stock_chart";


export default class Chart extends Component{

    componentDidMount(){
        const elem = document.getElementById(this.props.id);
        this.chart = new D3Chart({elem:elem, data:this.props.stocks.data,colors:this.props.colors});
        this.chart.create();
    }
    componentDidUpdate(){
        console.log("componentDidUpdate",this.props.stocks.data);//todo
        const elem = document.getElementById(this.props.id);
        this.chart.update({elem:elem, data:this.props.stocks.data,colors:this.props.colors});
    }


    render(){
        return <div id={this.props.id}></div>
    }

}

Chart.propTypes = {
    data: React.PropTypes.array,
    colors: React.PropTypes.object
};


