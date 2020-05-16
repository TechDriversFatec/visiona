<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item link>
          <!-- <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action> -->
          <v-list-item-content>
            <!-- <v-list-item-title>Dashboard</v-list-item-title> -->

            <v-card>
               <!-- <v-toolbar
                 color="purple"
                 dark
                 dense
                 flat
               >
                 <v-toolbar-title class="body-2">Área Selecionada</v-toolbar-title>
               </v-toolbar> -->

               <v-card-text>
LAT.:_______________
LNG.:_______________

               </v-card-text>


             </v-card>


          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>"Visiona's Logo"</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon color="purple darken-2" >mdi-dots-vertical</v-icon>
      </v-btn>
      <v-button>LOGOUT</v-button>
    </v-app-bar>

    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row>



            <!-- <img src="./assets/map.png"> -->
            <!-- <img src="@/assets/map2.png" alt=""> -->


          <!-- <v-col class="shrink">
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-btn
                  :href="source"
                  icon
                  large
                  target="_blank"
                  v-on="on"
                >
                  <v-icon large>mdi-code-tags</v-icon>
                </v-btn>
              </template>
              <span>Source</span>
            </v-tooltip>
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  large
                  href="https://codepen.io/johnjleider/pen/bXNzZL"
                  target="_blank"
                  v-on="on"
                >
                  <v-icon large>mdi-codepen</v-icon>
                </v-btn>
              </template>
              <span>Codepen</span>
            </v-tooltip>
          </v-col> -->

        </v-row>
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
    }),
    created () {
      this.$vuetify.theme.dark = true
    },
  }
</script>
