<template>
  <v-app>
    <Navbar></Navbar>
    <v-content class="ma-4">
      <router-view></router-view>
    </v-content>
    <!-- <Footer></Footer> -->
  </v-app>
</template>

<script>
// import Footer from './components/Footer/Footer.vue'
import Navbar from './components/Navbar/Navbar.vue'

export default {
  name: 'App',

  components: {
    // Footer,
    Navbar,
  },

  data: () => ({
    //
  }),
};
</script>
