import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Home.vue'
import Areas from '../views/Areas/Areas.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/areas',
    name: 'Areas',
    component: Areas
  }
]

const router = new VueRouter({
  routes
})

export default router
