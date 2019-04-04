dataset = {
"children": [{"Name":"HIV","Count":0.0304},
    {"Name":"AIDS","Count":0.0785},
    {"Name":"Cancer","Count":0.1958},
    {"Name":"Injury","Count":0.0088},
    {"Name":"Tuberculosis","Count":0.0035},
    {"Name":"Heart Disease","Count":0.156},
    {"Name":"Diabetes","Count":0.0143},
    {"Name":"Pneumonia","Count":0.0119},
    {"Name":"Firearm Related","Count":0.0137},
    {"Name":"Homicide","Count":0.0116}]
};

var diameter = 600;
var color = d3.scaleOrdinal(d3.schemeCategory10);

var bubble = d3.pack(dataset)
    .size([diameter, diameter])
    .padding(1.5);

var svg = d3.select("#bubble")
    .append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

var nodes = d3.hierarchy(dataset)
    .sum(function(d) { return d.Count; });

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

node.append("title")
    .text(function(d) {
        return d.data.Name + ": " + d.value;
    });

node.append("circle")
    .attr("r", function(d) {
        return d.r;
    })
    .style("fill", function(d, i){
        return color(i);
    })
    // .on('mouseover', function(d) {
        // tooltip.text(d.name);
        // return tooltip.style('visibility', 'visible');
    // })
    .on('click', function(d) {
        console.log(d.data.Name);
    });

node.append("text")
    .attr("dy", ".2em")
    .style("text-anchor", "middle")
    .text(function(d) {
        return d.data.Name.substring(0, d.r / 3);
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", function(d){
        return d.r/3;
    })
    .attr("fill", "white");

node.append("text")
    .attr("dy", "1.3em")
    .style("text-anchor", "middle")
    .text(function(d) {
        return d.data.Count;
    })
    .attr("font-family",  "Gill Sans", "Gill Sans MT")
    .attr("font-size", function(d){
        return d.r/5;
    })
    .attr("fill", "white");

d3.select(self.frameElement)
    .style("height", diameter + "px");