<template style="background-color: black;">
  <div>
    <v-container
    pa-5
    >
      <v-row justify="center">
          <v-col justify="center">
            <v-row justify="center">
              <v-icon color="black" v-if="$route.params.ep>1" @click="pagAnte()" size="50px">mdi-chevron-left</v-icon>
              <span class="display-2 font-italic white--text">"{{dadosEp.nome}}"</span>
              <v-icon color="black" v-if="$route.params.ep<500" @click="proxPag()" size="50px">mdi-chevron-right</v-icon>
            </v-row>
            <v-row>
              <v-card
              flat
              class="mx-auto transparent"
              >
              <v-card-text>
                <v-chip-group
                  multiple
                  column
                  active-class="primary--text"
                >
                  <v-chip
                  color="#FF8F00" 
                  v-for="tag in dadosEp.personagens" 
                  :key="tag">
                    {{ tag }}
                  </v-chip>
                </v-chip-group>
              </v-card-text>
            </v-card>
            </v-row>
            <v-row justify="center" align="center">
              <iframe src="https://drive.google.com/file/d/1ovgMMdsZFrT7Z2mvybY75lKzQ-F_peGo/preview" frameborder="0" allowfullscreen width="720" height="640"></iframe>
            </v-row>
          </v-col>

      </v-row>
    </v-container>
  </div>
</template>

<script src="./EpisodioController.js"></script>

<style scoped>

.transparent {
   background-color: white!important;
   opacity: 0.65;
   border-color: transparent!important;
 }
</style>