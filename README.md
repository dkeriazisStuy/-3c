# -3c
:3c
#### Description of data sets

#### Explanation, in broad strokes if necessary, of how you aim to make this data come alive.
* What will be shown:
  * Filters that can be applied to get specific data including: gender, race, year, and city. 
  * A bubble of map with all of the information if no filters are selected, but the graph will change to reflect changes in filters. 
   * The bubbles will have different colors to reflect different 
* Interactions
  * The user can hover over the cicles to show percentages
  * When a bubble is clicked on, it shows another graph that compares how the data differs in big cities. 
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
