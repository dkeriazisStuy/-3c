/* columns
Indicator category
Indicator
Year
Gender
Race/ Ethnicity
Value
Place
BCHC Requested Methodology
Source
Methods
Notes
*/
console.log('wee');
d3.csv("./Big_Cities_Health_Data_Inventory.csv").then(function(data){
    //console.log(data[0]);

    var places = [];
    for (var i = 0; i < data.length; i++){
        if (!places.includes(data[i]["Place"])){
            places.push(data[i]["Place"]);
        }
    }
    console.log("place");
    console.log(places);

    // test stuff
    // // all indicator categories
    // var cat_vals = [];
    // for (var i = 0; i < data.length; i++){
    //     if (!cat_vals.includes(data[i]["Indicator Category"])){
    //         cat_vals.push(data[i]["Indicator Category"]);
    //     }
    // }
    // console.log("Indicator Category");
    // console.log(cat_vals);


    // // test filter by specific value in a column
    // var a = filter(data, "Indicator Category", "Cancer");
    // console.log("filter for cancer");
    // console.log(a);

    // var b = filter(data, "Place", "New York, NY");
    // console.log("filter for new york");
    // console.log(b);

    var chart = d3.select(".chart")
        .attr("width", 500)
        .attr("height", 500)

    var dropdown = chart
        .insert("select", "svg")
        .on("change", dropdownChange);

    dropdown.selectAll("option")
        .data(places)
        .enter().append("option")
            .attr("value", function(d){ return d; })
        .text(function(d){
            return d[0];
        })

    var dropdownChange = function(){}


});


var filter = function(data, category, value){
    var clean = [];
    for (var i = 0; i < data.length; i++){
        if (data[i][category] === value){
            clean.push(data[i]);
        }
    }
    return clean;
}

