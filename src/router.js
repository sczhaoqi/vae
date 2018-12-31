import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import P404 from './views/404.vue';
import PLogin from './views/Login.vue';

import routerInterceptor from './routers/routerInterceptor';
import studyRouter from './routers/study';

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    { path: '/login', component: PLogin },
    { path: '/404', P404 },
    { path: '*', redirect: '/404' }
  ]
})
//路由拦截
routerInterceptor(router);

//加载各模块的路由
studyRouter(router);

export default router