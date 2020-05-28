<template>

  <v-container grid-list-xs>
  <v-card
    flat
    tile
    class="mx-auto transparent"
  >
    <v-container class="pa-1">
      <v-item-group
        multiple
        column
      >
        <v-row>
          <v-col
            v-for="item in arrayEpisodios"
            :key="item.episodio"
            cols="4"
            md="3"
          >
            <v-item v-if="item.episodio>0 && item.episodio <=12">
              <v-hover v-slot:default="{ hover }">
                <v-card
                  outlined
                  height="250"
                  max-width="344"
                  class="mx-auto black"
                  :elevation="hover ? 12 : 2"
                >
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="white--text headline">AREA {{formatarNum(item.episodio)}}</v-list-item-title>
                      <v-list-item-subtitle class="grey--text">dd/mm/aaaa</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>


                  <v-img
                    src="..\..\assets\Imagens_Remover\mapaicon.png"
                    max-height="120"
                    class="pa-7"
                  ></v-img>

                  <v-card-actions>
                    <Card></Card>
                    <v-btn class="white--text" icon>
                      <v-icon>mdi-flash</v-icon>
                    </v-btn>

                  </v-card-actions>
                </v-card>
              </v-hover>
            </v-item>
          </v-col>
        </v-row>
      </v-item-group>
    </v-container>
    </v-card>

  </v-container>
</template>

<script src="./PainelController.js"></script>

<style scoped>

.transparent {
   background-color: white!important;
   opacity: 0.65;
   border-color: transparent!important;
 }
</style>

<script src="./AreasController.js"></script>
