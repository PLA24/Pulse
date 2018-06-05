// load layer for every township
function currentLayer() {
    var cuLayer = getStoredValue('cLayer');
    if(cuLayer == 'amsterdam'){
      return vectorAmsterdamLayer;
    }else if(cuLayer == 'rotterdam'){
      return vectorRotterdamLayer;
    }else{
      return vectorGemeenteLayer;
    }
}
// get current date in proper format for current weather
var mapdate = new Date();
mapdate.setDate(mapdate.getDate() - 60)

var curday = mapdate.getDate();
var curmonth = mapdate.getMonth()+1;
var curyear = mapdate.getFullYear();

if(curday<10) {
    curday = '0'+curday
}
if(curmonth<10) {
    curmonth = '0'+curmonth
}

mapdate = curyear + '_' + curmonth + '_'

//composition of the map with multiple layers
var map = new ol.Map({
    layers: [
    //base layer van openstreet
    new ol.layer.Tile({
      source: new ol.source.OSM()
    }),
    //planet mosaic tile layer
    new ol.layer.Tile({
      source: new ol.source.XYZ({
        url: 'https://tiles.planet.com/basemaps/v1/planet-tiles/global_monthly_'+ mapdate + 'mosaic/gmap/{z}/{x}/{y}.png?api_key=cc785926661d40188fe04e08a97b609e'
      })
    }),



    //township layer
    currentLayer(),

    Heatmap,
    //pulse icon layer
    vectorLayer
  ],

  //properties of the map
  target: 'map',
  view: new ol.View({
    center: ol.proj.fromLonLat([5.498573, 52.165923]),
    minZoom: 8,
    maxZoom: 18,
    zoom: 8,
    exte3nt: [500000, 6750000, 750000, 7000000]
  })
});


var sensorname;

// display popup on click and set correct data in modal
map.on('click', function(evt) {
  var clickPulseData = map.forEachFeatureAtPixel(evt.pixel,
    function(clickPulseData, layer) {
      if (layer == vectorLayer) {
        sensorname = clickPulseData.get('name');
        return clickPulseData;
      }
    });
    // get current name, location, city from selected pulse marker
  sensorname = clickPulseData.get('name');
  locatieID = clickPulseData.get('locatieID');
  tempcity = clickPulseData.get('city');
  console.log(sensorname);
  console.log("locatie ID " + locatieID);

  function update() {
  $.get("/map/mapdata/" + locatieID, function(data) {
    $("#test").html(data.AmountTotal);
    DataChart.data.datasets[0].data[0] = 0;
    DataChart.data.datasets[0].data[1] = data.time01;
    DataChart.data.datasets[0].data[2] = data.time02;
    DataChart.data.datasets[0].data[3] = data.time03;
    DataChart.data.datasets[0].data[4] = data.time04;

    DataChart.update();
  });
  }
  $.get("http://api.openweathermap.org/data/2.5/weather?q="+ tempcity + "&APPID=0cf54f43941aa1eefd04455a4a2593f9", function(data) {
    var tempcelsius = Math.round((data.main.temp - 273.15) * 100) / 100;
    $("#temp").html(tempcelsius);
  });

  update();

  if (clickPulseData) {

    sensorname = clickPulseData.get('name');
    document.getElementById("p1").innerHTML = sensorname;
    //display modal on click
    $('.ui.modal')
      .modal({
        blurring: true
      })
      .modal('show');

  } else {
    //hide modal on click
    $('.ui.modal')
      .modal('hide');
    $(element).popover('destroy');
  }

});
