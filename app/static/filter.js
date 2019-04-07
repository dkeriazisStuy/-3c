var body = d3.select('#filter');
var table = body.append("table");
var keys = ["Year", "Gender", "Race/ Ethnicity", "Place"];

d3.csv("./static/Big_Cities_Health_Data_Inventory.csv").then(function(data){

    // 4 filters
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

    // submit button
    body.append('br');
    var b = body.append('button')
        .attr('type', 'button')
        .attr('id', 'button')
        .text('Submit')
        .on('click', function(){
            return getData(data);
        });
});


// get filtered data
var getData = function(data){
    var filters = table.selectAll('select');
    var values = [];
    var results = data.slice(0);

    filters.each(function(d){
        values.push(this.value);
    });

    for (var i = 0; i < keys.length; i++){
        if (values[i] !== 'All' && values[i] !== 'Both'){
            results = filter(results, keys[i], values[i]);
        }
    }
    return results;
};

// return list of different choices in a category
var getChoices = function(data, choice){
    var unique_vals = [];
    for (var i = 0; i < data.length; i++){
        if (!unique_vals.includes(data[i][choice])){
            unique_vals.push(data[i][choice]);
        }
    }
    if (choice === "Year" || choice === "Place"){
        unique_vals.unshift("All");
    }
    return unique_vals;
};

// return all elements with value in category
var filter = function(data, category, value){
    var clean = [];
    for (var i = 0; i < data.length; i++){
        if (data[i][category] === value){
            clean.push(data[i]);
        }
    }
    return clean;
};
