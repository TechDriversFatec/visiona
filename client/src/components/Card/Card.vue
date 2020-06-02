<template>
  <v-row justify="center">
    <v-btn
      color="primary"
      dark
      @click.stop="dialog = true"
    >
      Detalhes
    </v-btn>

    <v-dialog
      v-model="dialog"
      max-width="600"
    >
      <v-card dark>
        <v-card-title class="headline">{{area.area_nome}}</v-card-title>
        <v-carousel
          cycle
          height="400"
          hide-delimiter-background
          show-arrows-on-hover
        >
          <v-carousel-item
            v-for="(img, i) in JSON.parse(area.payload_imgs).imgs"
            :key="i"
          >
            <v-img
              class="white--text align-end"
              height="300"
              width="400"
              contain
              :src="img"
              >
            </v-img>
          </v-carousel-item>
        </v-carousel>

        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>

            <v-card-text>
              Coordenadas:
              {{JSON.parse(area.geojson)[0]}}
            </v-card-text>
          </div>
        </v-expand-transition>

        <v-card-actions>

          <v-spacer></v-spacer>

          <v-btn
            color="red darken-1"
            text
            @click="dialog = false"
          >
            Cancelar
          </v-btn>

          <v-btn
            color="green darken-1"
            text
          >
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script src="./CardController.js">

</script>
