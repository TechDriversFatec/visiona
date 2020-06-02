import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Home.vue'
import Areas from '../views/Areas/Areas.vue'

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
  }
]

const router = new VueRouter({
  routes
})

export default router
