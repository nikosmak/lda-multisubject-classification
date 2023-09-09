// create 2 data_set
var data1 = [
    {group: "A", value: 4},
    {group: "B", value: 16},
    {group: "C", value: 8}
 ];
 
 var data2 = [
    {group: "E", value: 7},
    {group: "F", value: 1},
    {group: "D", value: 20}
 ];

 var empty_data = []
 
 // set the dimensions and margins of the graph
//  var { y, yAxis, x, xAxis, svg } = initBarChart(barchart_id, cssSelector);


function initBarChart(barchart_id) {
  var margin = { top: 20, right: 30, bottom: 40, left: 90 }, width = 500 - margin.left - margin.right, height = 600 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3.select("#"+barchart_id)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");
    
  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 20])
    .range([0, width]);

  var xAxis = svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Y axis
  var y = d3.scaleBand()
    .range([0, height])
    .domain(empty_data.map(function (d) { return d.group; }))
    .padding(.1);
  var yAxis = svg.append("g")
    .call(d3.axisLeft(y));
  return { y, yAxis, x, xAxis, svg };
}

    function uniques(list) {
        return new Set(list)
    }

    function findUniqueWordFrequencies(words) {
        termsFrequency = {}
        var uniqueWords = uniques (words)
        uniqueWords.forEach(uniqueWord => {
            termsFrequency[uniqueWord] = count(uniqueWord, words)
          });
        return sortByValue(termsFrequency)
    }

    function getBigrams(list_of_term_frequencies) {
      return list_of_term_frequencies.filter(term_frequency => term_frequency['key'].includes('_'));
    }

    function sortByValue(dict) {
      // Step - 1
      // Create the array of key-value pairs
      var items = Object.keys(dict).map(
        (key) => { return [key, dict[key]] });

      // Step - 2
      // Sort the array based on the second element (i.e. the value)
      items.sort(
        (first, second) => { return second[1] - first[1] }
      );

      sorted_dict = {}
      // Step - 3
      // Obtain the list of keys in sorted order of the values.
       items.forEach(function (tuple, index){
        
        sorted_dict[tuple[0]] = tuple[1]
      });
      return sorted_dict

    }

    function count(term, words){
        var count = 0;
        words.forEach(function (word, index) {
           if (term == word) {
            count +=1;
           }
          });
        return count;
    }

    function dictionaryValues (dict) {
        var values = Object.keys(dict).map(function(key){
            return dict[key];
        });
        return values
    }

    function transformToChartData(dict) {
        var transformedForBarChart = []
        for (const [key, value] of Object.entries(dict)) {
            var bar_row = {}
            bar_row ["key"] = key
            bar_row ["value"] = value
            transformedForBarChart.push(bar_row)
          }
          return transformedForBarChart
    }

    Array.prototype.max = function() {
        return Math.max.apply(null, this);
      };
 
   //Bars
   function update(data, y, yAxis, x, xAxis, svg) {

    var term_frequencies = findUniqueWordFrequencies(data)
    var frequencies = dictionaryValues(term_frequencies)
    var xMax = frequencies.max()
    var unfilteredChartData = transformToChartData(term_frequencies)
    var chart_data = Array.from(new Set([...unfilteredChartData.slice(0,40+1), ...getBigrams(unfilteredChartData)]));
     
    y.domain(chart_data.map(function(d) { return d.key; }))
    yAxis.transition().duration(1000).call(d3.axisLeft(y))
    
    // Update X axis
    x.domain([0,xMax])
    xAxis.transition().duration(1000).call(d3.axisBottom(x))
    
    
    var u = svg.selectAll("rect")
           .data(chart_data)
    
    u
        .enter()
        .append("rect")
        .merge(u)
        .transition()
        .duration(1000)
        .attr("x", x(0) )
        .attr("y", function(d) { return y(d.key); })
        .attr("width", function(d) { return x(d.value); })
        .attr("height", y.bandwidth() )
        .attr("fill", "#69b3a2")
   }