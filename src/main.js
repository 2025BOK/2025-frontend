import Vue from 'vue'
import App from './App.vue'
import router from './routes/index';
import axios from 'axios';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

axios.defaults.withCredentials = true;
Vue.use(Vuetify)

Vue.prototype.$axios = axios
Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  vuetify: new Vuetify(),
  router,
}).$mount('#app')

