<template>
  <nav>
    <v-toolbar class="white--text" style="background-color: #000411" app>
      <v-avatar>
        <img
        src="https://media-exp1.licdn.com/dms/image/C560BAQEvWg3rCJNK8w/company-logo_200_200/0?e=2159024400&v=beta&t=iUaczIUx5iKmmXUghyiPiM002qUzlpQXebLqxvgqzO0"
        alt="John"
      >
      </v-avatar>
      
      <v-spacer></v-spacer>

      <v-row
        v-for="route in arrayRoutes"
        :key="route.nome"
      >
        <v-btn style="background-color:transparent;" class="white--text" @click="$router.push(route.route)">{{route.nome}}</v-btn> 
      </v-row>
      

    </v-toolbar>

  </nav>
</template>

<script src="./NavbarController.js"></script>