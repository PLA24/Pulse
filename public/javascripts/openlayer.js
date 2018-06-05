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

data = new ol.source.Vector();

//eigenschappen pulse markers
var pulsemarker1 = new ol.Feature({
  geometry: new ol.geom.Point(ol.proj.fromLonLat([4.908942, 52.359899])),
  name: 'Amsterdam',
  locatieID: 1,
  city: 'amsterdam'


});

var pulsemarker2 = new ol.Feature({
  geometry: new ol.geom.Point(ol.proj.fromLonLat([4.477733, 51.924420])),
  name: 'Rotterdam',
  locatieID: 2,
  city: 'rotterdam'

});

var pulsemarker3 = new ol.Feature({
  geometry: new ol.geom.Point(ol.proj.fromLonLat([5.471422, 52.518537])),
  name: 'Lelystad',
  locatieID: 3,
  city: 'lelystad'

});
//heatmap marker data wordt nog niet gebruik
var pulsemarkerheatmap1 = new ol.Feature({
  geometry: new ol.geom.Point(ol.proj.fromLonLat([4.908942, 52.359899])),
  name: 'Amsterdam',
  locatieID: 1,
  testvalue: 100


});

var pulsemarkerheatmap2 = new ol.Feature({
  geometry: new ol.geom.Point(ol.proj.fromLonLat([4.477733, 51.924420])),
  name: 'Rotterdam',
  locatieID: 2,
  testvalue: 40


});

var pulsemarkerheatmap3 = new ol.Feature({
  geometry: new ol.geom.Point(ol.proj.fromLonLat([5.471422, 52.518537])),
  name: 'Lelystad',
  locatieID: 3,
  testvalue: 70


});


// customize style options for markers
var pulsemarkerstyle1 = new ol.style.Style({
  image: new ol.style.Icon( /** @type {olx.style.IconOptions} */ ({
    scale: 0.5,
    anchor: [0.5, 46],
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    src: '/images/pulse_icon.png'
  }))
});

var pulsemarkerstyle2 = new ol.style.Style({
  image: new ol.style.Icon( /** @type {olx.style.IconOptions} */ ({
    scale: 0.5,
    anchor: [0.5, 46],
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    src: '/images/pulse_icon.png'
  }))
});

var pulsemarkerstyle3= new ol.style.Style({
  image: new ol.style.Icon( /** @type {olx.style.IconOptions} */ ({
    scale: 0.5,
    anchor: [0.5, 46],
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    src: '/images/pulse_icon.png'
  }))
});
//add makers to heatmap
data.addFeature(pulsemarkerheatmap1);
data.addFeature(pulsemarkerheatmap2);
data.addFeature(pulsemarkerheatmap3);
// set style for markers
pulsemarker1.setStyle(pulsemarkerstyle1);
pulsemarker2.setStyle(pulsemarkerstyle2);
pulsemarker3.setStyle(pulsemarkerstyle3);

//pulse marker
var vectorSource = new ol.source.Vector({
  features: [pulsemarker1, pulsemarker2, pulsemarker3]
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


// heatmap layer WIP
var Heatmap = new ol.layer.Heatmap({
     source: data ,
     radius: 30,
      weight: function(feature){
    //     // get your feature property
         var locatieIDheatmap = feature.get('locatieID');
         var heatmapamount;
         $.get("/map/mapdata/" + locatieIDheatmap, function(data) {
           heatmapamount = data.AmountTotal/10000;
           });

         //var weightProperty = feature.get('testvalue');
         var weightProperty = heatmapamount;
         // perform some calculation to get weightProperty between 0 - 1
         //weightProperty = weightProperty /1569; // this was your suggestion - make sure this makes sense
         return weightProperty;
     }
 });


console.log(name);
