var diameter = 960,
    format = d3.format(",d");

var bubble = d3.pack() //creates enclosure diagrams, common for bubble charts
    .size([diameter, diameter])
    .padding(1.5);

var svg = d3.select("body").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble")

d3.csv("test.csv", function(d) {
    d.value = d.Value;
    if(d.value) return d;
}, function(error, classes) {

    var root = ; //actually generate data with calculated layout values here

    var bubbles = svg.selectAll(".bubble")
                    .data(bubble(root).leaves())
                    .enter()
                    .append("g")
                    .attr("transform", function(d) {
                        return "translate(" + d.x + "," + d.y + ")";
                        });
                    

    bubbles.append("circle")
        .attr("r", function(d){
                        console.log("D.R:");
                        console.log(d.r * 100);
                        return d.r * 100; 
                    })
        .style("fill", "red");

    bubbles.append("text")
        .attr("x", function(d) {
                    return d.x;
                    })
        .attr("y", function(d) {
                    return d.y + 5;
                    })
        .text(function(d) {
                    return d.Indicator;
                    })
        .style({
            "fill":"black",
            "font-size":"12px"
        });
});

