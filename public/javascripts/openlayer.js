//gemeente layer style eigenschappen

var style = new ol.style.Style({
  fill: new ol.style.Fill({
    color: 'rgba(255, 255, 255, 0.3)'
  }),
  stroke: new ol.style.Stroke({
    color: '#319FD3',
    width: 1
  }),
  text: new ol.style.Text({
    font: '12px Calibri,sans-serif',
    fill: new ol.style.Fill({
      color: '#000'
    }),
    stroke: new ol.style.Stroke({
      color: '#fff',
      width: 3
    })
  })
});

//eigenschappen pulse marker
var iconFeature = new ol.Feature({
  geometry: new ol.geom.Point(ol.proj.fromLonLat([4.908942, 52.359899])),
  name: 'Amsterdam HVA BPH',
  population: 4000,
  rainfall: 500

});

var iconStyle = new ol.style.Style({
  image: new ol.style.Icon( /** @type {olx.style.IconOptions} */ ({
    scale: 0.5,
    anchor: [0.5, 46],
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    src: '/images/pulse_icon.png'
  }))
});

iconFeature.setStyle(iconStyle);

//pulse marker
var vectorSource = new ol.source.Vector({
  features: [iconFeature]
});

var vectorLayer = new ol.layer.Vector({
  source: vectorSource
});

//amsterdam layer
var vectorAmsterdamLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: '/geojson/amsterdam.geojson',
        format: new ol.format.GeoJSON()


    }),
    style: function(feature) {
        style.getText().setText(feature.get('name'));
        return style;

    }
});

//rotterdam layer
var vectorRotterdamLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: '/geojson/rotterdam.geojson',
        format: new ol.format.GeoJSON()


    }),
    style: function(feature) {
        style.getText().setText(feature.get('name'));
        return style;

    }
});

//gemeente layer
var vectorGemeenteLayer = new ol.layer.Vector({
  source: new ol.source.Vector({
    url: '/geojson/townships.geojson',
    format: new ol.format.GeoJSON()


  }),
  style: function(feature) {
    style.getText().setText(feature.get('name'));
    return style;

  }
});