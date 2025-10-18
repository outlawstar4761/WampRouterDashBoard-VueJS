import Vue from 'vue';
import Router from 'vue-router';
import VueCookies from 'vue-cookies'

import Login from './components/Login.vue'
import HelloWorld from './components/HelloWorld.vue'
import AuthCallBackHandler from './components/AuthCallBackHandler.vue';

Vue.use(Router);
Vue.use(VueCookies)

const router = new Router({
  mode:'history',
  base: import.meta.env.BASE_URL,
  linkExactActiveClass:'active',
  routes:[
    {path:'/',component:Login},
    {path:'/home',component:HelloWorld},
    {path:'/token',component:AuthCallBackHandler},
    {path:'/logout',component:Login}
  ]
});

export default router;
