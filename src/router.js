
import { createRouter, createWebHistory } from 'vue-router'

import Login from './components/Login.vue';
import HelloWorld from './components/HelloWorld.vue';
import AuthCallBackHandler from './components/AuthCallBackHandler.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
