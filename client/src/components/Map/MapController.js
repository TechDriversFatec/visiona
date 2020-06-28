import Mapbox from "mapbox-gl";
import MapboxGeocoder from "mapbox-gl-geocoder"
import VueMapbox from "vue-mapbox";
import MapboxDraw from '@mapbox/mapbox-gl-draw';
// import Shpwrite from 'shp-write'
import * as turf from '@turf/turf'

//Services
// import Processamento from '../../services/processamento'
import Areas from '../../services/areas'
import Imgur from '../../services/uploadImage'
import router from "../../router";

export default {
  components: {
    Mapbox,
    VueMapbox,
    MapboxDraw,
  },
  data() {
    return {
      arraySatelites: ['Sentinel', 'Landsat'], //Satelites disponiveis
      area: {
        title: '',
        satellite: 'Sentinel', //Satelite padrão
        period: ['2020-01-01','2020-01-31'], //Mês de janeiro de 2020 como padrão
        cloudiness: 50, //Padrão 50%
        geojson: null,
        m2: null,
        ha: null,
      },
      obj : {},
      geojson:null,
      geo_area:null,
      form: false,
      buf: null,

      rules: {
        area_ha: v => v < 3000 || 'Tamanho do poligono não pode exceder 3000 hectares',
        nome: v => v != '' || 'Nome da área não pode ficar em branco!'
      },

      map: {
        accessToken: 'pk.eyJ1IjoiZW56b2dlcm9sYSIsImEiOiJjanZlMnoxamUwOWg0NDNwMW00Z2s2OHVsIn0.pMtAJJpUbQgRGnKRpgmpRw',
        mapStyle: 'mapbox://styles/mapbox/satellite-streets-v11',
        center: [-45.7958296,-23.1623703], // posição inicial
        zoom: 12, // zoom default
      }

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
        this.area.geojson = data
        
        //Calculando area em metros quadrados
        this.area.m2 = turf.area(turf.polygon(data.features[0].geometry.coordinates));
        this.area.ha = (this.area.m2 / 10000).toFixed(2)
        
        this.buf = Buffer.from(map.getCanvas().toDataURL('image/png', 1.0), 'base64'); // Criando arquivo binario com base64
        console.log(this.filePath)
        
        //Baixando a shapefile
        // Shpwrite.download(data)
      })
      
      // Método para quando a seleção for atualizada
      map.on('draw.update', () => {
        var data = Draw.getAll();
        this.area.geojson = data
        
        //Calculando area em metros quadrados
        this.area.m2 = turf.area(turf.polygon(data.features[0].geometry.coordinates));
        this.area.ha = (this.area.m2 / 10000).toFixed(2)
        this.buf = Buffer.from(map.getCanvas().toDataURL('image/png', 1.0), 'base64'); // Criando arquivo binario com base64
      })
      
    },
    criarArea(){
      Areas.adicionarArea(this.area).then(resposta => {
        console.log(resposta)
        router.push('/areas')
      })
    },
    teste(){
      Imgur.uploadImagem(this.buf).then(resposta => {
        console.log(resposta)
      })
    }
  },
  mounted(){
    this.initMap()
  }
}
