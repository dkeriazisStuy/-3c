d3.csv("./static/Big_Cities_Health_Data_Inventory.csv").then(function(data){
    //console.log( Object.keys(data[0]) );

    var keys = ["Year", "Gender", "Race/ Ethnicity", "Place"];
    var body = d3.select('#filter');

    for (var i = 0; i < keys.length; i++){
        body.append('text').text(keys[i]);
        var selection = body.append('select')
            .attr('class', 'select')
            .attr('name', keys[i])
            // .on('change', function(){
            //     // get all data values corresponding to key 
            //     selectValue = selection.property('value')
            //     category = selection.attr('name');

            //     console.log('===filter===');
            //     var info = filter(data, category, selectValue);
            //     console.log(info);
            //     console.log('===filter===');
            // });
        body.append('br');
        body.append('br');
        // get unique values for each key
        var options = selection.selectAll('option');
        options.append('option')
            .attr('selected', 'selected')
            .text('test');
        options.data(getChoices(data, keys[i])).enter()
            .append('option')
            .text(function(d){ return d; })
    };
    body.append('br');
    body.append('button')
        .attr('type', 'button')
        .text('wee')
});

var getFilters = function(){

}

// return list of different choices in a category
var getChoices = function(data, choice){
    var unique_vals = [];
    for (var i = 0; i < data.length; i++){
        if (!unique_vals.includes(data[i][choice])){
            unique_vals.push(data[i][choice]);
        }
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
    console.log('--------------------------------------------------');
    console.log(category);
    console.log(value);
    console.log('--------------------------------------------------');
    return clean;
};
