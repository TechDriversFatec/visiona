<template>


      <v-container
        class="fill-height"
        fluid
      >
      <v-row justify="center">
        <v-img align="center" src="./visionalogo.png" max-width="500px"></v-img>

      </v-row>


        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >

          <!-- <v-parallax src="./visionalogo.png"></v-parallax> -->
            <v-card class="elevation-12">
                <!-- <v-toolbar-title>Login</v-toolbar-title> -->
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      :href="source"
                      icon
                      large
                      target="_blank"
                      v-on="on"
                    >
                    </v-btn>
                  </template>
                </v-tooltip>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Usuário"
                    name="login"
                    prepend-icon="mdi-account"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Senha"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

</template>

<script src="./LoginController.js"></script>
