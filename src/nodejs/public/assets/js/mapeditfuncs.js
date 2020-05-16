$(document).ready(function() {

  // Definindo Token de acesso para a API
  mapboxgl.accessToken = 'pk.eyJ1IjoiZW56b2dlcm9sYSIsImEiOiJjanZlMnoxamUwOWg0NDNwMW00Z2s2OHVsIn0.pMtAJJpUbQgRGnKRpgmpRw';

  var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/satellite-v9', //hosted style id
    center: [-91.874, 42.76], // posição inicial
    zoom: 12 // zoom default
  });

  var getCoordsFromArea = $('#geojson')[0].innerText;
  getCoordsFromArea = JSON.parse(getCoordsFromArea);
  var Coords = getCoordsFromArea.features[0].geometry.coordinates;
  console.log(Coords);

  map.on('load', function() {
    map.addSource('maine', {
      'type': 'geojson',
      'data': {
        "type": "FeatureCollection",
        "features": [{
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "Polygon",
            "coordinates": [Coords]
          }
        }]
      }
    });

    map.addLayer({
      'id': 'maine',
      'type': 'fill',
      'source': 'maine',
      'layout': {},
      'paint': {
        'fill-color': '#088',
        'fill-opacity': 0.8
      }
    });
  });

});
