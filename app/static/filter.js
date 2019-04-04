d3.csv("./static/Big_Cities_Health_Data_Inventory.csv").then(function(data){
    //console.log( Object.keys(data[0]) );

    var keys = ["Year", "Gender", "Race/ Ethnicity", "Place"];
    var body = d3.select('#filter');

    var selections = body.selectAll('select')
        .data(keys).enter()
        .append('text').text(function(k){return k})
        .append('select')
            .attr('class', 'select')
        .on('change', function(){
            selectValue = d3.select('select').property('value')
            var info = filter(data, category, selectValue);
            //console.log(info);
        })

    var options = selections.selectAll('option')
        .data(getChoices(data, function(k){
            console.log('k');
            console.log(k);
            return k;}))
        .enter()
        .append('option')
            .text(function(d){ return d; })

    //console.log(options);
    

    /*
    keys.forEach(function(category){ 
        //console.log(category);
        var unique_vals = [];
        for (var i = 0; i < data.length; i++){
            if (!unique_vals.includes(data[i][category])){
                unique_vals.push(data[i][category]);
            }
        }
        //console.log(unique_vals);

        var select = body
            .text(category + ' ')
            .append('select')
                .attr('class', 'select')
            .on('change', change)

        var options = select.selectAll('option')
            .data(unique_vals).enter()
            .append('option')
                .text( function(d) {return d;} );

        console.log(options);

        function change(){
            selectValue = d3.select('select').property('value')
            var info = filter(data, category, selectValue);
            console.log(info);
        };

    });
    */

    //var places = [];
    //for (var i = 0; i < data.length; i++){
    //    if (!places.includes(data[i]["Place"])){
    //        places.push(data[i]["Place"]);
    //    }
    //}

    //var select = d3.select('body')
    //    .text('Place ')
    //    .append('select')
    //        .attr('class', 'select')
    //    .on('change', change)

    //var options = select.selectAll('option')
    //    .data(places).enter()
    //    .append('option')
    //        .text( function(d) {return d;} );

    //function change(){
    //    selectValue = d3.select('select').property('value')
    //    var info = filter(data, 'Place', selectValue);
    //    console.log(info);
    //};

});

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
    return clean;
<<<<<<< Updated upstream:app/static/filter.js
}
=======
};
>>>>>>> Stashed changes:filter.js
