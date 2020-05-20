<template>
  <div>
    <v-row justify="space-between">
    <div id="mapbox" class="mapbox"></div>

    
    <v-card tile dark width="24%">
      <v-card-title>Informações</v-card-title>
      <v-card-text>
        <v-textarea
          label="GEOJson"
          readonly
          clearable
          :value="geojson"
          auto-grow
          outlined
          row-height="25"
        ></v-textarea>
      </v-card-text>
      <v-btn>TESTE PORRA</v-btn>
    </v-card>

    </v-row>
  </div>
</template>
<script src="./MapController.js"></script>

<style scoped="./mapbox">
  .mapbox{
    width: 75%;
    height: 750px;
  }
</style>
