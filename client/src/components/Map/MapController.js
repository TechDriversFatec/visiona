import Mapbox from "mapbox-gl";
import MapboxGeocoder from "mapbox-gl-geocoder"
import VueMapbox from "vue-mapbox";
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import Shpwrite from 'shp-write'
import * as turf from '@turf/turf'

//Services
import Processamento from '../../services/processamento'


export default {
  components: {
    Mapbox,
    VueMapbox,
    MapboxDraw,
  },
  data() {
    return {
      obj : {},
      geojson:null,
      geo_area:null,
      form: false,
      poligono: {
        geojson: null,
        area_m2: null,
        area_ha: null,
        nome: null,
      },

      rules: {
        area_m2: v => v < 30000000 || 'Tamanho do poligono não pode exceder 30 milhoẽs de m²',
        area_ha: v => v < 3000 || 'Tamanho do poligono não pode exceder 3000 hectares',
        nome: v => v != null || 'Nome da área não pode ficar em branco!'
      },


      map: {
        accessToken: 'pk.eyJ1IjoiZW56b2dlcm9sYSIsImEiOiJjanZlMnoxamUwOWg0NDNwMW00Z2s2OHVsIn0.pMtAJJpUbQgRGnKRpgmpRw',
        mapStyle: 'mapbox://styles/mapbox/satellite-streets-v11',
        center: [-45.7958296,-23.1623703], // posição inicial
        zoom: 12, // zoom default
      },

      dates: ['2019-09-10', '2019-09-20'],

      computed: {
        dateRangeText () {
          return this.dates.join(' ~ ')
        },
      },

      dialog: false,

      items: ['Sentinel', 'Landsat'],
    }
  },


  methods: {
    initMap(){
      var map = new Mapbox.Map({
        accessToken: this.map.accessToken,
        container: 'mapbox',
        style: this.map.mapStyle,
        center: this.map.center,
        zoom: this.map.zoom
      });

      // Adicionando controles

      // Ferramenta de desenhar poligonos
      var Draw = new MapboxDraw();
      map.addControl(Draw, 'top-right');

      // Ferramenta de pesquisa por endereço
      var geocoder = new MapboxGeocoder({
        accessToken: this.map.accessToken,
        mapboxgl: Mapbox,
        placeholder: 'Pesquisar',
        });
      map.addControl(geocoder,"top-left");

      // Ferramentas de navegação
      map.addControl(new Mapbox.NavigationControl(),"top-left");
      
      // Ferramenta de Tela cheia
      map.addControl(new Mapbox.FullscreenControl(),"top-left");
      

      // Método para quando a seleção for criada
      map.on('draw.create', () => {
        var data = Draw.getAll();
        this.poligono.geojson = data
        
        //Calculando area em metros quadrados
        this.poligono.area_m2 = turf.area(turf.polygon(data.features[0].geometry.coordinates));
        this.poligono.area_ha = this.poligono.area_m2 / 10000
        
        //Criando a shapefile
        Shpwrite.download(data)
      })

      // Método para quando a seleção for atualizada
      map.on('draw.update', () => {
        var data = Draw.getAll();
        this.poligono.geojson = data
        
        //Calculando area em metros quadrados
        this.poligono.area_m2 = turf.area(turf.polygon(data.features[0].geometry.coordinates));
        this.poligono.area_ha = this.poligono.area_m2 / 10000
      })

    },
    processarPoligono(){
      console.log(this.poligono)
      Processamento.criarArea(this.poligono).then(resposta => {
        console.log(resposta)
        this.$router.push('/poligonos')
      })

    }
  },
  mounted(){
    this.initMap()
  }
}
