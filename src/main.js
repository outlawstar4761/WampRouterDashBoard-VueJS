import Vue from 'vue'
import App from './App.vue'
import VueWamp from 'vue-wamp'

import VueMaterial from 'vue-material';
import '../node_modules/vue-material/dist/vue-material.min.css';
import '../node_modules/vue-material/dist/theme/default.css';

import store from './store';

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
  created(){
    //get initial values
    this.$store.dispatch('getRegistrations');
    this.$store.dispatch('getSubscriptions');
    this.$store.dispatch('getSessions');
    //subscribe to changes
    //SESSION
    this.$store.dispatch('subscribeToNewSessions');
    this.$store.dispatch('subscribeToLostSessions');
    //SUBSCRIPTIONS
    this.$store.dispatch('subscribeToNewSubscriptions');
    this.$store.dispatch('subscribeToLostSubscriptions');
    this.$store.dispatch('subscribeToOnSubscribe');
    this.$store.dispatch('subscribeToOnUnsubscribe');
    //REGISTRATIONS
    this.$store.dispatch('subscribeToNewRegistrations');
    this.$store.dispatch('subscribeToLostRegistrations');

    this.$store.dispatch('subscribeToRandomNumber');
  }
}).$mount('#app')
