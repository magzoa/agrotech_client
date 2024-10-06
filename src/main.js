import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

import 'leaflet/dist/leaflet.css';

import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false


// Vue.component('l-map', LMap);
// Vue.component('l-tile-layer', LTileLayer);
// Vue.component('l-marker', LMarker);


// Use Axios with Vue
Vue.use(VueAxios, axios);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')



