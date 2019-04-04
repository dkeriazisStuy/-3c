var svg = d3.select("svg"),
margin = {
 top: 20,
 right: 20,
 bottom: 30,
 left: 50
},
width = +svg.attr("width") - margin.left - margin.right,
height = +svg.attr("height") - margin.top - margin.bottom;


var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);

var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("test.csv").then((data) => {
    return data.map((d) => {
	console.log("data");
	console.log(d);
	console.log("values")
	console.log(d.Value);
          d.Value = +d.Value;

          return d;
        });
        	})

  .then((data) => {
      x.domain(data.map(function(d) { return d.Indicator; }));
      y.domain([0, d3.max(data, function(d) {return (d.Value); })]);

  g.append("g")
       .attr("class", "axis axis--x")
       .attr("transform", "translate(0," + height + ")")
	  .call(d3.axisBottom(x))
	 // .append("text")
	 // .attr("fill", "blue")
	 // .attr("transform", "rotate(-90)")
	 // .attr("y", 6)
	  //.attr("dy", "0.71em")
	  //.attr("text-anchor", "end")
	  //.text("Indicator");
          .append("text")
         .attr("y", 25)
         .attr("x", width)
         .attr("text-anchor", "end")
         .attr("stroke", "black")
         .text("Indicator");

  g.append("g")
     .call(d3.axisLeft(y))
   .append("text")
     .attr("stroke", "black")
     .attr("transform", "rotate(-90)")
	  .attr("x",0) 

	  .attr("y",-15)
     .attr("dy", "0.71em")
     .attr("text-anchor", "end")
     .text("Value");

      g.selectAll(".bar")
	  .data(data)
	  .enter().append("rect")
	  .attr("class", "bar")
	  .attr("x", function(d) { return x(d.Indicator); })
	  .attr("y", function(d) { return y(d.Value); })
	  .attr("width", x.bandwidth())
	  .attr("height", function(d) { return  height- y(d.Value); });
});
