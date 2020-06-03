import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Home.vue'
import Areas from '../views/Areas/Areas.vue'
import Login from '../views/Login/Login.vue'
import Status from '../views/Status/Status.vue'
import Processamento from '../views/Processamento/Processamento.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/gis',
    name: 'Home',
    component: Home
  },
  {
    path: '/poligonos',
    name: 'Areas',
    component: Areas
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/status',
    name: 'Status',
    component: Status
  },
  {
    path: '/processamento',
    name: 'Processamento',
    component: Processamento
  }
]

const router = new VueRouter({
  routes
})

export default router
