<template>
  <div>
    <v-row justify="space-between">
    <div id="mapbox" class="mapbox"></div>

    
    <v-card align="center" width="24%" class="white--text" style="background-color: #23221e">
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
            row-height="5"
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
          <v-col cols="12" class="pb-0 pt-0">
        <v-subheader class="pl-4 white--text">Porcentagem de Nuvem:</v-subheader>
        <v-slider
          v-model="slider"
          thumb-label
        ></v-slider>
      </v-col>

  <v-col class="d-flex" cols="12">
        <v-select
          :items="items"
          label="Selecionar Satélite"
          dense
          solo
        ></v-select>
      </v-col>

            <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="700px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on">
          Selecionar Periodo
        </v-btn>
      </template>
      <v-card>
    <v-row>
    <v-col cols="12" sm="6">
      <v-date-picker class="ml-5" v-model="dates" range></v-date-picker>
    </v-col>
    <v-col cols="12" sm="6">
      <v-text-field class="mr-5" v-model="dateRangeText" label="Date range" readonly></v-text-field>
      model: {{ dates }}
    </v-col>
  </v-row> 
  <v-card-actions>
    <v-spacer></v-spacer>
          <v-btn class="mr-5" color="blue darken-1" text @click="dialog = false">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>

 
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
    height: 800px;
    border-radius: 5px;
  }
</style>
