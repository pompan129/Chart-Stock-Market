/**
 * Created by fazbat on 5/25/2016.
 */

import React, { Component, PropTypes } from 'react';
import D3Chart from "../chart_logic/d3_stock_chart";


export default class Chart extends Component{

    componentDidMount(){
        const elem = document.getElementById(this.props.id);
        this.chart = new D3Chart({elem:elem, data:this.props.data});
        this.chart.create();
    }
    componentDidUpdate(){
        const elem = document.getElementById(this.props.id);
        console.log("componentDidUpdate", this.props.data);
        this.chart.update({elem:elem, data:this.props.data});
    }


    render(){
        return <div id={this.props.id}></div>
    }

}

