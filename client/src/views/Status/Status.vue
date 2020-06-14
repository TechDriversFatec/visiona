<template>
  <v-card
    max-width="344"
    class="mx-auto"
  >

  <v-row
    v-for="servico in arrayServicos"
    :key="servico.nome">

    <v-card-text align="center">
      {{servico.nome}}:{{servico.status}}

      <!-- <p v-if="servico.status">Online</p> -->

      <!-- <p v-if="servico.status"></p> -->

    </v-card-text>

  </v-row>

  </v-card>
</template>

<script src="./StatusController.js"></script>
