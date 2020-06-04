<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <material-card title="404 Not Found">  
                    <v-img
                    contain
                    height="200"
                    width=""
                    src="@/assets/IconRPA_circulo-degrade.png"
                    />
                    <p class="title text-center"> OPS! Página não encontrada</p>
                </material-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    name: 'NotFound',
}
</script>