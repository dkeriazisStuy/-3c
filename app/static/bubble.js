var raw = [];
var body = d3.select('#filter');
var table = body.append("table");
var keys = ["Year", "Gender", "Race", "Place"];

var graphData = function(data){
    var k = Object.keys(data);
    var chart = d3.select('body').select('#chart')
        .attr('width', '1000');
    chart.html("");
    for (var i = 0; i < k.length; i++){
        var row = chart.append('tr');
        row.append('td').text(k[i])
            .style('border', '1px solid #000000');
        row.append('td').text(data[k[i]])
            .style('border', '1px solid #000000');
    }
    //console.log(data.Category);
    //console.log(data.Indicator);
    //console.log(data.Year);
    //console.log(data.Value);
    //var chart = d3.select('body').select('#chart')
    //chart.append('tr')
    //    .append('td').text('BCHC Requested Methodology')
    //    .append('td').text(data['BCHC Requested Methodology'])
    //chart
    //    .append('td').text('Value')
    //    .append('td').text(data.Value)
};

d3.csv("./static/Big_Cities_Health_Data_Inventory.csv").then(function(data) {
    // var b = d3.select('#filter').select('button');
    // console.log('b');
    // console.log(b);
    // console.log('b');

    for (var i = 0; i < keys.length; i++){
        row = table.append('tr');
        row.append('td').text(keys[i]);
        var selection = row.append('td').append('select')
            .attr('class', 'select')
            .attr('name', keys[i])
        var options = selection.selectAll('option');
        options.data(getChoices(data, keys[i])).enter()
            .append('option')
            .text(function(d){ return d; })
    };

    var b = body.append('button')
        .attr('type', 'button')
        .attr('id', 'button')
        .text('Submit')
        .on('click', function() {
            dset = getData(data).slice(0);
            //console.log('??');
          //  console.log(dset);
        raw = {
            "children": dset
        };
        d3.select(".bubble").remove();
        everything();
    });

    var chart = d3.select('body')
        chart.append('table')
            .attr('id', 'chart');
});

var everything = function(d) {
    var toolTip = d3.select('#bubble')
                    .append("tip")
                    .style("opacity", 0)
                    .attr("class", "tooltip")
                    .style("position", "absolute")
                    .style("background-color", "black")
                    .style("border-radius", "5px")
                    .style("padding", "10px")
                    .style("color", "white")

    var showTooltip = function(d) {
        //console.log(d)
        toolTip.transition().duration(200)
        toolTip.style("opacity", 0)
                .html("Indicator: " + d.data.Indicator + "<br/>" + "Value: " + d.data.Value)
                .style("left", d3.event.pageX + 20 + "px")
                .style("top", d3.event.pageY + 20 + "px")
    }

    var moveTooltip = function(d) {
        toolTip.style("left", d3.event.pageX + 20 + "px")
        toolTip.style("top", d3.event.pageY + 20 +"px")
    }

    var hideTooltip = function(d) {
        toolTip.transition().duration(200)
                .style("opacity", 0)
    }


    var diameter = 600;
    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var bubble = d3.pack(raw)
        .size([diameter, diameter])
        .padding(1.5);

    var svg = d3.select("body")
                .append("svg")
                .attr("width", diameter)
                .attr("height", diameter)
                .attr("class", "bubble")
                .attr("id", "bubble");

    var nodes = d3.hierarchy(raw)
        .sum(function(d) {
            return d.Value; });

    var node = svg.selectAll(".node")
        .data(bubble(nodes).descendants())
        .enter()
        .filter(function(d){
            return  !d.children
        })
        .append("g")
        .attr("class", "node")
        .attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
        });

    //node.append("title")
    //    .text(function(d) {
    //        return d.data.Name + ": " + d.value;
    //    });

    var circles = node.append("circle")
        .transition().duration(400);
        
    circles.attr("r", function(d) {
            if(isNaN(d.r)) {
                console.log("Data doesn't exist in dataset!");
            } else {
                return d.r;
            }
        })
        .style("fill", function(d, i){
            return color(i);
        })
        .attr("stroke", "black")
        .attr("stroke-width", 0);
    bub = d3.selectAll("circle");
    bub.on('click', function(d) {
            //info for bar chart
            console.log(d.data.Indicator, d.data.Year, d.data.Gender, d.data.Race);

            graphData(d.data);
            //graphData([d.data.Indicator, d.data.Year, d.data.Gender, d.data.Race]);
            //return[d.data.Indicator, d.data.Year, d.data.Gender, d.data.Race];
        })
        .on('mouseover', function(d) {
            d3.select(this)
                .transition()
                .duration(100)
                .attr('stroke-width', 2);
            return showTooltip(d);})
        .on('mousemove', function(d) {
            d3.select(this)
                .transition()
                .duration(100)
                .attr('stroke-width', 2);
            return moveTooltip(d);})
        .on('mouseout', function(d) {
            d3.select(this)
                .transition()
                .duration(100)
                .attr('stroke-width', 0);
            return hideTooltip(d);})

    node.append("text")
        .attr("dy", ".2em")
        .style("text-anchor", "middle")
        .text(function(d) {
            try {
                if(d.r > 150) {
                    return d.data.Indicator.substring(0, d.r / 15);
                } else {
                    return d.data.Indicator.substring(0, d.r / 4);
                }
            } catch (e) {
                console.log("Data doesn't exist in dataset!");
            }
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", function(d){
            if(d.r >  100){
                return d.r/5;
            }else{
                return d.r/3.5;
            }
        })
        .attr("fill", "white");

    node.append("text")
        .attr("dy", "1.3em")
        .style("text-anchor", "middle")
        .text(function(d) {
            return d.data.Value;
        })
        .attr("font-family",  "Gill Sans", "Gill Sans MT")
        .attr("font-size", function(d){
            return d.r/5;
        })
        .attr("fill", "white");

    d3.select(self.frameElement)
        .style("height", diameter + "px");
};

