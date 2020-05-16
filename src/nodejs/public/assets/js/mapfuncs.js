$(document).ready(function(){

  // Definindo Token de acesso para a API
  mapboxgl.accessToken = 'pk.eyJ1IjoiZW56b2dlcm9sYSIsImEiOiJjanZlMnoxamUwOWg0NDNwMW00Z2s2OHVsIn0.pMtAJJpUbQgRGnKRpgmpRw';

  var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/satellite-v9', //hosted style id
    center: [-91.874, 42.76], // posição inicial
    zoom: 12 // zoom default
  });

  var draw = new MapboxDraw({
    displayControlsDefault: false,
    controls: {
      polygon: true,
      trash: true
    }
  });
  map.addControl(draw);

  map.on('draw.create', updateArea);
  map.on('draw.delete', updateArea);
  map.on('draw.update', updateArea);

  var GeoJSON = {
    "type":"FeatureCollection",
    "features" : [{
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Polygon",
          "coordinates": []
        }
      }]
  };

  function updateArea(e) {
    var data = draw.getAll();
    var answer = document.getElementById('calculated-area');

    if (data.features.length > 0) {
      var area = turf.area(data);
      var getCoordsFromArea = data.features[0].geometry.coordinates[0];
      var coords = turf.getCoords(getCoordsFromArea);

      GeoJSON.features[0].geometry.coordinates = coords;
      // GeoJSON = JSON.stringify(GeoJSON, null, 2);
      GeoJSON = JSON.stringify(GeoJSON);
      $('#geojson').val(GeoJSON);
      console.log(GeoJSON);
      // restrict to area to 2 decimal points
      var rounded_area = Math.round(area * 100) / 100;
      answer.innerHTML =
      '<p><strong>' +
      rounded_area +
      '</strong></p><p>Metros Quadrados</p>';
    } else {
      answer.innerHTML = '';
      if (e.type !== 'draw.delete')
      alert('Use the draw tools to draw a polygon!');
    }
  }

});
