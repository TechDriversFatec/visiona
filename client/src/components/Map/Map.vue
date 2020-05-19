<template>
  <div>
    <v-row justify="space-between">
    <div id="mapbox" class="mapbox"></div>

    
    <v-card dark width="24%">
      <v-card-title>Informações</v-card-title>
      <v-card-content>
        <v-textarea
          label="GEOJson"
          disabled
          :value="geojson"
          auto-grow
          outlined
          row-height="25"
        ></v-textarea>
      </v-card-content>
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
