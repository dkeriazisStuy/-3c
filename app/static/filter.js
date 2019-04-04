d3.csv("./static/Big_Cities_Health_Data_Inventory.csv").then(function(data){
    //console.log( Object.keys(data[0]) );

    var keys = ["Year", "Gender", "Race/ Ethnicity", "Place"];
    var body = d3.select('#filter');
    
    keys.forEach(function(category){ 
        //console.log(category);
        var unique_vals = [];
        for (var i = 0; i < data.length; i++){
            if (!unique_vals.includes(data[i][category])){
                unique_vals.push(data[i][category]);
            }
        }
        console.log(unique_vals);

        var select = body
            .text(category + ' ')
            .append('select')
                .attr('class', 'select')
            .on('change', change)

        var options = select.selectAll('option')
            .data(unique_vals).enter()
            .append('option')
                .text( function(d) {return d;} );

        function change(){
            selectValue = d3.select('select').property('value')
            var info = filter(data, 'Place', selectValue);
            console.log(info);
        };

    });

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


// return all unique values of a key
var filter = function(data, category, value){
    var clean = [];
    for (var i = 0; i < data.length; i++){
        if (data[i][category] === value){
            clean.push(data[i]);
        }
    }
    return clean;
}
