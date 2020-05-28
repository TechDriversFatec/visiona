<template>
  <v-row justify="center">
    <v-btn
      color="primary"
      dark
      @click.stop="dialog = true"
    >
      Card JSON
    </v-btn>

    <v-dialog
      v-model="dialog"
      max-width="600"
    >
      <v-card dark>
        <v-card-title class="headline">Card</v-card-title>
        <v-img
          class="white--text align-end"
          height="300"
          width="400"
          src="..\..\assets\Imagens_Remover\mapa9.png">
        </v-img>


        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>

            <v-card-text>
              ""Informações de Latitude e Longitude""
              GEOJEISO
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
