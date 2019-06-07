
// HISTO AREA

function buildHisto() {
    /* data route */
  const url = "/api/histo";
  d3.json(url).then(function(crimeData) {

    crimeData = crimeData['data'];

    // var date = [];

    var ctx = document.getElementById("chart").getContext("2d");




    var date = crimeData.map((crimeData) => {
        return crimeData.date;
    });

    var offenseCount = crimeData.map((crimeData) => {
        return +crimeData.counts;
    });
    var chart = new Chart(ctx, {
        type: "bar",
        options: {
          maintainAspectRatio: false,
          legend: {
            display: false
          },
          tooltips: {
            // enabled: true,
            // mode: 'single',
            callbacks: {
                label: function(tooltipItems) { 
                    return Number(tooltipItems.yLabel);
                }
              }
            },
          scales: {
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: 'Date',
                  fontSize: 16
                }
              }
            ],
            yAxes: [
                {
                scaleLabel: {
                display: true,
                labelString: 'Number of Incidents',
                fontSize: 12
                }
            }
            ]
          }
        },
        data: {
          labels: date,
          datasets: [
            {
              data: offenseCount,
              backgroundColor: 'rgba(255,0,0,0.4)',
              borderColor: 'rgba(255,0,0,0.8)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(255,0,0,1)',
              hoverBorderColor: 'rgba(255,0,0,1)',
              hoverBorderWidth: 1
            }
          ]
        }
    });
    
})

};



// MAP AREA
function buildMap() {

 function getColor(d) {
    return d > 1000 ? '#800026' :
           d > 500  ? '#BD0026' :
           d > 200  ? '#E31A1C' :
           d > 100  ? '#FC4E2A' :
           d > 50   ? '#FD8D3C' :
           d > 20   ? '#FEB24C' :
           d > 1   ? '#FED976' :
                      '#B7B7B7';
}  

var map = L.map('map').setView([37.8, -96], 4);
// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: apiKey
}).addTo(map);

const url = "/api/map";

d3.json(url).then(function(mapData) {
  // mapData = JSON.parse(mapData);
  mapData = mapData['data'];
  var i = 0;
  mapData.forEach(function(element){

          // console.log(element.geom_type)
          // console.log(element.coords);
          // console.log(typeof element.coords);

        var output =  JSON.parse( element.coords ) 
          // console.log(output);
      var geojson = {
      "name":"NewFeatureType",
      "type":"FeatureCollection",
      "features":[{
          "type":"Feature",
          "geometry":{
              "type":element.geom_type,
              "coordinates":output
          },
          "properties":{
            'HATE_CRIME': element.hate_crime_count,
            'NAME': element.county_name
          }
      }]
  };

 

function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.NAME + "<h3>" + "<hr>" + "Total Hate Crimes: "+ feature.properties.HATE_CRIME); 
  }

function style(feature) {
    // console.log(feature.properties);
    return {
        fillColor: getColor(feature.properties.HATE_CRIME),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
        
    };
}
// console.log(geojson)
L.geoJson(geojson, {style: style, onEachFeature: onEachFeature}).addTo(map);









  });



});

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 1, 20, 50, 100, 200, 500, 1000],
        labels = [];
    div.innerHTML += '<p class="legend-title" >Number of</p>' + '<p class="legend-title" >Hate Crimes</p>'
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        if(i == 0){
          div.innerHTML +=
            '<i style="background:' + getColor(grades[i]) + '"></i> ' +
            grades[i] + '<br>';
    }else{
            div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

        }




    return div;
};

legend.addTo(map);

}


function buildBubble(){

 dataset = {
            "children": [
                {"Name":"AR","Count":346},
                {"Name":"AZ","Count":893},
                {"Name":"CA","Count":838},
                {"Name":"CO ","Count":685},
                {"Name":"CT","Count":943},
                {"Name":"DC","Count":1800},
                {"Name":" DE","Count":921},
                {"Name":"GA","Count":87},
                {"Name":"IA","Count":267},
                {"Name":"ID","Count":697},
                {"Name":"IL","Count":409},
                {"Name":"KS","Count":641},
                {"Name":"MA","Count":1478},
                {"Name":"MD","Count":928},
                {"Name":"MN","Count":780},
                {"Name":"MO","Count":483},
                {"Name":"MS","Count":48},
                {"Name":"NJ","Count":2018},
                {"Name":"NV","Count":555},
                {"Name":"NY","Count":929},
                {"Name":"OH","Count":679},
                {"Name":"OK","Count":346},
                {"Name":"OR","Count":988},
                {"Name":"PA","Count":259},
                {"Name":"TN","Count":565},
                {"Name":"TX","Count":258},
                {"Name":"VA","Count":604},
                {"Name":"WA","Count":975},
                {"Name":"WI","Count":239},
                {"Name":"AL","Count":40},
                {"Name":"FL","Count":237},
                {"Name":"IN","Count":264},
                {"Name":"KY","Count":635},
                {"Name":"LA","Count":98},
                {"Name":"ME","Count":902},
                {"Name":"MI","Count":1105},
                {"Name":"NC","Count":208},
                {"Name":"ND","Count":505},
                {"Name":"RI","Count":787},
                {"Name":"SC","Count":377},
                {"Name":"UT","Count":525},
                {"Name":"WY","Count":261},
                {"Name":"AK","Count":70},
                {"Name":"MT","Count":601},
                {"Name":"NM","Count":201},
                {"Name":"SD","Count":613},
                {"Name":"VT","Count":688},
                {"Name":"NH","Count":453},
                {"Name":"NB","Count":524},
                {"Name":"WV","Count":420},
                {"Name":"GM","Count":300}
                ]};

        var diameter = 1000;
        var color = d3.scaleOrdinal(d3.schemeReds[6]);

        var bubble = d3.pack(dataset)
            .size([diameter, diameter])
            .padding(1.5);

        var svg = d3.select("body")
            .append("svg")
            .attr("width", diameter)
            .attr("height", diameter)
            .attr("class", "bubble");

        var nodes = d3.hierarchy(dataset)
            .sum(function(d) { return d.Count; });

        var node = svg.selectAll(".node")
            .data(bubble(nodes).descendants())
            .enter()
            .filter(function(d){
                return  !d.children
            })
            .append("g")
            .attr("class", "node")
            .attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")"

            });
 
        node.append("title")
            .text(function(d) {
                return d.Name + ": " + d.Count;
            });

        node.append("circle")
            .attr("r", function(d) {
                return d.r;
            })
            .style("fill", function(d,i) {
                return color(i);
            })
        node.append("text")
            .attr("dy", ".2em")
            .style("text-anchor", "middle")
            .text(function(d) {
                return d.data.Name.substring(0, d.r / 3);
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", function(d){
                return d.r/5;
            })
            .attr("fill", "white");

        node.append("text")
            .attr("dy", "1.3em")
            .style("text-anchor", "middle")
            .text(function(d) {
                return d.data.Count;
            })
            .attr("font-family",  "Gill Sans", "Gill Sans MT")
            .attr("font-size", function(d){
                return d.r/5;
            })
            .attr("fill", "white");

        d3.select(self.frameElement)
            .style("height", diameter + "px");


};



buildHisto();
buildMap();
buildBubble();

