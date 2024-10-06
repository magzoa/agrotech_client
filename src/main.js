import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false

// Define your OpenAI API key here
const OPENAI_API_KEY = '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';

// Set up Axios headers globally
axios.defaults.headers.common['Authorization'] = `Bearer ${OPENAI_API_KEY}`;
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Use Axios with Vue
Vue.use(VueAxios, axios);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')



