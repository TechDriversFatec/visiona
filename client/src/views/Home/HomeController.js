import Mapbox from "mapbox-gl";
import VueMapbox from "vue-mapbox";
import MapboxDraw from '@mapbox/mapbox-gl-draw';
export default {
  name: 'Home',
  components: {
    Mapbox,
    VueMapbox,
    MapboxDraw
  },
  data() {
    return {
      obj : {},
      map: {
        accessToken: 'pk.eyJ1IjoiZW56b2dlcm9sYSIsImEiOiJjanZlMnoxamUwOWg0NDNwMW00Z2s2OHVsIn0.pMtAJJpUbQgRGnKRpgmpRw',
        mapStyle: 'mapbox://styles/mapbox/satellite-v9',
        center: [-91.874, 42.76], // posição inicial
        zoom: 12, // zoom default
      },
    }
  },
  methods: {
    initMap(){
      // Access Token - MapBox
      var map = new Mapbox.Map({
        accessToken: this.map.accessToken,
        container: 'mapbox',
        style: this.map.mapStyle,
        center: this.map.center,
        zoom: this.map.zoom
      });

      // Adicionando dependências
      var Draw = new MapboxDraw();
      map.addControl(Draw, 'top-right');

      // Método para quando a seleção for criada
      map.on('draw.create', () => {
        var data = Draw.getAll();
        console.log({
          data: data
        });
      })
      // Método para quando a seleção for atualizada
      map.on('draw.update', () => {
        var data = Draw.getAll();
        console.log({
          data: data
        });
      })

    }
  },
  mounted(){
    this.initMap()
  }
}
