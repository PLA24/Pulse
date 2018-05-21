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

var map = new ol.Map({
    layers: [
    //base layer van openstreet
    new ol.layer.Tile({
      source: new ol.source.OSM()
    }),
    //planet mosaic tile layer
    new ol.layer.Tile({
      source: new ol.source.XYZ({
        url: 'https://tiles.planet.com/basemaps/v1/planet-tiles/global_monthly_2017_08_mosaic/gmap/{z}/{x}/{y}.png?api_key=cc785926661d40188fe04e08a97b609e'
      })
    }),

    //gemeente layer
    currentLayer(),
    //pulse icon
    vectorLayer
  ],
  //view eigenschappen
  target: 'map',
  view: new ol.View({
    center: ol.proj.fromLonLat([5.498573, 52.165923]),
    minZoom: 8,
    maxZoom: 18,
    zoom: 8,
    exte3nt: [500000, 6750000, 750000, 7000000]
  })
});

//eigenschappen van popup
var element = document.getElementById('popup');

var popup = new ol.Overlay({
  element: element,
  positioning: 'bottom-center',
  stopEvent: false,
  offset: [0, -50]
});
<<<<<<< HEAD
=======
map.addOverlay(popup);
var sensorname;

testprint = 0;

>>>>>>> 486daa57a56d98a17f0086d7814b599666c3a749

map.addOverlay(popup);
// display popup on click
map.on('click', function(evt) {
  // $('#test').load('/map #test');
  var feature1 = map.forEachFeatureAtPixel(evt.pixel,
    function(feature1, layer) {
      if (layer == vectorLayer) {
        sensorname = feature1.get('name');
        return feature1;
      }
    });

  sensorname = feature1.get('name');
  locatieID = feature1.get('locatieID');
  console.log(sensorname);
  console.log("locatie ID " + locatieID);

  function update() {
  $.get("/map/mapdata/" + locatieID, function(data) {
    $("#test").html(data.AmountTotal);
    console.log("hallooo" + testprint)
    DataChart.data.datasets[0].data[0] = 0;
    DataChart.data.datasets[0].data[1] = data.time01;
    DataChart.data.datasets[0].data[2] = data.time02;
    DataChart.data.datasets[0].data[3] = data.time03;
    DataChart.data.datasets[0].data[4] = data.time04;

    DataChart.update();
  });
  }
  update();




  if (feature1) {



    //$('#test').load('/map' + ' #test');
    sensorname = feature1.get('name');
    document.getElementById("p1").innerHTML = sensorname;
    //display modal
    $('.ui.modal')
      .modal({
        blurring: true
      })
      .modal('show');

    // var coordinates = feature1.getGeometry().getCoordinates();
    // popup.setPosition(coordinates);
    // $(element).popover({
    //   'placement': 'top',
    //   'html': true,
    //   'content': feature1.get('name')
    // });
    // $(element).popover('show');
  } else {

    $('.ui.modal')
      .modal('hide');
    $(element).popover('destroy');
  }

});

<<<<<<< HEAD

=======
//
>>>>>>> 486daa57a56d98a17f0086d7814b599666c3a749
