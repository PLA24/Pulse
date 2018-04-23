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
    vectorGemeenteLayer,
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
    extent: [500000, 6750000, 750000, 7000000]
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
map.addOverlay(popup);

// display popup on click
map.on('click', function(evt) {
  var feature1 = map.forEachFeatureAtPixel(evt.pixel,
    function(feature1, layer) {
      if (layer == vectorLayer) {
        name = feature1.get('name');
        return feature1;
      }
    });

  name = feature1.get('name');
  console.log(name);
  if (feature1) {

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
