<template>

  <v-container grid-list-xs>

  <v-card
    flat
    tile
    class="mx-auto"
    style="background-color: #E1EFE6"
  >
    <div class="text-center">
    <v-pagination
      v-model="pagina"
      :length="total_paginas"
      v-on:next="atualizarLista()"
      v-on:previous="atualizarLista()"
      v-on:input="atualizarLista()"
    ></v-pagination>
  </div>
    <v-container class="pa-1">
      <v-item-group
        multiple
        column
      >
        <v-row>
          <v-col
            v-for="area in arrayAreas"
            :key="area.id"
            cols="4"
            md="3"
          >
            <v-card
              outlined
              class="white--text"
              style="background-color: #000411;"
              max-height="800"
              max-width="344"
            >
              <v-card-title class="white--text headline">{{area.title}}</v-card-title>
              
              <v-img
                contain
                :src="`https://assets.planet.com/images/meta-images/ag.jpg`"
              ></v-img>
              <v-card-text class="white--text">
                <h4>Percentual de nuvens: {{area.cloudiness}}</h4>
                <h4>Satelite: {{area.satellite}}</h4>
                <h4>Hectares: {{area.ha}}</h4>
                <h4>Periodo: {{area.period}}</h4>
              </v-card-text>
              <v-card-actions>

                <v-row justify="center">
                  <v-btn>Processar imagens</v-btn>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-item-group>
    </v-container>
    </v-card>

  </v-container>
</template>

<script src="./AreasController.js"></script>

<style scoped>

.transparent {
   background-color: white!important;
   opacity: 0.65;
   border-color: transparent!important;
 }
</style>

<script src="./AreasController.js"></script>
