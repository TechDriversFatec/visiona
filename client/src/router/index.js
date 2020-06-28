import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '.././store';
import Home from '../views/Home/Home.vue'
import Areas from '../views/Areas/Areas.vue'
import Login from '../views/Login/Login.vue'
import Status from '../views/Status/Status.vue'
import Processamento from '../views/Processamento/Processamento.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '*',
    redirect: '/login',
  },
  {
    path: '/webgis',
    name: 'Home',
    component: Home,
    meta: {
      autenticado: false
    }
  },
  {
    path: '/poligonos',
    name: 'Areas',
    component: Areas,
    meta: {
      autenticado: false
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      autenticado: false
    }
  },
  {
    path: '/status',
    name: 'Status',
    component: Status,
    meta: {
      autenticado: false
    }
  },
  {
    path: '/processamento',
    name: 'Processamento',
    component: Processamento,
    meta: {
      autenticado: false
    }
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})

router.beforeEach((to, from, next) => {
  store.dispatch('fetchAccessToken');
  if (to.fullPath === '/login'){
    if (store.state.accessToken) {
      next('/webgis');
    }
  }
  if (to.meta.autenticado === true) {
    if (!store.state.accessToken) {
      next('/login');
    } else {
      next();
    }
  }

  next();
});

export default router
