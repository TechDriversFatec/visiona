<template>
  <nav>
    <v-toolbar dark flat app>

      <v-app-bar-nav-icon @click="navbar = !navbar"></v-app-bar-nav-icon>      
      <v-toolbar-title>Visiona</v-toolbar-title>
    </v-toolbar>

    <v-navigation-drawer app dark v-model="navbar">
      <p>TEste</p>
    </v-navigation-drawer>


  </nav>
</template>

<script src="./NavbarController.js"></script>