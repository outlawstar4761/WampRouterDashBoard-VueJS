import Vue from 'vue';
import Router from 'vue-router';
import VueCookies from 'vue-cookies'

import Login from './components/Login.vue'
import HelloWorld from './components/HelloWorld.vue'

Vue.use(Router);
Vue.use(VueCookies)

const router = new Router({
  mode:'hash',
  //base: process.env.BASE_URL + 'wamp/',
  linkExactActiveClass:'active',
  routes:[
    {path:'/',component:Login},
    {path:'/home',component:HelloWorld}
  ]
});

export default router;
