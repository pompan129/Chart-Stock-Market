/**
 * Created by fazbat on 5/25/2016.
 */
import d3 from "d3";

const optionPresets = {
    elem: null,
    w:800,
    h:450,
    margin:{
        top: 30,
        bottom: 50,
        left: 50,
        right: 40
    },
    xScale:null,
    yScale:null,
    data: null,
    colors:null,
    dateparser: d3.time.format("%Y-%m-%d").parse,
    color:d3.scale.category20(),
    tool_style:{
        position: "absolute",
        "text-align": "center",
        width: "auto",
        height: "auto",
        padding: "4px",
        font: "12px sans-serif",
        "font-weight":"bold",
        background: "#ddd",
        border: "2px solid",
        "border-radius": "4px",
        "pointer-events": "none"
    }
};
optionPresets.width = optionPresets.w - optionPresets.margin.left - optionPresets.margin.right;
optionPresets.height = optionPresets.h - optionPresets.margin.top - optionPresets.margin.bottom;



class d3StockChart{
    constructor(options = optionPresets){
        this.options = Object.assign({},optionPresets,options);
    }

    create(){
        var options = this.options;
        var svg = d3.select(options.elem).append('svg')
            .attr('class', 'd3StockChart')
            .attr('width', options.w)
            .attr('height', options.h);
        var chart = svg.append("g")
            .classed("display", true)
            .attr("transform", "translate(" + options.margin.left + "," + options.margin.top + ")");

        this._svg = svg;
        this._chart = chart;
        options.tooltip = d3.select("body").append("div")
            .classed("tooltip",true)
            .style(options.tool_style)
            .style("opacity", 0);
        options.data && this.update();

    }
    update(newData){
        if(newData){this.options = Object.assign({},this.options,newData)}
        this.setScalesAxisLine();
        this.plot.call(this._chart,this.options);
    }

    setScalesAxisLine(){
        const options = this.options;
        options.yScale = d3.scale.linear()
            .domain([0,d3.max(options.data.map(function(stockArray) {
                return d3.max(stockArray.data,function(day){
                    return day.closing;
                });
            }))])
            .range([options.height,0]);

        options.xScale = d3.time.scale()
            .domain([
                d3.min(options.data.map(function(stock){
                    return d3.min(stock.data,function(d){
                        return options.dateparser(d.date);
                    })
                })),
                d3.max(options.data.map(function(stock){
                    return d3.max(stock.data,function(d){
                        return options.dateparser(d.date);
                    })
                }))
            ])
            .range([0,options.width]);

        options.xAxis = d3.svg.axis()
            .scale(options.xScale)
            .orient("bottom")
            .ticks(d3.time.months, 1)
            .tickFormat(d3.time.format("%m/%y"));

        options.yAxis = d3.svg.axis()
            .scale(options.yScale)
            .orient("left");

        options.line = d3.svg.line()
            .x(function(d){
                var date = options.dateparser(d.date);
                return options.xScale(date);
            })
            .y(function(d){
                return options.yScale(d.closing);
            });
    }

    plot(options){
        const stocks = options.data;
        const tooltip = options.tooltip;
        
        //remove previous lines
        this.selectAll(".trendline").remove();
        this.selectAll(".toolpoint").remove();

        //axis
        //create x axis if not present. Transition if x axis is present
        if(this.select(".x.axis").empty()){
            this.append("g")
                .classed("x axis", true)
                .attr("transform", "translate(0," + options.height + ")")
                .call(options.xAxis);
        }else{
            let chartTransition = this.transition();
            chartTransition.select(".x.axis") // change the x axis
                .duration(750)
                .call(options.xAxis);
        }
        //create y axis if not present. Transition if y axis is present
        if(this.select(".y.axis").empty()){
            this.append("g")
                .classed("y axis", true)
                .attr("transform", "translate(0,0)")
                .call(options.yAxis);
        }else{
            let chartTransition = this.transition();
            chartTransition.select(".y.axis") // change the x axis
                .duration(750)
                .call(options.yAxis);
        }


        //enter
        for(let i = 0, len = stocks.length;i<len;i++){
            //lines
            this.selectAll(".trendline." + stocks[i].symbol)
                .data([stocks[i].data])
                .enter()
                    .append("path")
                    .classed("trendline",true)
                    .classed(stocks[i].symbol, true)
                    .attr("stroke",options.colors[stocks[i].symbol]);

            //points (for tooltip)
            this.selectAll(".toolpoint." + stocks[i].symbol)
                .data(stocks[i].data)
                .enter()
                .append("circle")
                .classed("toolpoint",true)
                .classed(stocks[i].symbol, true)
                .attr("r", 2)
                .attr("fill",options.colors[stocks[i].symbol])
                .attr("title",stocks[i].symbol)
                .style("opacity", .00001)
                .on("mouseover", function(d,i){
                    d3.select(this)
                        .attr("r", 6)
                        .attr("stroke","grey")
                        .attr("stroke-width",3)
                        .style("opacity", .9);
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", .95)
                        .style("border-color",options.colors[this.getAttribute("title")]);
                    tooltip.html(
                        "<h4>" + this.getAttribute("title") + "</h4>" +
                        "<span>" + d.date + "</span></br>" +
                        "<span> Close: " + d.closing + "</span></br>"
                    )
                        .style("left", (d3.event.pageX + 20) + "px")
                        .style("top", (d3.event.pageY - 80) + "px");
                })
                .on("mouseout", function(d,i){
                    d3.select(this)
                        .attr("r", 2)
                        .attr("stroke-width",0)
                        .style("opacity", .00001);
                    tooltip.transition()
                        .duration(500)
                        .style("opacity", 0);
                });
        }

        //update
        for(let i = 0, len = stocks.length;i<len;i++){
           this.selectAll(".trendline." + stocks[i].symbol).transition()
                .duration(500)
                .attr("d", function(d){
                    return options.line(d);
                });

            this.selectAll(".toolpoint." + stocks[i].symbol)
                .attr("cx", function(d){
                    var date = options.dateparser(d.date);
                    return options.xScale(date);
                })
                .attr("cy", function(d){
                    return options.yScale(d.closing);
                })

        }


        //exit
        for(let i = 0, len = stocks.length;i<len;i++){
            this.selectAll(".trendline." + stocks[i].symbol)
                .data([stocks[i].data])
                .exit()
                .remove();
            this.selectAll(".toolpoint." + stocks[i].symbol)
                .data(stocks[i].data)
                .exit()
                .remove();

        }
    }
}

export default d3StockChart;


/*
 .domain([0,d3.max(options.data.map(function(stockArray) {
 return d3.max(stockArray.data,function(day){
 return day.closing;
 });
 }))])
 */