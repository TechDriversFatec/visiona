<template>
  <div>
    <v-row justify="space-between">
    <div id="mapbox" class="mapbox"></div>

    
    <v-card align="center" width="24%" class="white--text" style="background-color: #7685a7">
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
       <v-col cols="12" class="pt-0">
          <v-subheader class="pl-4 white--text">Satélites:</v-subheader>
          <v-radio-group class="pt-0">
            <v-radio value="sentinel" label="Sentinel"></v-radio>
            <v-radio value="landsat" label="Landsat"></v-radio>
          </v-radio-group>
        </v-col>

          <v-col class="pt-0 pb-0">
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Select Date"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>

 
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
<script src="./MapController.js">

  export default {
    data () {
      return {
        picker: new Date().toISOString().substr(0, 10),
      }
    },
  }

</script>

<style scoped>
  .mapbox{
    width: 75%;
    height: 800px;
    border-radius: 5px;
  }
</style>
