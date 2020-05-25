<template>
  <div>
    <v-row justify="space-between">
    <div id="mapbox" class="mapbox"></div>

    
    <v-card align="center" tile dark width="24%">
      <v-card-title>Informações</v-card-title>
      <v-card-text>
        <v-form v-model="form">
          <v-textarea
            label="GEOJson"
            readonly
            :value="poligono.geojson"
            auto-grow
            outlined
            row-height="25"
          ></v-textarea>
          <v-text-field
            label="Area (m²)"
            readonly
            :value="poligono.area_m2"
            :rules = "[rules.area_m2]"
            outlined
          ></v-text-field>
          <v-text-field
            label="Area (ha)"
            readonly
            :value="poligono.area_ha"
            :rules = "[rules.area_ha]"
            outlined
          ></v-text-field>
        </v-form>
        </v-card-text>
      <v-btn 
      class="primary"
      :disabled="!form"
      >Criar poligono</v-btn>
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
