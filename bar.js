var svg = d3.select("svg"),
margin = {
 top: 20,
 right: 20,
 bottom: 30,
 left: 50
},
width = +svg.attr("width") - margin.left - margin.right,
height = +svg.attr("height") - margin.top - margin.bottom;
// var width = 500
// var height = 700

//  var x = d3.scaleBand()
//  	.rangeRound([0, width])
//  	.padding(0.1);
//
// var y = d3.scaleLinear()
// 	.rangeRound([height, 0]);

var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);

var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("test.csv").then((data) => {
        return data.map((d) => {
          d.Value = +d.Value *1000;

          return d;
        });
        	})
	// x.domain(data.map(function (d) {
	// 	//	return d.Indicator;
  //   return d.Value*1000;
	// 	}));
  // .then((data) => {
  // x.domain(data.map(function(d) { return d.Indicator; }));
	// y.domain([0, d3.max(data, function (d) {
	// 			return Number(d.Value);
	// 		})])};
  .then((data) => {
        x.domain(data.map(function(d) { return d.Indicator; }));
        y.domain([0, d3.max(data, function(d) { return d.Value*1000; })]);

  // g.append("g")
  // .attr("transform", "translate(0," + height + ")")
  // .call(d3.axisBottom(x))
  // .append("text")
  // //.attr("dx", "0.71em")
  // .attr("text-anchor", "end")
  // .text("City");

  g.append("g")
       .attr("class", "axis axis--x")
       .attr("transform", "translate(0," + height + ")")
       .call(d3.axisBottom(x));

  //
  // g.append("g")
  // .call(d3.axisLeft(y))
  // .append("text")
  // .attr("fill", "#000")
  // .attr("transform", "rotate(-90)")
  // .attr("y", 6)
  // .attr("dy", "0.71em")
  // .attr("text-anchor", "end")
  // .text("Value");
  g.append("g")
    //   .attr("class", "axis axis--y")
    //   .call(d3.axisLeft(y).ticks(10, "%"))
    // .append("text")
    //   .attr("transform", "rotate(-90)")
    //   .attr("y", 6)
    //   .attr("dy", "0.71em")
    //   .attr("text-anchor", "end")
    //   .text("Value");

     .call(d3.axisLeft(y))
     .append("text")
     .attr("fill", "#000")
     .attr("transform", "rotate(-90)")
     .attr("y", 6)
     .attr("dy", "0.71em")
     .attr("text-anchor", "end")
     .text("Value");
  // g.selectAll(".bar")
  // .data(data)
  // .enter().append("rect")
  // .attr("class", "bar")
  // .attr("x", function (d) {
  // return d.Indicator;
  // //x(d.Indicator);
  // //return x(d.Value*1000);
  // })
  // .attr("y", function (d) {
  //   return y(Number(d.Value));
  // })
  // .attr("width", x.bandwidth())
  // .attr("height", function (d) {
  //   return height - y(Number(d.Value));
  // });
  // });
  g.selectAll(".bar")
  .data(data)
  .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d.Indicator); })
    .attr("y", function(d) { return y(d.Value*1000); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return height - ( y(d.Value)*1000); });
});
