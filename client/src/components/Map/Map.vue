<template>
  <div>
    <v-row justify="space-between">
    <div id="mapbox" class="mapbox"></div>

    
    <v-card align="center" width="24%" class="white--text" style="background-color: #23221e">
      <v-card-title>Informações</v-card-title>
      <v-card-text>
        <v-form v-model="form">
          <!-- Nome da area -->
          <v-text-field
            background-color="#e1efe6"
            placeholder="Nome"
            v-model="area.title"
            outlined
            :rules = "[rules.nome]"
            color="black"
          ></v-text-field>
          <!-- GEOJSON -->
          <v-textarea
            background-color="#e1efe6"
            placeholder="GEOJson"
            readonly
            :value="JSON.stringify(area.geojson)"
            auto-grow
            outlined
            row-height="5"
          ></v-textarea>
          <!-- Area em hectares -->
          <v-text-field
            color="black"
            background-color="#e1efe6"
            placeholder="Area (ha)"
            readonly
            :value="area.ha"
            :rules = "[rules.area_ha]"
            outlined
          ></v-text-field>
          <v-col cols="12" class="pb-0 pt-0">
          <!-- Slider de porcentagem de nuvens -->
          <v-spacer></v-spacer>
          <h4 class="pl-4 white--text">Porcentagem de Nuvem: {{area.cloudiness}}</h4>
          <v-slider
            v-model="area.cloudiness"
            thumb-label
            color="#006064"
          ></v-slider>
          <!-- Model de selecionar periodo -->
          <h4 class="pl-4 white--text">Periodo das imagens: {{area.period}}</h4>
          <v-row justify="center">
            <v-date-picker 
              v-model="area.period"
              range
              color="#006064"
            >
            </v-date-picker>
          </v-row>
          </v-col>
          <!-- Select de Satelites -->
          <v-col class="d-flex" cols="12">
            <v-select
              :items="arraySatelites"
              label="Selecionar Satélite"
              dense
              v-model="area.satellite"
              :value="arraySatelites[0]"
              solo
            ></v-select>
          </v-col>
        </v-form>
      </v-card-text>
      <v-btn
        class="white--text"
        style="background-color: #006064;"
        :disabled="!form"
        @click="criarArea()"
        >Processar área
      </v-btn>
    </v-card>
    </v-row>
  </div>
</template>
<script src="./MapController.js"></script>

<style scoped>
  .mapbox{
    width: 75%;
    height: 800px;
    border-radius: 5px;
  }
</style>
