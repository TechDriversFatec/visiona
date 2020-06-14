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

            <v-card class="elevation-12">
                <v-spacer></v-spacer>

                  
                
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Usuário"
                    v-model="login.user"
                    name="login"
                    prepend-icon="mdi-account"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Senha"
                    v-model="login.password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="auth()" class="primary">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

</template>

<script src="./LoginController.js"></script>
