<template>
  <v-app style="background-color: #E1EFE6">
    <Navbar v-if="$route.meta.autenticado"></Navbar>
    <v-content class="ma-4">
      <router-view></router-view>
    </v-content>
    <Footer v-if="$route.meta.autenticado"></Footer>
  </v-app>
</template>

<script>
import Footer from './components/Footer/Footer.vue'
import Navbar from './components/Navbar/Navbar.vue'

export default {
  name: 'App',

  components: {
    Footer,
    Navbar,
  },

  data: () => ({
    //
  }),
};
</script>
