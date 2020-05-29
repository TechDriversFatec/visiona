<template>
  <nav>
    <v-toolbar dark flat app>
      <v-toolbar-title>Visiona</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn tile class="primary" @click="$router.push('/')">WebGIS</v-btn>
      <v-btn tile class="primary" @click="$router.push('/areas')">Areas</v-btn>
      
    </v-toolbar>

  </nav>
</template>

<script src="./NavbarController.js"></script>