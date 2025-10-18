import Vue from 'vue'
import App from './App.vue'

import VueMaterial from 'vue-material';
import '../node_modules/vue-material/dist/vue-material.min.css';
import '../node_modules/vue-material/dist/theme/default.css';

import store from './store';
import router from './router';
import './registerServiceWorker'

Vue.config.productionTip = false;

Vue.use(VueMaterial);


new Vue({
  render: h => h(App),
  store:store,
  router:router,
  created(){}
}).$mount('#app')
