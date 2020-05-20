<template>
  <div>
    <v-row justify="space-between">
    <div id="mapbox" class="mapbox"></div>

    
    <v-card align="center" tile dark width="24%">
      <v-card-title>Informações</v-card-title>
      <v-card-text>
        <v-textarea
          label="GEOJson"
          readonly
          clearable
          :value="poligono.geojson"
          auto-grow
          outlined
          row-height="25"
        ></v-textarea>
        <v-textarea
          label="Area (m²)"
          readonly
          clearable
          :value="poligono.area_m2"
          outlined
        ></v-textarea>
        <v-textarea
          label="Area (ha)"
          readonly
          clearable
          :value="poligono.area_ha"
          outlined
        ></v-textarea>
      </v-card-text>
      <v-btn class="primary">Criar poligono</v-btn>
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
