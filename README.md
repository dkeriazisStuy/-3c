# -3c
:3c
#### Description of data sets
* [link to csv](https://data.world/health/big-cities-health/workspace/file?filename=Big_Cities_Health_Data_Inventory.csv)
* Data from [data.world](https://data.world) about the most significant health issues faced in the biggest cities in the United States.
* This dataset shows the issues that are most prominent in various cities, which can give some ideas about prioritizing solutions and research.
  Many of these issues have wide-reaching effects, so data for prioritization is beneficial to many.
#### Explanation, in broad strokes if necessary, of how you aim to make this data come alive.
* What will be shown:
  * An initial form to filter the identity of the user which includes year, gender, race, and city.
  * After inputting the filters, a bubble map with each bubble, representing each disease in the specified city, for a specified year, gender, and race, will be shown. The radius of the bubble would be proportional to the estimated percentage of the city that has each disease, which we will retrieve from the dataset
  * Each bubble represents a different disease so in order to help with the user experience, we plan to have each bubble to be a different color
* Interactions
  * The user can hover over the circles to show percentages
  * When a bubble is clicked on, it shows another graph that compares how the data differs in big cities (with the previous filters on year, race, city, and gender still applied.
* Questions our visualization allows the user to explore
  * How prevalent are certain diseases like HIV in certain big cities?
  * In what group of people are these diseases most prevalent in?
* Questions it will provoke
  * Where should I go if I am susceptible to a certain disease?
  * How does this data relate to my history?

#### Explanation of D3 feature utilization:
* Interactivity:
  * Users can filter information
  * Users can click on each indicator and the SVG below with a bar chart will update
enter/exit selections?
* Similarity to Bubble Chart and Bar Chart
  * Bubble Chart displayed the indicators for a specified, race, city, and gender
  * Bar Chart displays the specified indicator for all major cities
* When the user changes filter settings, the circles will transition to be bigger or smaller
