<template>
  <div>
    <v-row justify="space-between">
    <div id="mapbox" class="mapbox"></div>

    
    <v-card align="center" width="24%" class="white--text" style="background-color: #000411;">
      <v-card-title>Informações</v-card-title>
      <v-card-text>
        <v-form v-model="form">
          <v-text-field
            background-color="#e1efe6"
            placeholder="Nome"
            v-model="poligono.nome"
            outlined
            color="black"
          ></v-text-field>
          <v-textarea
            background-color="#e1efe6"
            placeholder="GEOJson"
            readonly
            :value="JSON.stringify(poligono.geojson)"
            auto-grow
            outlined
            row-height="25"
          ></v-textarea>
          <v-text-field
            background-color="#e1efe6"
            placeholder="Area (m²)"
            readonly
            :value="poligono.area_m2"
            :rules = "[rules.area_m2]"
            outlined
          ></v-text-field>
          <v-text-field
            color="black"
            background-color="#e1efe6"
            placeholder="Area (ha)"
            readonly
            :value="poligono.area_ha"
            :rules = "[rules.area_ha]"
            outlined
          ></v-text-field>
        </v-form>
        </v-card-text>
      <v-btn
      class="black--text"
      style="background-color: #EFCB68;"
      :disabled="!form"
      @click="processarPoligono()"
      >Processar poligono</v-btn>
    </v-card>

    </v-row>
  </div>
</template>
<script src="./MapController.js"></script>

<style scoped>
  .mapbox{
    width: 75%;
    height: 750px;
    border-radius: 5px;
  }
</style>
