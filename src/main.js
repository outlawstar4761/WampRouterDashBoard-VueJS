import Vue from 'vue'
import App from './App.vue'
import VueWamp from 'vue-wamp'

import VueMaterial from 'vue-material';
import '../node_modules/vue-material/dist/vue-material.min.css';
import '../node_modules/vue-material/dist/theme/default.css';

import store from './store';
import router from './router';

Vue.config.productionTip = false;

Vue.use(VueWamp,{
  url:'ws://api.outlawdesigns.io:9700/ws',
  realm:'realm1',
  onChallenge(session,method,extra){
    console.log({session, method, extra});
  }
});

Vue.use(VueMaterial);


new Vue({
  render: h => h(App),
  store:store,
  router:router,
  created(){
    this.$store.dispatch('verifyToken',{auth_token:this.$cookies.get('auth_token')});
  }
}).$mount('#app')
