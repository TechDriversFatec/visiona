import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';

//Leaflet
import { LMap, LTileLayer } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import LDrawToolbar from 'vue2-leaflet-draw-toolbar';
// ...
Vue.config.productionTip = false

//Registrando componentes do Leaflet
Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-draw-toolbar', LDrawToolbar);


new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
